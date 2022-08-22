const axios = require('axios');
const parseIsoDuration = require('parse-iso-duration');
const humanizeDuration = require('humanize-duration');
const express = require('express');
const router = express.Router();
const { apikey } = require('./config');


//const urll = "https://www.youtube.com/watch?=vPZIPsKgWJiw&list==PLuHgQVnccGMA4uSig3hCjl7wTDeyIeZVU";

// get playlistId from url
const get_list_id = (url) => {
    if (url.includes('list=') === true){
        return (url.split('list=')[1]);
    } else {
        console.log('Wrong form!');
        return undefined;
    }
}

//router.post('/', (req, res, next) => {
    //let request = req.body;
async function play(url) {
    try {
        let playlistId = get_list_id(url);
        let url1 = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,pageInfo.totalResults,nextPageToken&key=${apikey}&playlistId=${playlistId}&pageToken=`;
        let nextToken = '';
        let totalTime = 0;
        let count = 0;
        let length = 0;

        while (true) {
            let response = await axios.get(url1 + nextToken);
            let lists = response.data.items;
            count = response.data.pageInfo.totalResults;
            let video_id_lists = [];
            for (contents of lists) {
                video_id_lists.push(contents.contentDetails.videoId);
            }
            let vid_list = video_id_lists.join(',');
            let url2 = `https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&key=${apikey}&id=${vid_list}&fields=items/contentDetails/duration`;
            let output_response = await axios.get(url2);
            let output = output_response.data.items;

            for (duration of output) {
                let a = duration['contentDetails']['duration'];
                let ms = parseIsoDuration(a);
                totalTime += ms;
            }
            if (response.data.nextPageToken) {
                nextToken = response.data.nextPageToken;
            } else {
                length = humanizeDuration(totalTime);
                let speed_125 = humanizeDuration(Math.floor(totalTime / 1.25));
                let speed_150 = humanizeDuration(Math.floor(totalTime / 1.5));
                let speed_175 = humanizeDuration(Math.floor(totalTime / 1.75));
                let speed_200 = humanizeDuration(Math.floor(totalTime / 2));
                return ([
                    length, speed_125, speed_150, speed_175, speed_200
                ]);
            }
        }
    } catch (err) {
        return err.response.status;
    }
}
/*
play(req.body).then((data) => {
    if (data == 400){
        res.render('index', {punchline: 'invalid playlist id'});
    } else {
        console.log(data);
        res.render('index', {punchline: data});
    }
});*/
//})

module.exports = { get_list_id, play };
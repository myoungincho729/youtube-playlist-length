const axios = require('axios');
const cheerio = require('cheerio');

const getHTML = async (url) => {
    try {
        return await axios.get(url);
    } catch(err) {
        console.log(err);
    }
}

const parsing = async (url) => {
    const htm = await getHTML(url);
    const $ = cheerio.load(htm.data);
    const playlist = $('.playlist-items style-scope ytd-playlist-panel-renderer');
    console.log(playlist);
    const list = [];
    playlist.each((idx, node) => {
        console.log($(node).html());
        if ($(node).find('.tocnumber').text().indexOf('.') === -1){
            list.push({
                index : $(node).find('.tocnumber').text(),
                title : $(node).find('.toctext').text()
            })
        }
    })
    //console.log(toctitle.html());
    console.log(list);
    // const playlist = $('.style-scope ytd-thumbnail-overlay-time-status-renderer');
    // console.log(playlist);
    // let courses = [];
    // playlist.each((idx, node) => {

    //     courses.push({
    //         len : $(node).find("#text").text(),
    //     })
    // })
    // console.log(courses);
}
const url1 = "https://www.youtube.com/watch?v=GAyZ_QgYYYo&list=PLXvgR_grOs1DEoZFABFCjo7dsXt1BhVih";
parsing(url1);
    //const courseList = $(".course_card_item");

// }

//parsing("자바스크립트");
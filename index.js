const express = require('express');
const path = require('path');
const { get_list_id, play }  = require('./routes/playlist_crawler');
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

app.post('/result', (req, res) => {
    console.log(req.body);
    const url = req.body.list;
    console.log(url);
    play(url).then((data) => {
        if (data == 400){
            res.render('error', { errorMessage: 'invalid playlist id'});
        } else {
            console.log(data);
            res.render('index', {
                speed100: data[0],
                speed125: data[1],
                speed150: data[2],
                speed175: data[3],
                speed200: data[4]
            });
        }
    })
    //res.send('hello');
})

app.listen(port, ()=>{
    console.log('log writing...')
})
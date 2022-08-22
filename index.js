const express = require('express');
const path = require('path');
const { get_list_id, play }  = require('./routes/playlist_crawler');
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.send('hello world');
})

app.post('/', (req, res) => {
    console.log(req.body);
    const url = req.body.list;
    console.log(url);
    play(url).then((data) => {
        if (data == 400){
            res.render('index', {punchline: 'invalid playlist id'});
        } else {
            console.log(data);
            res.send(data);
        }
    })
    //res.send('hello');
})

app.listen(port, ()=>{
    console.log('log writing...')
})
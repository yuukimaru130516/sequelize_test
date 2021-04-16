'use strict';

const express = require('express');
const Post = require('./post');
const app = express();

const port = 8000;
const contents = [];


app.get('/', (req, res) => {
  Post.findAll().then((items) => {
    res.render('index.ejs', {items: items})
  });
});

app.post('/datatest', (req, res) => {
  // postで送られてきたデータに対する処理
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    const decoded = decodeURIComponent(body);
    const content = decoded.split('content=')[1];
    console.info(`送信されました: ${content}`);
    // データベースに追加
  Post.create({
    content: content,
  }).then(() => {
    res.redirect('/');
    });
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
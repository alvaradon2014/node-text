const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000; //for heroku
var app = express();

app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Welcome :)',
    welcomeMessage: 'Hi Everyone!'
  });
});

app.get('/hello', (req, res) => {
  res.render('hello.hbs',{
    pageTitle: 'Hello'
  });
});

app.get('/sup', (req, res) => {
  res.render('sup.hbs',{
    pageTitle: 'Sup'
  });
});




app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

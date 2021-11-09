const express = require('express');
const app = express();
const router = require('./bin/route');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoDBstore = require('connect-mongodb-session')(session);
const dotenv = require('dotenv').config();
// const cookieSession = require('cookie-session');

const store = new mongoDBstore({
    uri: process.env.DBURL,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.log(error);
  });

const sessionMW = session({
    secret: process.env.ssecret,
    cookie: {
      maxAge: 1000 * 60 * 60 // 1 hour
    },
    store: store,
    resave: true,
    saveUninitialized: true
  });

app.use(sessionMW);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',router);


module.exports = {
    app,
    sessionMW
}
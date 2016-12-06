var express = require('express');
var app = express();
// var path = require('path');

app.use(express.static('public'));
app.use('/profile', express.static('profile'));
app.use('/logs', express.static('logs'));
app.use('/register', express.static('register'));
app.use('/login', express.static('login'));
app.use('/settings', express.static('settings'));
app.use('/studysheet', express.static('studysheet'));

app.listen(process.env.PORT || 8080);

module.exports.app = app;
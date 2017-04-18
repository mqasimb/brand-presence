var express = require('express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bodyParser = require('body-parser');
var User = require('./models/user-model');
var Log = require('./models/log-model');
var Quiz = require('./models/quiz-model');
var Answer = require('./models/answer-model');
var bcrypt = require('bcryptjs');
var config = require('./config');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
app.use('/profile', express.static('views/profile'));
app.use('/mylogs', express.static('views/logs'));
app.use('/register', express.static('views/register'));
app.use('/login', express.static('views/login'));
app.use('/studysheet', express.static('views/studysheet'));
app.use('/newquiz' , express.static('views/quiz'));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var strategy = new LocalStrategy(function(username, password, callback) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (err) {
            callback(err);
            return;
        }
        if (!user) {
            return callback(null, false, {
                message: 'Incorrect username.'
            });
        }
        user.validatePassword(password, function(err, isValid) {
            if (err) {
                return callback(err);
            }

            if (!isValid) {
                return callback(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return callback(null, user);
        });
    });
});

passport.use(strategy);

app.post('/register', function(req, res) {
    if (!req.body) {
        return res.status(400).json({
            message: "No request body"
        });
    }

    if (!('username' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: username'
        });
    }

    var username = req.body.username;
    var email = req.body.email;

    if (typeof username !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: username'
        });
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({
            message: 'Incorrect field length: username'
        });
    }

    if (!('password' in req.body)) {
        return res.status(422).json({
            message: 'Missing field: password'
        });
    }

    var password = req.body.password;

    if (typeof password !== 'string') {
        return res.status(422).json({
            message: 'Incorrect field type: password'
        });
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({
            message: 'Incorrect field length: password'
        });
    }
    
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            var user = new User({
                username: username,
                password: hash,
                email: email
            });

            user.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error'
                    });
                }
                return res.status(201).json({message: 'Registration Succesful'});
            });
        });
    });
});

app.get('/logs', function(req, res) {
    Log.find({username: req.user._id}, function(err, logs) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(logs);
    });
});

app.post('/logs', function(req, res) {
    console.log(req.user.username, Date(), req.body.title, req.body.summary, req.body.questions);
    Log.create({
        username: req.user._id,
        date: Date(),
        title: req.body.title,
        topic: req.body.topic,
        summary: req.body.summary,
        questions: req.body.questions
    }, function(err, log) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        console.log(log);
        res.status(201).json(log);
    });
});

app.put('/logs/:id', function(req, res) {
    Log.findOneAndUpdate({_id: req.params.id}, {$set:{title:req.body.title, topic:req.body.topic, summary:req.body.summary, questions:req.body.questions}}, function(err, log) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(log);
    });
});

app.delete('/logs/:id', function(req, res) {
    Log.findOneAndRemove({_id: req.params.id}, function(err, log) {
        if(err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(log);
    });
});

app.get('/quiz', function(req, res) {
    console.log(req.query.category);
    Quiz.find({category: req.query.category}, function(err, quiz) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(quiz);
    });
});

app.post('/quiz', function(req, res) {
    console.log(req.body.questions, req.body.category, req.body.name, req.body.skillLevel )
    Quiz.create({
        questions: req.body.questions,
        category: req.body.category,
        name: req.body.name,
        skillLevel: req.body.skillLevel,
        username: req.user._id
    }, function(err, quiz) {
        if (err) {
            return res.status(500).json({
               message: 'Internal Server Error'
            });
        }
        console.log(quiz);
        res.json(quiz);
    });
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  });
  
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use(function(err, req, res, next) {
   res.send(err);
});

mongoose.connect(config.DATABASE_URL).then(function() {
        app.listen(process.env.PORT || 8080);
});

module.exports.app = app;
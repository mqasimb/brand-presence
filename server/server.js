require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const path = require('path');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('./config');

const User = require('./models/user-model');
const Issue = require('./models/issue-model');

const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


app.post('/users/login',
  passport.authenticate('local'),
  function(req, res) {
    const token = jwt.sign({
        username: req.user.username,
        _id: req.user._id
    }, config.jwtSecret);
    res.json({ token });
  });
  
app.get('/users/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});

app.get('/api/issue', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    User.findOne({username: req.user.username}).populate('issues').exec(function(err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(user.issues);
    });
});

app.post('/api/issue', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.create({title: req.body.title, issue: req.body.issue, topic: req.body.topic, solved: false, date: Date.now(), username: req.user.username, solution: ''}, function(err, issue) {
        if (err) {
            console.log('1', err)
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        issue.save(function(err) {
            if(err) {
                console.log('2', err)
                return res.status(500).json({
                message: 'Internal Server Error'
            })
            }
            User.findOne({username: req.user.username}, function(err, user) {
                user.issues.push(issue);
                user.save(function(err) {
                    if(err) {
                        console.log('3', err)
                        res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    }
                    res.json(issue);
                  })
            })
        })
    });
});

app.put('/api/issue/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        issue.topic = req.body.topic;
        issue.title = req.body.title;
        issue.issue = req.body.issue;
        issue.save(function(err){
            if(err) {
                return res.json({message: 'Internal Server Error'})
            }
            res.json(issue);
        })
    });
});

app.delete('/api/issue/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOneAndRemove({_id: req.params.id}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
            res.json(issue);
    });
});

app.put('/api/issue/solve/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        issue.solved = req.body.solved;
        issue.save(function(err){
            if(err) {
                return res.json({message: 'Internal Server Error'})
            }
            res.json(issue);
        })
    });
});

app.post('/api/issue/solution/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        issue.solution = req.body.solution;
        issue.save(function(err) {
            if(err) {
                return res.status(500).json({
                message: 'Internal Server Error'
            })
            }
            res.json(issue);  
        })
    });
});

app.put('/api/issue/solution/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        issue.solution = req.body.solution;
        issue.save(function(err) {
            if(err) {
                return res.status(500).json({
                message: 'Internal Server Error'
            })
            }
            res.json(issue);  
        })
    });
});

app.delete('/api/issue/solution/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.postID}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        issue.solution = '';
        issue.save(function(err) {
            if(err) {
                return res.status(500).json({
                message: 'Internal Server Error'
            })
            }
            res.json(issue);  
        })
    });
});

app.post('/api/issue/url/:id', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.id}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        issue.helpfulLinks.push({url: req.body.url});
        issue.save(function(err) {
            if(err) {
                return res.status(500).json({
                message: 'Internal Server Error'
            })
            }
            res.json(issue);  
        })
    });
});

app.put('/api/issue/url/:postID/:urlID', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.postID}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        var firstIndex = issue.helpfulLinks.findIndex(function(link) {
            return link._id == req.params.urlID
        })
        if(firstIndex > -1) {
            issue.helpfulLinks[firstIndex].url = req.body.url;
        }
        issue.save(function(err) {
            if(err) {
                return res.status(500).json({
                message: 'Internal Server Error'
            })
            }
            res.json(issue);  
        })
    });
});

app.delete('/api/issue/url/:postID/:urlID', expressJWT({ secret: config.jwtSecret}), function(req, res) {
    Issue.findOne({_id: req.params.postID}, function(err, issue) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        var firstIndex = issue.helpfulLinks.findIndex(function(link) {
            return link._id == req.params.urlID
        })
        if(firstIndex > -1) {
            issue.helpfulLinks.splice(firstIndex, 1);
        }
        issue.save(function(err) {
            if(err) {
                return res.status(500).json({
                message: 'Internal Server Error'
            })
            }
            res.json(issue);  
        })
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

app.post('/users/register', function(req, res) {
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
                message: 'Internal server error1'
            });
        }

        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error2'
                });
            }

            var user = new User({
                username: username,
                password: hash,
                email: email
            });

            user.save(function(err) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        message: 'Internal server error3'
                    });
                }
                return res.status(201).json({message: 'Registration Succesful'});
            });
        });
    });
});

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.use(function(err, req, res, next) {
   res.send(err);
});

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;
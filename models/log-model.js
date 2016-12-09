var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    username: {type: String, required: true},
    date: {type: Date},
    title: {type: String},
    topic: {type: String},
    summary: {type: String},
    questions: {type: String}
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;
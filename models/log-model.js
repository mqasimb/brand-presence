var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: Date,
    title: String,
    topic: String,
    summary: String,
    questions: String
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;
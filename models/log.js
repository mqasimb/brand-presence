var mongoose = require('mongoose');

var LogSchema = new mongoose.Schema({
    name: { date: Date, topic: String, summary: String, questions: String }
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;
var mongoose = require('mongoose');

var IssueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    solved: {
    	type: Boolean,
    	required: true
    },
    helpfulLinks: [String],
    date: Date,
    username: { 
        type: String, 
        required: true
    }
})

var Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;
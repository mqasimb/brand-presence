var mongoose = require('mongoose');

var LinkSchema = new mongoose.Schema({
    url: { 
        type: String,
        required: true,
        unique: true
    }
})

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
    solution: {
        type: String
    },
    helpfulLinks: [LinkSchema],
    date: Date,
    username: { 
        type: String, 
        required: true
    }
})

var Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;
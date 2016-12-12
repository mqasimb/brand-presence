var mongoose = require('mongoose');

var AnswerSchema = mongoose.Schema({
    quiz: {type: mongoose.Schema.Types.ObjectId, ref:'Quiz', required: true},
    answer: {type:String, required: true},
    username: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    comments: {type: [String]}
});

var Answer = mongoose.model('answer', AnswerSchema);

module.exports = Answer;
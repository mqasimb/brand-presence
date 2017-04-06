var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    questions: {type:[String], required: true},
    category: {type: String, required: true},
    name: {type: String, required: true, unique: true},
    skillLevel: {type:String, required: true},
    username: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

var Quiz = mongoose.model('quiz', QuizSchema);

module.exports = Quiz;
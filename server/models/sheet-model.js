var mongoose = require('mongoose');

var SheetSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    tips: [String]
    
});


var Sheet = mongoose.model('sheet', SheetSchema);

module.exports= Sheet;
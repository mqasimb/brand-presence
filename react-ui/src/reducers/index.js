const react = require('react');
const actions = require('../actions/index');

var initialState = {
        
    };

var appReducer = function(state, action) {
    state = state || initialState;
    var newState = Object.assign({}, state);
    
    return state;
}

module.exports = appReducer;
exports.initialState = initialState;
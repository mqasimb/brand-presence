const react = require('react');
const actions = require('../actions/index');

var initialState = {
        auth: {authenticated: false, user: {}},
        issueData: []
    };

var appReducer = function(state, action) {
    state = state || initialState;
    var newState = Object.assign({}, state);
    
    if(action.type === actions.USER_LOGGED_IN) {
        var newChange = {};
        newChange.authenticated = true;
        newChange.user = action.user;
        newState.auth = Object.assign({}, newChange);
        return newState;
    }

    if(action.type === actions.USER_LOGGED_OUT) {
        newState = Object.assign({}, initialState)
        return newState;
    }

	if(action.type === actions.GET_ISSUES_SUCCESSFUL) {
        newState.issueData = action.data.slice();
        return newState;
    }

    if(action.type === actions.ADD_NEW_QUESTION_SUCCESSFUL) {
        newState.issueData = Object.assign({}, action.data)
        return newState;
    }

    if(action.type === actions.EDIT_ISSUE_SUCCESSFUL) {
    	var firstIndex = newState.issueData.findIndex(function(issue) {
    		return action.data._id === issue._id;	
    	})
    	if(firstIndex > -1) {
    		newState.issueData[firstIndex] = Object.assign({}, action.data);
    		newState.issueData = newState.issueData.slice();
    	}
        return newState;
    }

    if(action.type === actions.DELETE_ISSUE_SUCCESSFUL) {
    	var firstIndex = newState.issueData.findIndex(function(issue) {
    		return action.data._id === issue._id;	
    	})
    	if(firstIndex > -1) {
    		newState.issueData.splice(firstIndex, 1);
    		newState.issueData = newState.issueData.slice();
    	}
        return newState;
    }

    if(action.type === actions.ISSUE_SOLVED_SUCCESSFUL) {
    	var firstIndex = newState.issueData.findIndex(function(issue) {
    		return action.data._id === issue._id;	
    	})
    	if(firstIndex > -1) {
    		newState.issueData[firstIndex] = Object.assign({}, action.data);
    		newState.issueData = newState.issueData.slice();
    	}
        return newState;
    }

    if(action.type === actions.ADD_NEW_URL_SUCCESSFUL) {
    	var firstIndex = newState.issueData.findIndex(function(issue) {
    		return action.data._id === issue._id;	
    	})
    	if(firstIndex > -1) {
    		newState.issueData[firstIndex] = Object.assign({}, action.data);
    		newState.issueData = newState.issueData.slice();
    	}
        return newState;
    }

    if(action.type === actions.EDIT_URL_SUCCESSFUL) {
    	var firstIndex = newState.issueData.findIndex(function(issue) {
    		return action.data._id === issue._id;	
    	})
    	if(firstIndex > -1) {
    		newState.issueData[firstIndex] = Object.assign({}, action.data);
    		newState.issueData = newState.issueData.slice();
    	}
        return newState;
    }

    if(action.type === actions.DELETE_URL_SUCCESSFUL) {
    	var firstIndex = newState.issueData.findIndex(function(issue) {
    		return action.data._id === issue._id;	
    	})
    	if(firstIndex > -1) {
    		newState.issueData[firstIndex] = Object.assign({}, action.data);
    		newState.issueData = newState.issueData.slice();
    	}
        return newState;
    }

    return state;
}

module.exports = appReducer;
exports.initialState = initialState;
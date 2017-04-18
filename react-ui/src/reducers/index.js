const actions = require('../actions/index');

var initialState = {
        auth: {authenticated: false, user: {}},
        issueData: [],
        singleIssue: {}
    };

var appReducer = function(state = initialState, action) {
    
    if(action.type === actions.USER_LOGGED_IN) {
        return {...state, auth: {authenticated: true, user: {...action.user}}}
    }

    if(action.type === actions.USER_LOGGED_OUT) {
        return {...initialState};
    }

	if(action.type === actions.GET_ISSUES_SUCCESSFUL) {
        return {...state, issueData: action.data};
    }

    if(action.type === actions.SET_SINGLE_ISSUE) {
        var index = state.issueData.findIndex((issue) => issue._id == action.issueID)
        if(index > -1) {
            return {...state, singleIssue: {...state.issueData[index]} }
        }
    }

    if(action.type === actions.ADD_NEW_QUESTION_SUCCESSFUL) {
        return {...state, issueData: [...action.data]};
    }

    if(action.type === actions.EDIT_ISSUE_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
            return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.DELETE_ISSUE_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
            return {...state, issueData: [...state.issueData.slice(0, index), ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.ISSUE_SOLVED_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
            return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.ADD_NEW_URL_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
            return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.EDIT_URL_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
    		return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.DELETE_URL_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
    		return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.ADD_SOLUTION_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
    		return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.EDIT_SOLUTION_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
    		return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    if(action.type === actions.DELETE_SOLUTION_SUCCESSFUL) {
    	var index = state.issueData.findIndex((issue) => action.data._id === issue._id)
    	if(index > -1) {
    		return {...state, issueData: [...state.issueData.slice(0, index), action.data, ...state.issueData.slice(index + 1)]}
    	}
    }

    return state;
}

module.exports = appReducer;
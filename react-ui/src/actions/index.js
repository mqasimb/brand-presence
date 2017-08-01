var axios = require('axios');
var jwtdecode = require('jwt-decode');
var router = require('react-router');

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export function userLoggedIn(decodedToken) {
    return {
        type: USER_LOGGED_IN,
        user: decodedToken
    }
}

export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';
export function userLoggedOut() {
    return {
        type: USER_LOGGED_OUT,
    }
}

export function setAuthorizationToken(token) {
    if(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function registerAction(registerData) {
    return function(dispatch) {
        return axios.post('/users/register', registerData)
        .then(function(response) {
            router.hashHistory.push('/login');
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export function loginAction(loginData) {
    return function(dispatch) {
        return axios.post('/users/login', loginData)
        .then(function(response) {
            const token = response.data.token;
            localStorage.setItem('jwt', token);
            setAuthorizationToken(token);
            var decoded = jwtdecode(token);
            dispatch(userLoggedIn(decoded));
            return true;
        })
    }
}

export function logoutAction(loginData) {
    return function(dispatch) {
            localStorage.removeItem('jwt');
            setAuthorizationToken(false);
            dispatch(userLoggedOut());
        }
}

export function getIssues() {
    return function(dispatch) {
        return axios.get('/api/issue')
        .then(function(response) {
            dispatch(getIssuesSuccessful(response.data));
            return response;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const GET_ISSUES_SUCCESSFUL = 'GET_ISSUES_SUCCESSFUL';
export function getIssuesSuccessful(data) {
    return ({
        type: GET_ISSUES_SUCCESSFUL,
        data: data
    })
}

export function addNewIssue(data) {
    return function(dispatch) {
        return axios.post('/api/issue', data)
        .then(function(response) {
            dispatch(addNewIssueSuccessful());
            return true;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const ADD_NEW_ISSUE_SUCCESSFUL = 'ADD_NEW_ISSUE_SUCCESSFUL';
export function addNewIssueSuccessful(data) {
    return ({
        type: ADD_NEW_ISSUE_SUCCESSFUL,
        data: data
    })
}

export function editIssue(data, issueID) {
    return function(dispatch) {
        return axios.put('/api/issue/'+issueID, data)
        .then(function(response) {
            return dispatch(editIssueSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const EDIT_ISSUE_SUCCESSFUL = 'EDIT_ISSUE_SUCCESSFUL';
export function editIssueSuccessful(data) {
    return ({
        type: EDIT_ISSUE_SUCCESSFUL,
        data: data
    })
}

export function deleteIssue(issueID) {
    return function(dispatch) {
        return axios.delete('/api/issue/'+issueID)
        .then(function(response) {
            return dispatch(deleteIssueSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const DELETE_ISSUE_SUCCESSFUL = 'DELETE_ISSUE_SUCCESSFUL';
export function deleteIssueSuccessful(data) {
    return ({
        type: DELETE_ISSUE_SUCCESSFUL,
        data: data
    })
}

export function markIssueSolved(isSolved, issueID) {
	return function(dispatch) {
		return axios.put('/api/issue/solve/'+issueID, {solved: isSolved})
		.then(function(response) {
			return dispatch(issueSolvedSuccessful(response.data));
		})
		.catch(function(err) {
			console.log(err);
		})
	}
}

export const ISSUE_SOLVED_SUCCESSFUL = 'ISSUE_SOLVED_SUCCESSFUL';
export function issueSolvedSuccessful(data) {
    return ({
        type: ISSUE_SOLVED_SUCCESSFUL,
        data: data
    })
}

export function addNewURL(data, issueID) {
    return function(dispatch) {
        return axios.post('/api/issue/url/'+issueID, data)
        .then(function(response) {
            return dispatch(addNewURLSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const ADD_NEW_URL_SUCCESSFUL = 'ADD_NEW_URL_SUCCESSFUL';
export function addNewURLSuccessful(data) {
    return ({
        type: ADD_NEW_URL_SUCCESSFUL,
        data: data
    })
}

export function editURL(data, postID, urlID) {
    return function(dispatch) {
        return axios.put('/api/issue/url/'+postID+'/'+urlID, data)
        .then(function(response) {
            return dispatch(editURLSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const EDIT_URL_SUCCESSFUL = 'EDIT_URL_SUCCESSFUL';
export function editURLSuccessful(data) {
    return ({
        type: EDIT_URL_SUCCESSFUL,
        data: data
    })
}

export function deleteURL(postID, urlID) {
    return function(dispatch) {
        return axios.delete('/api/issue/url/'+postID+'/'+urlID)
        .then(function(response) {
            return dispatch(deleteURLSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const DELETE_URL_SUCCESSFUL = 'DELETE_URL_SUCCESSFUL';
export function deleteURLSuccessful(data) {
    return ({
        type: DELETE_URL_SUCCESSFUL,
        data: data
    })
}

export function addSolution(data, issueID) {
    return function(dispatch) {
        return axios.post('/api/issue/solution/'+issueID, data)
        .then(function(response) {
            return dispatch(addSolutionSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const ADD_SOLUTION_SUCCESSFUL = 'ADD_SOLUTION_SUCCESSFUL';
export function addSolutionSuccessful(data) {
    return ({
        type: ADD_SOLUTION_SUCCESSFUL,
        data: data
    })
}

export function editSolution(data, issueID) {
    return function(dispatch) {
        return axios.put('/api/issue/solution/'+issueID, data)
        .then(function(response) {
            return dispatch(editSolutionSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const EDIT_SOLUTION_SUCCESSFUL = 'EDIT_SOLUTION_SUCCESSFUL';
export function editSolutionSuccessful(data) {
    return ({
        type: EDIT_SOLUTION_SUCCESSFUL,
        data: data
    })
}

export function deleteSolution(issueID) {
    return function(dispatch) {
        return axios.delete('/api/issue/solution/'+issueID)
        .then(function(response) {
            return dispatch(deleteSolutionSuccessful(response.data));
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const DELETE_SOLUTION_SUCCESSFUL = 'DELETE_SOLUTION_SUCCESSFUL';
export function deleteSolutionSuccessful(data) {
    return ({
        type: DELETE_SOLUTION_SUCCESSFUL,
        data: data
    })
}

export const SET_SINGLE_ISSUE = 'SET_SINGLE_ISSUE';
export function setSingleIssue(issueID) {
    return ({
        type: SET_SINGLE_ISSUE,
        issueID: issueID
    })
}

export function searchIssues(search) {
    return function(dispatch) {
        return axios.get(`/api/issue/${search}`)
        .then(function(response) {
            dispatch(getSearchSuccessful(response.data));
            return response;
        })
        .catch(function(err) {
            console.log(err);
        })
    }
}

export const GET_SEARCH_SUCCESSFUL = 'GET_SEARCH_SUCCESSFUL';
export function getSearchSuccessful(data) {
    return ({
        type: GET_SEARCH_SUCCESSFUL,
        data: data
    })
}
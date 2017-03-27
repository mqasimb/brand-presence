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

export function getIssues(data) {
    return function(dispatch) {
        return axios.get('/api/issue')
        .then(function(response) {
            return dispatch(getIssuesSuccessful(response.data));
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

export function deleteIssue(data) {
    return function(dispatch) {
        return axios.delete('/api/issue', data)
        .then(function(response) {
            return dispatch(deleteIssueSuccessful());
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
// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_USERNAMES = {
    "usernames": [
            {'username': "John", "password": "ABC"},
            {'username': "Alex", "password": "CDE"},
            {'username': "Steve", "password": "FGH"}
            ]
};

var username, password;
var loggedin = false;

function getUsernames(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_USERNAMES)}, 1);
}

function displayLoginStatus(data) {
    for (var i =0; i<data.usernames.length; i++) {
        if((data.usernames[i].username === username) && (data.usernames[i].password == password)) {
    	   loggedin = true;
    	   $('body').append(
            '<p>You are now logged in as: '+ data.usernames[i].username +'</p>');
            $('form').remove();
        }
    }
    if(loggedin === false) {
                $('body').append(
                    '<p>Invalid Username or Password'+ password+'</p>');
            }
}

function getAndCheckUsernames() {
	getUsernames(displayLoginStatus);
}

$(function() {
	$('#username').submit(function(event) {
	   event.preventDefault();
	   username = $('input[name="name"]').val();
	   password = $('input[name="password"]').val();
	   getAndCheckUsernames();
	});

	
})
// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_USERNAMES = {
    "usernames": [
            {"username": "John", "password": "ABC", "email": "john@usernames.com"},
            {"username": "Alex", "password": "CDE", "email": "alex@usernames.com"},
            {"username": "Steve", "password": "FGH", "email": "steve@usernames.com"}
            ]
};

var username, password, email;
var canRegister = true;

function getUsernames(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_USERNAMES)}, 1);
}

function displayStatus(data) {
    for (var i =0; i<data.usernames.length; i++) {
        if((data.usernames[i].username === username)) {
    	   $('body').append(
            '<p>The username: '+ data.usernames[i].username +' is already taken!</p>');
            canRegister = false;
        }
        if((data.usernames[i].email === email)) {
    	   $('body').append(
            '<p>The email: '+ data.usernames[i].email +' is already registered!</p>');
            canRegister = false;
        }
    }
    if(canRegister) {
        data.usernames.push({"username": username, "password": password, "email": email});
        $('body').append(
            '<p>The username '+ username + ' has been created!</p>'
            )
        $('form').remove();
    }
}

function getAndCheckUsernames() {
	getUsernames(displayStatus);
}

$(function() {
	$('#username').submit(function(event) {
	   event.preventDefault();
	   canRegister = true;
	   username = $('input[name="name"]').val();
	   password = $('input[name="password"]').val();
	   email = $('input[name="email"]').val();
	   getAndCheckUsernames();
	});

	
})
var MOCK_USERNAMES = {
    "usernames": [
            {'username': "John", "password": "ABC"},
            {'username': "Alex", "password": "CDE"},
            {'username': "Steve", "password": "FGH"}
            ]
};

var MOCK_PROFILES = {
	"profiles": [{
	        "user": "John",
            "id": "1111111",
            "subjectLearning": "NodeJS",
            "joinDate": 1470016976609
        },
        {
            "user": "Alex",
            "id": "1111111",
            "subjectLearning": "Angular",
            "joinDate": 1470016976609
        },
        {
            "user": "Steve",
            "id": "1111111",
            "subjectLearning": "CSS",
            "joinDate": 1470016976609
        },
        {
            "user": "Lucas",
            "id": "1111111",
            "subjectLearning": "Express",
            "joinDate": 1470016976609
        }
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
            getAndDisplayProfile();
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

function getProfile(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_PROFILES)}, 1);
}

function displayProfile(data) {
    for (var i =0; i<data.profiles.length; i++) {
        if((data.profiles[i].user === username)) {
    	   $('body').append(
            '<p>Profile of: '+ data.profiles[i].user +'</p>' +
            '<p>Currently Learning: '+ data.profiles[i].subjectLearning +'</p>' +
            '<p>Account Created On: '+ data.profiles[i].joinDate +'</p>'
            );
        }
    }
}

function getAndDisplayProfile() {
	getProfile(displayProfile);
}

$(function() {
	$('#username').submit(function(event) {
	   event.preventDefault();
	   username = $('input[name="name"]').val();
	   password = $('input[name="password"]').val();
	   getAndCheckUsernames();
	});
});
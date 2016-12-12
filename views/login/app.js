// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_USERNAMES = {
    "usernames": [
            {'username': "John", "password": "ABC"},
            {'username': "Alex", "password": "CDE"},
            {'username': "Steve", "password": "FGH"}
            ]
};

// var loggedin = false;

// function displayLoginStatus(data) {
//     // for (var i =0; i<data.usernames.length; i++) {
//     //     if((data.usernames[i].username === username) && (data.usernames[i].password == password)) {
//     // 	   loggedin = true;
//     // 	   $('body').append(
//     //         '<p>You are now logged in as: '+ data.usernames[i].username +'</p>');
//     //         $('form').remove();
//     //     }
//     // }
//     // if(loggedin === false) {
//     //             $('body').append(
//     //                 '<p>Invalid Username or Password'+ password+'</p>');
//     //         }
//     console.log(data);
// }

// $(function() {
// 	$('#username').submit(function(event) {
// 	   event.preventDefault();
// 	   var username = $('input[name="name"]').val();
// 	   var password = $('input[name="password"]').val();
// 	   loginUser(username, password);
// 	});
// 	$('#logout').click(function(event) {
// 	   event.preventDefault();
// 	   logoutUser();
// 	});
// })

// function loginUser(username, password) {
//     var user = {'username': username, 'password': password};
//     var ajax = $.ajax('/login', {
//         type: 'POST',
//         data: JSON.stringify(user),
//         dataType: 'json',
//         contentType: 'application/json'
//     });
//     ajax.done(displayLoginStatus);
// };

// function logoutUser() {
//     var ajax = $.ajax('/logout', {
//         type: 'GET',
//     });
//     ajax.done();
// };
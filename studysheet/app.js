// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_STUDY_SHEET = {
	"studySheets": [{'user': 'John', 'sheet': [
        {
            "id": "1111111",
            "text": "Turn off Facebook!",
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "text": "Sit in a quiet room!",
            "publishedAt": 1470012976609
        }]
        },
        {'user': 'Steve', 'sheet': [
        {
            "id": "333333",
            "text": "Hide my console.",
            "publishedAt": 1470011976609
        },
        {
            "id": "4444444",
            "text": "Google search any word that I do not know",
            "publishedAt": 1470009976609
        }
        ]
        }
]
};

var userName;

function getStudySheet(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_STUDY_SHEET)}, 1);
}

function displayStudySheet(data) {
    console.log(data.studySheets);
    for (var i =0; i<data.studySheets.length; i++) {
        if(data.studySheets[i].user === userName) {
    	   $('body').append(
            '<p>' + data.studySheets[i].user + '</p>');
            data.studySheets[i].sheet.forEach(function(item) {
                $('body').append(
                    '<p>' + item.text + '</p>');
            });
        }
    }
}

function getAndDisplayStudySheet() {
	getStudySheet(displayStudySheet);
}

$(function() {
	$('#username').submit(function(event) {
	   event.preventDefault();
	   $('#username input').attr('disabled', 'true');
	   $('#username button').attr('disabled', 'true');
	   userName = $('#username input').val();
	   getAndDisplayStudySheet();
	});
	$('#new-log').submit(function(event) {
	   event.preventDefault();
	   var newEntry = $('#new-log input').val();
	   $('p').remove();
	   for(var i=0; i<MOCK_STUDY_SHEET.studySheets.length; i++) {
	       if(MOCK_STUDY_SHEET.studySheets[i].user === userName) {
	           MOCK_STUDY_SHEET.studySheets[i].sheet.push(
	               {
	                    "id": "5555555",
                        "text": newEntry,
                        "publishedAt": 1470012976608
	               });
	       }
	   }
	   $('#new-log input').val('');
	   getAndDisplayStudySheet();
	});
	
})
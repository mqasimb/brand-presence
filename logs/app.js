// this is mock data, but when we create our API
// we'll have it return data that looks like this
var MOCK_STUDY_LOG = {
	"studyLog": [{'user': 'John', 'log': [
        {
            "id": "1",
            "text": "Learned Node!",
            "publishedAt": 1470016976609
        },
        {
            "id": "2",
            "text": "Learned Express!",
            "publishedAt": 1470012976609
        }]
        },
        {'user': 'Steve', 'log': [
        {
            "id": "1",
            "text": "Learned to use the command line.",
            "publishedAt": 1470011976609
        },
        {
            "id": "2",
            "text": "Learned about for loops",
            "publishedAt": 1470009976609
        }
        ]
        }
]
};

var username;

function getStudyLog(callbackFn) {
	setTimeout(function(){ callbackFn(MOCK_STUDY_LOG)}, 1);
}

function displayStudyLog(data) {
    console.log(data.studyLog);
    for (var i =0; i<data.studyLog.length; i++) {
        if(data.studyLog[i].user === username) {
    	    $('body').append(
            '<p>' + data.studyLog[i].user + '</p>');
            data.studyLog[i].log.forEach(function(item) {
                $('body').append(
                    '<p>'+item.publishedAt+'</p><p>' + item.text + '</p>');
            });
        }
    }
}

function getAndDisplayStudyLog() {
	getStudyLog(displayStudyLog);
}

$(function() {
    	$('#username').submit(function(event) {
	   event.preventDefault();
	   $('#username input').attr('disabled', 'true');
	   $('#username button').attr('disabled', 'true');
	   username = $('#username input').val();
	   getAndDisplayStudyLog();
	});
	$('#new-log').submit(function(event) {
	   event.preventDefault();
	   var newEntry = $('#new-log input').val();
	   $('p').remove();
	   for(var i=0; i<MOCK_STUDY_LOG.studyLog.length; i++) {
	       if(MOCK_STUDY_LOG.studyLog[i].user === username) {
	           MOCK_STUDY_LOG.studyLog[i].log.push(
	               {
	                    "id": "5555555",
                        "text": newEntry,
                        "publishedAt": Date()
	               });
	       }
	   }
	   $('#new-log input').val('');
	   getAndDisplayStudyLog();
	});
	getAndDisplayStudyLog();
})
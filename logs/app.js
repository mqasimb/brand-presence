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

function displayStudyLog(data) {
    console.log(data);
    // for (var i =0; i<data.studyLog.length; i++) {
    //     if(data.studyLog[i].user === username) {
    // 	    $('body').append(
    //         '<p>' + data.studyLog[i].user + '</p>');
    //         data.studyLog[i].log.forEach(function(item) {
    //             $('body').append(
    //                 '<p>'+item.publishedAt+'</p><p>' + item.text + '</p>');
    //         });
    //     }
    // }
}

function getAndDisplayStudyLog() {
	getStudyLog(displayStudyLog);
}

function displayLogs() {
    var ajax = $.ajax('/logs', {
        type: 'GET'
    });
    ajax.done(displayStudyLog);
};

function postLogs(logPost) {
    var ajax = $.ajax('/logs', {
        type: 'POST',
        data: JSON.stringify(logPost),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(displayStudyLog);
}

$(function() {
    // setTimeout(displayLogs(), 1000);
    
	$('#logs').submit(function(event) {
	   event.preventDefault();	   
	   var logPost = { 
	       title: $('input[name="title"]').val(),
	       topic: $('input[name="topic"]').val(),
	       summary: $('textarea[name="summary"]').val(),
	       questions: $('textarea[name="questions"]').val()
	   };
	   postLogs(logPost);
});
});
// 	   $('#new-log input').val('');
// 	   getAndDisplayStudyLog();
// // 	});
// 	getAndDisplayStudyLog();

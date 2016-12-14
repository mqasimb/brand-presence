function addQuiz(data) {
    //Quiz Added
    //Add New Quiz
    console.log(data);
}

$(function() {
	$('#post-quiz').submit(function(event) {
	    event.preventDefault();
	   var quizData = { 
	       questions: $('input[name="questions"]').val(),
	       category: $('input[name="category"]').val(),
	       name: $('input[name="name"]').val(),
	       skillLevel: $('input[name="skillLevel"]').val()
	   };
	   postQuiz(quizData);
	   console.log(quizData);
	});
	$('.quizadd').submit(function(event) {
	    event.stopPropagation();
	    event.preventDefault();
	    var sendData = {
	        category: $('input[name="choosequiz"]').val()
	    }
	    getQuizzes(sendData);
	});
});

function postQuiz(quizData) {
    var ajax = $.ajax('/quiz', {
        type: 'POST',
        data: JSON.stringify(quizData),
        dataType: 'json',
        contentType: 'application/json'
    });
    console.log(quizData);
    ajax.done(addQuiz);
};

function getQuizzes(displayData) {
    console.log(displayData);
    var ajax = $.ajax('/quiz', {
       type: 'GET',
       data: displayData,
       dataType: 'json',
       contentType: 'application/json'
    });
    ajax.done(displayQuizzes);
}

function displayQuizzes(data) {
    console.log(data);
    var htmlDisplay = '';
    for(var i=0; i<data.length;i++) {
        for(var key in data[i]) {
            htmlDisplay += key + ': ' + data[i][key] + '<br>';
        }
    }
    $('.display-quizzes').append(htmlDisplay);
}
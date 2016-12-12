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
    var ajax = $.ajax('/quiz', {
       type: 'GET',
       data: JSON.stringify(displayData)
    });
    ajax.done(displayQuizzes);
}

function displayQuizzes(data) {
    console.log(data);
}
//Display Data After GET Request
function displayStudyLog(data) {
    if(data) {
    var printData = data.reverse();
    for(var i=0; i<printData.length; i++) {
        var htmlLog = '';
        htmlLog += '<li data-name="title">Title: '+ printData[i].title + '</li>';
        htmlLog += '<li data-name="topic">Topic: '+ printData[i].topic + '</li>';
        htmlLog += '<li data-name="summary">Summary: '+ printData[i].summary + '</li>';
        htmlLog += '<li data-name="questions">Questions: '+ printData[i].questions + '</li>';
        $('.load-logs').append('<div data-id="'+data[i]._id+'">'+htmlLog+'<button class="delete-button">Delete Log</button><button class="edit-button">Edit Button</div>');
    };
    console.log(data);
    }
    else
        return new Error('No Data');
}

//GET Request
function displayLogs() {
    var ajax = $.ajax('/logs', {
        type: 'GET'
    });
    ajax.done(displayStudyLog);
};
//POST Request
function postLogs(logPost) {
    var ajax = $.ajax('/logs', {
        type: 'POST',
        data: JSON.stringify(logPost),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done();
}

$(function() {
    displayLogs();
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
    $('body').on('click','.delete-button', function(event) {
        event.stopPropagation();
        deleteLog($(this).parent().data());
    });
    $('body').on('click','.edit-button', function(event) {
        event.stopPropagation();
        event.preventDefault();
        var updatePost = {
           title: $('input[name="title-edit"]').val(),
	       topic: $('input[name="topic-edit"]').val(),
	       summary: $('input[name="summary-edit"]').val(),
	       questions: $('input[name="questions-edit"]').val()
        }
        updateLog($(this).parent().parent().data(), updatePost);
    });
    $('body').on('dblclick','div', function(event) {
        event.stopPropagation();
        var oldDiv = this;
        var newForm = '<form>';
        newForm += 'Title<input type="text" name="'+$('li[data-name="title"]', this).data().name+'-edit" value="'+$('li[data-name="title"]', this).text().split(' ')[1]+'"></input>';
        newForm += 'Topic<input type="text" name="'+$('li[data-name="topic"]', this).data().name+'-edit" value="'+$('li[data-name="topic"]', this).text().split(' ')[1]+'"></input>';
        newForm += 'Summary<input type="text" name="'+$('li[data-name="summary"]', this).data().name+'-edit" value="'+$('li[data-name="summary"]', this).text().split(' ')[1]+'"></input>';
        newForm += 'Questions<input type="text" name="'+$('li[data-name="questions"]', this).data().name+'-edit" value="'+$('li[data-name="questions"]', this).text().split(' ')[1]+'"></input></br>';
        newForm += '<button class="edit-button">Submit Edit</button></form>';
        $(this).html(newForm);
        console.log(newForm);
        // var updatePost = {
        //   title: $('input[name="title"]').val(),
	       //topic: $('input[name="topic"]').val(),
	       //summary: $('textarea[name="summary"]').val(),
	       //questions: $('textarea[name="questions"]').val()
        // }
        // updateLog($(this).parent().data(), updatePost);
    });
});
//Delete Request
function deleteLog(send) {
    var ajax = $.ajax('/logs/'+send.id, {
       type: 'DELETE',
       data: JSON.stringify(send),
       dataType: 'json',
       contentType: 'application/json'
    });
    ajax.done(displaydeleteLog);
}
//Remove deleted item from DOM
function displaydeleteLog(data) {
    $('div[data-id="'+data._id+'"]').remove();
}
//PUT Request
function updateLog(update, jsonupdate) {
    console.log(jsonupdate);
    var ajax = $.ajax('/logs/'+update.id, {
       type: 'PUT',
       data: JSON.stringify(jsonupdate),
       dataType: 'json',
       contentType: 'application/json'
    });
    ajax.done(displayUpdateLog);
}
//Display Updated Log
function displayUpdateLog(data) {
    if(data) {
    console.log(data);
    }
    else
        return new Error('Error');
}
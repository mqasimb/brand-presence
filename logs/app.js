function displayStudyLog(data) {
    if(data) {
    var printData = data.reverse();
    for(var i=0; i<printData.length; i++) {
        var htmlLog = '';
        for(var key in data[i]) {
            htmlLog += '<li data-name="'+key+'">'+key + ' ' +data[i][key]+'</li>';
        }
        $('.load-logs').append('<div data-id="'+data[i]._id+'">'+htmlLog+'<button class="delete-button">Delete Log</button><button class="edit-button">Edit Button</div>');
    };
    console.log(data);
    }
    else
        return new Error('No Data');
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
        var updatePost = {
           title: $('input[name="title"]').val(),
	       topic: $('input[name="topic"]').val(),
	       summary: $('textarea[name="summary"]').val(),
	       questions: $('textarea[name="questions"]').val()
        }
        updateLog($(this).parent().data(), updatePost);
    });
});

function deleteLog(send) {
    var ajax = $.ajax('/logs/'+send.id, {
       type: 'DELETE',
       data: JSON.stringify(send)
    });
    ajax.done(displaydeleteLog);
}

function displaydeleteLog(data) {
    $('div[data-id="'+data._id+'"]').remove();
}

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

function displayUpdateLog(data) {
    if(data) {
    console.log(data);
    }
    else
        return new Error('Error');
}
$(document).on("keypress", "#comment", function(enter) {
  if (enter.which == 13) {
    var comment = $(this).val().trim();
    var thisID = $(this).parent().parent().parent().attr('data-id');
    
    $(this).val("");
    // POST comment:
    $.ajax({
      url: '/comment',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        _id: thisID,
        comment: comment
      })
    }).done(function(data) {
      // console.log(data)
      // loop through data to display comments
      data.forEach(function(value, i) {
        // console.log(value)
        // empty comments before appending to avoid duplication
        $('.' + value._id).html("");
        // loop through comments array to append them
        value.comment.forEach(function(comment, i) {
          $('.' + value._id).append('<li class="list-group-item">' + comment + '</li>');
          var deleteButton = $('<button class="btn btn-block btn-danger deleteComment">DELETE comment\</button>');
          $('.' + value._id).append(deleteButton);
        }); 
      }); 
    }); 
    // get updated comments
    $.ajax({
      url: '/comment/' + thisID,
      method: 'GET',
      contentType: 'application/json',
    });
  } 
});

// DELETE comment:
$(document).on("click", ".deleteComment", function() {
  var wantID = $(this).parent().parent().attr("data-id");
  var commentRemove = $(this).prev().text();
  // console.log(commentRemove)
  // DELETE comment:
  $.ajax({
    url: '/commentDelete',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      _id: wantID,
      comment: commentRemove
    })
  }).done(function(data) {
    // console.log(data)
    data.forEach(function(value, i) {
      
      $('.' + value._id).html("");
      
      value.comment.forEach(function(comment, i) {
        $('.' + value._id).append('<li class="list-group-item">' + comment + '</li>');
        var deleteButton = $('<button class="btn btn-block btn-danger deleteComment">Remove Comment\</button>');
        $('.' + value._id).append(deleteButton);
      }); 
    }); 

  }); 
}); 
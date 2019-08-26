$(function() {
  function buildHTML(message){
    var html = `<div class="chat-message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div> 
                    <div class="upper-message__date">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message_content">
                      ${ message.content }
                    </p>
                  </div>
                </div>`
    return html;
  }
  function scrollBottom(){
    var target = $('.chat-messages').last();
    var position = target.offset().top + $('.chat-messages').scrollTop();
    $('.chat-messages').animate({
      scrollTop: position
    }, 300, 'swing');
  }
  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-messages').append(html);
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      scrollBottom();
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
    })
  })
});
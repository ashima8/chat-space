$(function() {
  function buildHTML(message){
    var imagehtml =message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="chat-message" data-id="${message.id}">
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
                    ${ imagehtml }
                  </div>
                </div>`
    return html;
  }
  $("#new_message").on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-messages').append(html);
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.chat-messages').animate({scrollTop:$('.chat-messages')[0].scrollHeight}, 'fast');
      $('.hidden').val('');
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.chat-message').last().data('id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      messages.forEach(function(message) {
        insertHTML = buildHTML(message);
        $('.chat-messages').append(insertHTML);
        $('.chat-messages').animate({scrollTop: $('.chat-messages')[0].scrollHeight},'fast');
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});
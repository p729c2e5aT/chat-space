$(document).on('turbolinks:load',function(){
  function buildHTML(message) {
      var img = message.image ? `<img src = ${ message.image }>`: '';
      var html = `<div class="message" data-message-id="${message.id}">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                          ${img}
                      </div>
                    </div>`
      return html;
      }
  $('#new_message').on('submit', function(e){
        e.preventDefault();
        var message = new FormData(this);
        var url = $(this).attr('action')
        $.ajax({
          url: url,
          type: "POST",
          data: message,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(data){
          var html = buildHTML(data);
          $('.messages').append(html);
          $('.form__message').val('');
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        })
        .fail(function(data){
          alert('エラーが発生しました。メッセージは送信できませんでした。');
        })
        .always(function(data){
          $('.form__submit').prop('disabled', false);　
        })
    })
});


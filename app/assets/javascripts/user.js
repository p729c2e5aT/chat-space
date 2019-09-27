
$(document).on('turbolinks:load', function(){

  var search_list = $("#user-search-result");
  var member_list = $(".js-add-user");
  // $("#chat-group-users");
  function appendUser(name,id){
      var html =
                  `<div class='chat-group-user clearfix'>
                      <p class='chat-group-user__name'>${name}</p>
                      <div class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id="${id}" data-user-name="${name}">追加</div>
                  </div>`;
                  search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
      var html = 
                  `<div class='chat-group-user clearfix'>
                      <p class='chat-group-user__name'>${msg}</p>
                  </div>`;
                  search_list.append(html);
  }
  function addUser(name,id){
    var html =
                `<div class='chat-group-user clearfix'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}" data-user-name="${name}" >削除</div>
                </div>`;
                member_list.append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();

    $.ajax({
        type: 'GET',
        url:  '/users',
        data: { keyword: input},
        dataType: 'json'
    })

    .done(function(users){                // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる

        if (input.length !== 0){     // 値が等しくないもしくは型が等しくなければtrueを返す。
          $('#user-search-result').empty();
          users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
            appendUser(user.name, user.id)
          });
        }

        else {
            $('#user-search-result').empty(); 
            appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
    })

    .fail(function() {
        alert('ユーザー検索に失敗しました');
    });
  });


  
  $('#user-search-result').on('click', '.user-search-add', function(){
    var name = $(this).data("user-name");
    var id =$(this).data("user-id");
    addUser(name,id)
    $(this).parent().remove();
  })

  $(document).on('click', '.user-search-remove', function(){
    var name = $(this).data("user-name");
    var id =$(this).data("user-id");
    appendUser(name,id)
    $(this).parent().remove();
    })
})
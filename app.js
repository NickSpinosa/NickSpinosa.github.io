//strict typing
"use strict";

//app object
var twittlerApp = {};
var visitor;

//method for automated updating of twittles
twittlerApp.startStream = function(){
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    // var $tweet = $('<div></div>');
    // $tweet.text('@' + tweet.user + ': ' + tweet.message);
    // $tweet.appendTo($body);
    twittlerApp.render(tweet.message,tweet.user);
    index -= 1;
  }
}

//function for cloning tweet html
twittlerApp.render = function(message,user){
  var newTwittle = $($("#twittle-template").html()).clone();
  newTwittle.find('.message').prepend(message);
  newTwittle.find('.user').prepend(user);
  $("#feed").append(newTwittle);
};

//event handling for assigning visitor variable and beginning twittle rendering
$("#log-in").on("click",(item)=>{
  visitor = $("#username").val();
  $("#form")[0].reset();
  $("#login-modal").hide();
  twittlerApp.startStream();
})

//form validation
$().ready(()=>{
    $("#form").validate({
      rules: {
        username: {
          required:true
        },
        password: {
          required: true,
          minlength: 8
        }
      },
      messages: {
        email: "Please enter a valid email adress",
        password: "password must be at least 8 characters"
      }
    });
})

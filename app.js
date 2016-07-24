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
    twittlerApp.render(tweet.message,"@" + tweet.user,"#feed");
    index -= 1;
  }
}

//function for cloning tweet html
twittlerApp.render = function(message,user,location){
  var newTwittle = $($("#twittle-template").html()).clone();
  newTwittle.find('.message').prepend(message);
  newTwittle.find('.user').prepend(user);
  $(location).prepend(newTwittle);
};

//event handling for assigning visitor variable and beginning twittle rendering
$("#log-in").on("click",()=>{
  if($("#form").valid()){
    visitor = $("#username").val();
    $("#form")[0].reset();
    $("#title").html("@" + visitor + "'s feed");
    $("#login-modal").hide();
    twittlerApp.startStream();
  }
})

//event handling for generating user created twittles
$("#new-twittle-submit").on("click",(e)=>{
  e.preventDefault();
  if($("#new-twittle").valid()){
    streams.users[visitor] = [];
    writeTweet($("#twittleText").val());
    twittlerApp.render($("#twittleText").val(),"@" + visitor,"#feed");
    $("#new-twittle")[0].reset();
  }
})

//event handling for viewing a user's tweets
$("#feed").on("click",".user", function(myThis){
  $("#user-twittles").empty();
  var user = $(this).html();
  $(".modal-header #username").text(user +"'s Recent Tweets");
  streams.users[user.substring(1)].forEach((item)=>{
    twittlerApp.render(item.message,user,"#user-twittles");
  });
  $("#twittle-history").modal('show');
});

//log in validation
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
        username: "Please enter a username",
        password: "password must be at least 8 characters"
      }
    });
})

//new tweet validation
$().ready(()=>{
  $("#new-twittle").validate({
    rules: {
      twittleText: {
        required:true,
        maxlength:140
      }
    },
    messages: {
      twittleText: "Please enter a tweet \n *must be less than 140 characters"
    }
  });
})

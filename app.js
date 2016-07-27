//strict typing
"use strict";

//ports in moment
moment().format();

//data structures
var twittlerApp = {};
var visitor;

//method for automated updating of twittles
twittlerApp.startStream = function(){
  var index = streams.home.length - 1;
  while(index >= 0){
    twittlerApp.render(streams.home[index],"#feed");
    index -= 1;
  }
}

//method for cloning and appending tweet html
twittlerApp.render = function(tweet,location){
  var newTwittle = $($("#twittle-template").html()).clone();
  newTwittle.find('.message').prepend(tweet.message);
  newTwittle.find('.user').prepend("@" + tweet.user);
  newTwittle.find('.timeago').livestamp(tweet.created_at);
  $(location).prepend(newTwittle);
};

//method for generating and rendering new random twittles
twittlerApp.generateTwittle = function(){
  twittlerApp.render(generateRandomTweet(),"#feed");
  setTimeout(twittlerApp.generateTwittle, Math.random() * 5000);
}

//method for updating time with moment.js
twittlerApp.updateTime = function(time){
  return moment(time).fromNow();
  setTimeout(twittlerApp.updateTime, 25000,time);
}

//event handling for assigning visitor variable and beginning twittle rendering
$("#log-in").on("click",()=>{
  if($("#form").valid()){
    visitor = $("#username").val();
    streams.users[visitor] = [];
    $("#form")[0].reset();
    $("#title").html("@" + visitor + "'s feed");
    $("#login-modal").hide();
    twittlerApp.startStream();
    twittlerApp.generateTwittle();
  }
})

//event handling for generating user created twittles
$("#new-twittle-submit").on("click",(e)=>{
  e.preventDefault();
  if($("#new-twittle").valid()){
    writeTweet($("#twittleText").val());
    twittlerApp.render(streams.users[visitor][streams.users[visitor].length-1],"#feed");
    $("#new-twittle")[0].reset();
  }
})

//event handling for viewing a user's tweets
$("#feed").on("click",".user", function(myThis){
  $("#user-twittles").empty();
  var user = $(this).html();
  $(".modal-header #username").text(user +"'s Recent Twittles");
  streams.users[user.substring(1)].forEach((item)=>{
    twittlerApp.render(item,"#user-twittles");
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

var gamePattern=[];
var buttonColors=["red", "blue", "green","yellow"];
var userClickedPattern=[];
var level = 0;
var gameStarted=false;

$("#level-title").click(function(){
  if(!gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted= true;
  }
})
$(document).keypress(function(){
  if(!gameStarted){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted= true;
  }
})
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
function playsound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence(){
  level++;
  userClickedPattern=[];
  $("#level-title").text("Level " + level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
}
function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {
      nextSequence();
    }, 1000);
}}
else {
  playsound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Me again to Restart");
  startOver()
}
}
function startOver(){
   gamePattern=[];

userClickedPattern=[];
 level = 0;
gameStarted=false;
}

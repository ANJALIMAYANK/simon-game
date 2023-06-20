var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var gameStarted = false;
var level = 0;

$(document).keypress(function() {
    if (!gameStarted) {
      $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
        
    }
});
$(".btn").click(function()
{
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
   
});
function checkAnswer(currentLevel) {
   // check if the user's answer is correct
   if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
       // if the user has finished their sequence
       if (userClickedPattern.length === gamePattern.length) {
           // call nextSequence() after a delay
           setTimeout(() => {
               nextSequence();
           }, 1000);
       }
   } 
   else {
      playSound("wrong");

      $("body").addClass("game-over");
      $("h1").text("Game Over, Press Any Key to Restart");
      setTimeout(() => {
          $("body").removeClass("game-over");
      }, 200);

      startOver();
   }
}
function nextSequence()
{
   userClickedPattern = [];
   level++;
   $("#level-title").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);

}
function animatePress(currentColour)
{
   $("#"+ currentColour).addClass("pressed");
    setTimeout(() => {
      $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function playSound(name)
{
   var audio=new Audio("sounds/"+ name + ".mp3");
   audio.play();
}


function startOver()
{
  level=0;
  gamePattern = [];
  gameStarted = false;
}


let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = []; 

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }    
})

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
    console.log(userClickedPattern);
})

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success!")
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
} else {
    console.log ("wrong!")
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
}

}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    //Use jQuery to select the button with the same id as the randomChosenColour.
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    //Play sound
    playSound(randomChosenColor);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function animatePress(currentColor){
    //Add "pressed" Class to button pressed.
    $("#"+ currentColor).addClass("pressed");
    
    //Remove "pressed" Class from the button after a delay.
    setTimeout(function() {
        $("#"+ currentColor).removeClass("pressed");
      }, 100);

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}




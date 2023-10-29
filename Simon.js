var buttonColor = ["red", "green", "yellow", "blue"];

var gamePattern = [];
var userGamePattern = [];

var started = false;

var count = 0;

$(document).keypress(function(){

    if(!started){
        $(".header_title").text("Level " + count);
        nextSequence();
        started = true;
    }    
})

$(".btn").click(function(){
    var buttonClicked = $(this).attr("id");
    userGamePattern.push(buttonClicked);

    playSound(buttonClicked);
    animatePress(buttonClicked);

    checkAnswer(userGamePattern.length - 1);
})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userGamePattern[currentLevel]){
        console.log("Success");

        if(userGamePattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }

    else {
      console.log("Wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $(".header_title").text("Game over, press any key to restart.")

        startOver();
}
}

function nextSequence(){
    userGamePattern = [];
    count++;

    $(".header_title").text("Level " + count);
    
    var randomNumber = Math.floor(Math.random *4);

    var randomChosenColor = buttonColor[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
}

function playSound(name){
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}

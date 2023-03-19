var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [], userClickedPattern = [];
var level = 0;
var started = false, restarted;

function nextSequence() {

    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $('#' + currentColor).addClass("pressed");
    setTimeout(function(){
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function(){
    var userColorChosen = this.id;
    userClickedPattern.push(userColorChosen);
    playSound(userColorChosen);
    animatePress(userColorChosen);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(currentLevel == gamePattern.length - 1){
            setTimeout(function(){
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
            setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("h1").text("Game Over, Press here to Restart");
    started = false;
}

$("#level-title").click(function(){
    if(started == false){
        nextSequence();
    }
    started = true;
});
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var randomChosenColour = "";


// Add keybinds?



function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play(); 
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
};

function animatePress(currentColour){
    $("."+ currentColour).addClass("pressed");
    setTimeout(function(){$("."+ currentColour).removeClass("pressed")}, 100);
}

function replayGamePattern(){
    var i = 0;
    function replayLoop(){
        setTimeout(function(){
            var colour = $("#"+gamePattern[i])
            colour.fadeIn(100).fadeOut(150).fadeIn(100);
            playSound(gamePattern[i]);
            i++;
            if (i < gamePattern.length){
                replayLoop();
            }
        }, 1000)
    }
    replayLoop();
    return "Done"
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            nextSequence();
            replayGamePattern();
        }
    } else {
        console.log("failure");
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").html("Game Over :(. Press any key to restart.");
        setTimeout(function(){$("body").removeClass("game-over")}, 200);
        startOver();
    }
}

$(document).on("keydown", function(){
    if (!started) {
        $("#level-title").text("Level " + level); 
        nextSequence();
        animatePress(randomChosenColour);
        playSound(randomChosenColour);
        started = true;
    }
});


$(".btn").click(function(){
    if (!started){
        alert("Press a keybaord key to begin!");
    } else {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        $("#"+randomChosenColour).fadeIn(100).fadeOut(150).fadeIn(100);
        checkAnswer(userClickedPattern.length-1);
    }
});



$("#here").on("click", function(){
    if (!started) {
        $("#level-title").text("Level " + level); 
        nextSequence();
        $("#"+randomChosenColour).fadeIn(100).fadeOut(150).fadeIn(100);
        playSound(randomChosenColour);
        started = true;
    }
});

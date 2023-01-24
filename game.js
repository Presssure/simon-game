var buttonColours=["red", "blue","green", "yellow"];
var gamePattern=[];

var userClickedPattern=[]

var start=false;
var level=0;
var passed=false;

// The start code detecting a key press
$(document).keypress(function(){
    if(start==false){
    $("#level-title").text("Level 0");
    nextSequence();
    start=true;
    }
});


function nextSequence(){
    // choosses random colour and pushes to the game pattern array
    var randomNumber=Math.ceil(Math.random()*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // updates the level text
    $("#level-title").text("Level "+level);
    // animates the colour
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}




$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userChosenColour);
});

// creates a sound object and plays it
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

// animates the pressed button
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    // waits for 100 milli seconds then activates
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);

}

function checkAnswer(input){
    console.log("this is game: "+gamePattern);
    console.log("User pattern: "+userClickedPattern);
    for(i=0; i<userClickedPattern.length;i++){
        console.log(gamePattern.length);
        if(gamePattern[i]!=userClickedPattern[i]){
            console.log("this is false");
            playSound("wrong");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            startOver();
            return false;
       }
    }
    if(gamePattern.length==userClickedPattern.length){
        console.log("user: "+userClickedPattern.length);
        console.log("game: "+gamePattern.length);
        passed=true;
    }
    if(passed){
        passed=false;
        userClickedPattern.length=0;
        level++;
        setTimeout(function(){
            nextSequence();
        },1000);
    }
    return true;
}


function startOver(){
    level=0;
    gamePattern=[];
    start=false;
}
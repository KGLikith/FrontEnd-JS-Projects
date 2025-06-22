var colors=["green","red","yellow","blue"];

var pattern=[];

var userClickedPattern=[];

var level=0;

start();
function start(){
    pattern=[];
    level=0;
    $("html").one("keypress",function(){
        nextSequence();
    })
}

document.


$(".btn").click(function(){
    var userchosencolor=$(this).attr("id");
    userClickedPattern.push(userchosencolor);

    anima(userchosencolor);
    playSound(userchosencolor);

    checkInput(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level " + level);
    let rand=Math.floor(Math.random() * 4 );
    let randcolor=colors[rand];
    pattern.push(randcolor);
    $("#"+randcolor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randcolor);
}

function anima(name){
    $("#" + name).addClass("pressed");
    setTimeout(function(){
        $("#"+ name).removeClass("pressed");
    },100);
}

function playSound(name){
    var aud="sounds/" + name +".mp3";
    var audio=new Audio(aud);
    audio.play();
}

function checkInput(currentLevel){
    if(userClickedPattern[currentLevel] === pattern[currentLevel]){
        console.log("suc");
        if(userClickedPattern.length == pattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }
    }else{
        let aud=new Audio("sound/wrong.mp3");
        aud.play();
        $("body").addClass("game-over");
        setTimeout(function(){ // () =>{}
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        start();
    }
}


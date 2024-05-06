var soundList = []; // 4
var i = 0;
var levelCount = 1;
var start = true;
function startGame() {
    document.addEventListener('keypress', function() {
        if (start) {
            startLevel();
            start = false;
        }
    })

}
startGame();
function startLevel() {
    $('#level-title').text('Level ' + levelCount);
    var randomColorNo = Math.floor(Math.random() * 4 + 1);
    console.log(randomColorNo);
    soundList.push(randomColorNo);
    var x = 800;
    if (levelCount === 1) x = 200;
    setTimeout(function() {
        makeSound(randomColorNo);
    }, x);
}
var lose = 0;
function checkCrctColor(colorNo) {
    if (colorNo === soundList[i]) {
        makeSound(colorNo);
        i++;
        if (i >= soundList.length) {
            levelCount++;
            startLevel();
            i = 0;
        }
    } else {
        lose = 1;
        makeSound(colorNo);
    }
}


$('#green').on('click', function() {
    checkCrctColor(1);
})
$('#red').on('click', function() {
    checkCrctColor(2);
})
$('#yellow').on('click', function() {
    checkCrctColor(3);
})
$('#blue').on('click', function() {
    checkCrctColor(4);
})



function makeSound(colorNo) {
    switch (colorNo) {
        case 1:
            playSoundAndBlink('green');
            break;
        case 2:
            playSoundAndBlink('red');
            break;
        case 3:
            playSoundAndBlink('yellow');
            break;
        case 4:
            playSoundAndBlink('blue');
            break;
    
    }
}

function playSoundAndBlink(color) {
    if (lose == 1) {
        $('body').css('background-color', 'red');
        setTimeout(function() {
            $('body').css('background-color', '#011F3F', 10000);
        }, 200);
        $('#level-title').text('Game Over, press any key to start');
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();
        lose = 0;
        i = 0;
        soundList = [];
        levelCount = 1;
        start = true;
        startGame();
    } else {
        var audio = new Audio('sounds/' + color + '.mp3');
        audio.play();
    }
    $('#'+color).fadeOut(100);
    $('#'+color).fadeIn(100);
}
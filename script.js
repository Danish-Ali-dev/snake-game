// Game Constants & Variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 8;
let lastPaintTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let foodPosition = { x: 6, y: 7 };

// Game Functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If snake is bump himself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            return true
        }
    }

    // If snake is bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

gameEngine = () => {

    // Part 1 : Updating Snake Array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert('Game Over. If you want to play again then Press any key');
        snakeArr = [{ x: 13, y: 15 }]
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increment the score & regenerate the food
    if (snakeArr[0].x === foodPosition.x && snakeArr[0].y === foodPosition.y) {
        foodSound.play();
        score++;
        scoreBox.innerHTML = 'Score: ' + score;
        if (score > highScoreValue) {
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue));
            highScoreBox.innerHTML = "High Score: " + highScoreValue;
        }
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        foodPosition = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2 : Display Snake & Food

    // Display Snake
    board.innerHTML = '';
    snakeArr.forEach((e, i) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (i === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);
    })

    // Display Food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}


// Main Logic Start Here
musicSound.play();

let highScore = localStorage.getItem('highScore');
if (highScore == null) {
    highScoreValue = 0;
    localStorage.setItem('highScore', JSON.stringify(highScoreValue));
}
else {
    highScoreValue = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScoreValue;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };  // Start the game
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const BLOCK_SIZE = 20;
const MAP_SIZE = canvas.width / BLOCK_SIZE;
let score = 0;
let gameInterval;

const snake = {
    body: [{ x: MAP_SIZE / 2, y: MAP_SIZE / 2 }],
    size: 5,
    direction: { x: 0, y: -1 },
    drawSnake() {
        this.moveSnake();
        ctx.fillStyle = 'lime';
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(
                this.body[i].x * BLOCK_SIZE,
                this.body[i].y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
    },
    moveSnake() {
        const newBlock = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(newBlock);
        while (this.body.length > this.size) {
            this.body.pop();
        }
    }
};

const apple = {
    x: 5,
    y: 5,
    drawApple() {
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.x * BLOCK_SIZE,
            this.y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
        );
    },
    putApple() {
        let valid = false;
        while (!valid) {
            this.x = Math.floor(Math.random() * MAP_SIZE);
            this.y = Math.floor(Math.random() * MAP_SIZE);
            valid = true;
            for (let i = 0; i < snake.body.length; i++) {
                if (snake.body[i].x === this.x && snake.body[i].y === this.y) {
                    valid = false;
                    break;
                }
            }
        }
    }
};

function drawGame() {
    drawMap();
    apple.drawApple();
    snake.drawSnake();
    eatApple();
    drawScore();
    checkDeath();
}

function drawMap() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function eatApple() {
    if (snake.body[0].x === apple.x && snake.body[0].y === apple.y) {
        snake.size++;
        score++;
        apple.putApple();
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "14px Verdana";
    ctx.fillText("分數：" + score, 10, 20);
}

function checkDeath() {
    // 撞牆
    if (
        snake.body[0].x < 0 || snake.body[0].x >= MAP_SIZE ||
        snake.body[0].y < 0 || snake.body[0].y >= MAP_SIZE
    ) {
        clearInterval(gameInterval);
        alert("遊戲結束！分數：" + score);
        return;
    }
    // 撞自己
    for (let i = 1; i < snake.body.length; i++) {
        if (snake.body[0].x === snake.body[i].x &&
            snake.body[0].y === snake.body[i].y) {
            clearInterval(gameInterval);
            alert("遊戲結束！分數：" + score);
            return;
        }
    }
}

// === 鍵盤控制 ===
document.addEventListener("keydown", keyDown);
function keyDown(event) {
    if ((event.keyCode === 38 || event.keyCode === 87) && snake.direction.y !== 1) {
        snake.direction = { x: 0, y: -1 };
    } else if ((event.keyCode === 40 || event.keyCode === 83) && snake.direction.y !== -1) {
        snake.direction = { x: 0, y: 1 };
    } else if ((event.keyCode === 37 || event.keyCode === 65) && snake.direction.x !== 1) {
        snake.direction = { x: -1, y: 0 };
    } else if ((event.keyCode === 39 || event.keyCode === 68) && snake.direction.x !== -1) {
        snake.direction = { x: 1, y: 0 };
    }
}

// === 遊戲開始 ===
function gameStart() {
    // 重置遊戲
    snake.body = [{ x: MAP_SIZE / 2, y: MAP_SIZE / 2 }];
    snake.size = 5;
    snake.direction = { x: 0, y: -1 };
    score = 0;
    apple.putApple();

    clearInterval(gameInterval);
    gameInterval = setInterval(drawGame, 100);
}

// === 監聽按鈕 ===
document.getElementById("buttonStart").addEventListener("click", gameStart);

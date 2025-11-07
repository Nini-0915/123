const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const buttonStart = document.getElementById("buttonStart");

const BLOCK_SIZE = 20;
const MAP_SIZE = canvas.width / BLOCK_SIZE;
const playerKey1 = [38, 40, 37, 39]; // ↑ ↓ ← →
const playerKey2 = [87, 83, 65, 68]; // W S A D

let snake1, snake2, apple;
let gameInterval, appleInterval;

// === 蛇蛇類別 ===
class Snake {
    constructor(startX, startY, snakeColor, playerKey) {
        this.body = [{ x: startX, y: startY }];
        this.size = 5;
        this.score = 0;
        this.color = snakeColor;
        this.direction = { x: 0, y: -1 };
        this.playerKey = playerKey;
    }

    drawSnake() {
        this.moveSnake();
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.body.length; i++) {
            ctx.fillRect(
                this.body[i].x * BLOCK_SIZE,
                this.body[i].y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
        this.eatApple();
    }

    moveSnake() {
        const newBlock = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };
        this.body.unshift(newBlock);
        while (this.body.length > this.size) {
            this.body.pop();
        }
        this.checkDeath();
    }

    eatApple() {
        for (let i = 0; i < apple.apples.length; i++) {
            if (
                this.body[0].x === apple.apples[i].x &&
                this.body[0].y === apple.apples[i].y
            ) {
                apple.apples.splice(i, 1);
                this.size++;
                this.score++;
                break;
            }
        }
    }

    checkDeath() {
        const head = this.body[0];
        // 撞牆
        if (
            head.x < 0 || head.x >= MAP_SIZE ||
            head.y < 0 || head.y >= MAP_SIZE
        ) {
            this.score -= 5;
            gameOver();
        }
        // 撞到自己
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                this.score -= 5;
                gameOver();
            }
        }
    }

    move(event) {
        if (event.keyCode === this.playerKey[0] && this.direction.y !== 1) {
            this.direction = { x: 0, y: -1 }; // up
        } else if (event.keyCode === this.playerKey[1] && this.direction.y !== -1) {
            this.direction = { x: 0, y: 1 }; // down
        } else if (event.keyCode === this.playerKey[2] && this.direction.x !== 1) {
            this.direction = { x: -1, y: 0 }; // left
        } else if (event.keyCode === this.playerKey[3] && this.direction.x !== -1) {
            this.direction = { x: 1, y: 0 }; // right
        }
    }
}

// === 蘋果類別 ===
class Apple {
    constructor() {
        this.apples = [];
        this.putApple();
    }

    putApple() {
        let x = Math.floor(Math.random() * MAP_SIZE);
        let y = Math.floor(Math.random() * MAP_SIZE);
        this.apples.push({ x, y });
    }

    drawApple() {
        ctx.fillStyle = 'red';
        for (let i = 0; i < this.apples.length; i++) {
            ctx.fillRect(
                this.apples[i].x * BLOCK_SIZE,
                this.apples[i].y * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
    }
}

// === 遊戲主要流程 ===
function gameStart() {
    clearInterval(gameInterval);
    clearInterval(appleInterval);

    // 初始化
    apple = new Apple();
    snake1 = new Snake(MAP_SIZE / 2, MAP_SIZE / 2, 'lime', playerKey1);
    snake2 = new Snake(MAP_SIZE / 4, MAP_SIZE / 2, 'yellow', playerKey2);

    gameInterval = setInterval(drawGame, 100);
    appleInterval = setInterval(() => apple.putApple(), 3000);
}

function drawGame() {
    drawMap();
    apple.drawApple();
    snake1.drawSnake();
    snake2.drawSnake();
    drawScore();
}

function drawMap() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px Verdana";
    ctx.fillText("Player1: " + snake1.score, 10, 20);
    ctx.fillText("Player2: " + snake2.score, 10, 40);
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(appleInterval);

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "28px Verdana";
    ctx.fillText("遊戲結束！", canvas.width / 2 - 70, canvas.height / 2);
}

// === 監聽 ===
buttonStart.addEventListener("click", gameStart);
document.addEventListener('keydown', (event) => {
    snake1.move(event);
    snake2.move(event);
});


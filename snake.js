const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// === 遊戲設定 ===
const BLOCK_SIZE = 20;
const MAP_SIZE = canvas.width / BLOCK_SIZE;
let score = 0;
let gameInterval;
let gameSpeed = 150;       // 初始速度（越小越快）
let isPaused = false;      // 暫停狀態
let directionChanged = false;

// === 蛇 ===
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

// === 蘋果 ===
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

// === 遊戲主迴圈 ===
function drawGame() {
    drawMap();
    apple.drawApple();
    snake.drawSnake();
    eatApple();
    drawScore();
    checkDeath();
    directionChanged = false;
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

        // 🎮 提升難度：每5分加速
        if (score % 5 === 0 && gameSpeed > 50) {
            gameSpeed -= 10; // 加快速度
            restartInterval();
        }
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "14px Verdana";
    ctx.fillText("分數：" + score, 10, 20);
    ctx.fillText("速度：" + (150 - gameSpeed) / 10, 10, 40);
}

function checkDeath() {
    const head = snake.body[0];

    // 撞牆
    if (head.x < 0 || head.x >= MAP_SIZE || head.y < 0 || head.y >= MAP_SIZE) {
        endGame();
        return;
    }

    // 撞自己
    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            endGame();
            return;
        }
    }
}

function endGame() {
    clearInterval(gameInterval);

    // 在畫布上顯示「Game Over」
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "36px Verdana";
    ctx.fillText("遊戲結束", canvas.width / 2 - 100, canvas.height / 2 - 10);
    ctx.font = "20px Verdana";
    ctx.fillText("Game Over", canvas.width / 2 - 60, canvas.height / 2 + 20);
    ctx.font = "16px Verdana";
    ctx.fillText("按 Start 重新開始", canvas.width / 2 - 85, canvas.height / 2 + 60);

    document.getElementById("buttonStart").disabled = false;
}

// === 鍵盤控制（防多重方向） ===
document.addEventListener("keydown", keyDown);

function keyDown(event) {
    if (directionChanged) return;

    if ((event.keyCode === 38 || event.keyCode === 87) && snake.direction.y !== 1) {
        snake.direction = { x: 0, y: -1 };
        directionChanged = true;
    } else if ((event.keyCode === 40 || event.keyCode === 83) && snake.direction.y !== -1) {
        snake.direction = { x: 0, y: 1 };
        directionChanged = true;
    } else if ((event.keyCode === 37 || event.keyCode === 65) && snake.direction.x !== 1) {
        snake.direction = { x: -1, y: 0 };
        directionChanged = true;
    } else if ((event.keyCode === 39 || event.keyCode === 68) && snake.direction.x !== -1) {
        snake.direction = { x: 1, y: 0 };
        directionChanged = true;
    }
}

// === 遊戲開始 ===
function gameStart() {
    snake.body = [{ x: MAP_SIZE / 2, y: MAP_SIZE / 2 }];
    snake.size = 5;
    snake.direction = { x: 0, y: -1 };
    score = 0;
    gameSpeed = 150;
    apple.putApple();
    isPaused = false;

    restartInterval();
    document.getElementById("buttonStart").disabled = true;
    document.getElementById("buttonPause").value = "Pause";
}

// === 暫停 / 繼續 ===
function togglePause() {
    if (isPaused) {
        // 恢復遊戲
        restartInterval();
        isPaused = false;
        document.getElementById("buttonPause").value = "Pause";
    } else {
        // 暫停遊戲
        clearInterval(gameInterval);
        isPaused = true;
        document.getElementById("buttonPause").value = "Resume";

        // 畫面顯示「暫停中」
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "28px Verdana";
        ctx.fillText("暫停中", canvas.width / 2 - 60, canvas.height / 2);
    }
}

// === 重新啟動 Interval（用於加速或繼續） ===
function restartInterval() {
    clearInterval(gameInterval);
    gameInterval = setInterval(drawGame, gameSpeed);
}

// === 監聽按鈕 ===
document.getElementById("buttonStart").addEventListener("click", gameStart);
document.getElementById("buttonPause").addEventListener("click", togglePause);

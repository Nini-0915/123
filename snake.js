const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//建立蛇蛇、蘋果物件
//加上屬性    
snake = {
	//身體位置    
    body: [ { x: MAP_SIZE / 2, y: MAP_SIZE / 2 } ],  
    //身體長度    
    size: 5, 
    //行進方向 
    direction: { x: 0, y: -1 }, 
    //畫蛇
    drawSnake: function () {
        this.moveSnake();
        ctx.fillStyle='lime';
        for (let i=0; i<this.body.length; i++){      
            ctx.fillRect(
            this.body[i].x * BLOCK_SIZE,
            this.body[i].y * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
            );
        }

    },
    //移動蛇
    moveSnake: function () {
        newBlock = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        }
        this.body.unshift(newBlock);
        while (this.body.length > this.size) {

            this.body.pop();
        }

    },
}
apple = {
    //蘋果位置
    x: 5,
    y: 5,
    //畫蘋果
    drawApple: function () {
        ctx.fillStyle = 'red';
        ctx.fillRect(
            this.x * BLOCK_SIZE ,
            this.y * BLOCK_SIZE ,
            BLOCK_SIZE ,
            BLOCK_SIZE
        );

    },
    //放蘋果
    putApple: function () {
        this.x = Math.floor(Math.random() * MAP_SIZE);
        this.y = Math.floor(Math.random() * MAP_SIZE);
    },
}
for (let i=0; i<snake.body.length; i++) {
    if (snake.body[i].x === apple.x && snake.body[i].y === apple.y) {
        this.x = Math.floor(Math.random() * MAP_SIZE);
        this.y = Math.floor(Math.random() * MAP_SIZE);
        putApple();
        return;
    }
}
function gameStart() {
    gameInterval = setInterval(drawGame, 100);
}
/////
gameStart(); //執行開始遊戲
function keyDown(event) {
    // ↑ 上箭頭 或 W
    if (event.keyCode === 38 || event.keyCode === 87) {
        if (snake.direction.y === 1) return; // 避免向下時直接反轉
        snake.direction.y = -1;
        snake.direction.x = 0;
    }

    // ↓ 下箭頭 或 S
    else if (event.keyCode === 40 || event.keyCode === 83) {
        if (snake.direction.y === -1) return; // 避免向上時直接反轉
        snake.direction.y = 1;
        snake.direction.x = 0;
    }

    // ← 左箭頭 或 A
    else if (event.keyCode === 37 || event.keyCode === 65) {
        if (snake.direction.x === 1) return; // 避免向右時直接反轉
        snake.direction.x = -1;
        snake.direction.y = 0;
    }

    // → 右箭頭 或 D
    else if (event.keyCode === 39 || event.keyCode === 68) {
        if (snake.direction.x === -1) return; // 避免向左時直接反轉
        snake.direction.x = 1;
        snake.direction.y = 0;
    }
}

// 監聽鍵盤事件
document.addEventListener("keydown", keyDown);
const BLOCK_SIZE = 20;  //放大畫素，20點為一格
const MAP_SIZE = canvas.width/BLOCK_SIZE ; // (寬400 / 格20) = 20格子(列)
let score = 0;      // 紀錄分數

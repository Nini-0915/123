// ----------------------------
// 取得 DOM 元素
// ----------------------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('color');
const lineWidthRange = document.getElementById('lineWidth');
const valueOutput = document.getElementById('value');
const colorPreview = document.getElementById('colorPreview');
const eraserBtn = document.getElementById('eraser');
const showBtn = document.getElementById('toshow');
const downloadBtn = document.getElementById('download');
const clearBtn = document.getElementById('clear');
const showImg = document.getElementById('show');

// ----------------------------
// 初始設定
// ----------------------------
let drawing = false;
let isEraser = false;
let color = colorPicker.value;
let lineWidth = lineWidthRange.value;

colorPreview.style.backgroundColor = color;
valueOutput.textContent = lineWidth;

// ----------------------------
// 畫圖事件
// ----------------------------
canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stop);
canvas.addEventListener('mouseleave', stop);

function start(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = isEraser ? "#ffffff" : color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

function stop() {
    drawing = false;
    ctx.beginPath();
}

// ----------------------------
// 顏色選擇
// ----------------------------
colorPicker.addEventListener('input', e => {
    color = e.target.value;
    colorPreview.style.backgroundColor = color;
    isEraser = false;
    eraserBtn.textContent = "🧼 橡皮擦模式";
});

// ----------------------------
// 線條粗細
// ----------------------------
lineWidthRange.addEventListener('input', e => {
    lineWidth = e.target.value;
    valueOutput.textContent = lineWidth;
});

// ----------------------------
// 橡皮擦模式切換
// ----------------------------
eraserBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserBtn.textContent = isEraser ? "✏️ 返回畫筆" : "🧼 橡皮擦模式";
});

// ----------------------------
// 清除畫布
// ----------------------------
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ----------------------------
// 產生預覽圖片（自動白底）
// ----------------------------
showBtn.addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // 白底
    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // 把原本畫布內容貼上
    tempCtx.drawImage(canvas, 0, 0);

    // 生成圖片
    showImg.src = tempCanvas.toDataURL("image/png");

    // 確保圖片可見
    showImg.style.display = "block";
    showImg.style.width = "400px"; // 可調整大小
    showImg.style.height = "auto";

    console.log("預覽生成完成");
});


// ----------------------------
// 下載圖片（自動白底）
// ----------------------------
downloadBtn.addEventListener('click', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // 白底
    tempCtx.fillStyle = "#ffffff";
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // 把畫布內容貼上
    tempCtx.drawImage(canvas, 0, 0);

    // 下載
    const link = document.createElement('a');
    link.download = 'my_drawing.png';
    link.href = tempCanvas.toDataURL("image/png");
    link.click();
});
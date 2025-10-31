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

let drawing = false;
let isEraser = false;
let color = colorPicker.value;
let lineWidth = lineWidthRange.value;

colorPreview.style.backgroundColor = color;

// --- 畫圖 ---
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

// --- 顏色選擇 ---
colorPicker.addEventListener('input', e => {
    color = e.target.value;
    colorPreview.style.backgroundColor = color;
    isEraser = false;
    eraserBtn.textContent = "🧼 橡皮擦模式";
});

// --- 線條粗細 ---
lineWidthRange.addEventListener('input', e => {
    lineWidth = e.target.value;
    valueOutput.textContent = lineWidth;
});

// --- 橡皮擦模式 ---
eraserBtn.addEventListener('click', () => {
    isEraser = !isEraser;
    eraserBtn.textContent = isEraser ? "✏️ 返回畫筆" : "🧼 橡皮擦模式";
});

// --- 清除畫布 ---
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// --- 顯示圖片 ---
showBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL("image/png");
    showImg.src = dataURL;
});

// --- 下載圖片 ---
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'my_drawing.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
});

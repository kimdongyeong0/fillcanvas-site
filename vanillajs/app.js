'use strict';
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const INITIAL_COLOR = "hsl(0, 0%, 100%)";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "hsl(0, 0%, 100%)";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}

function stopPainting() {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}


function onChangeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function onClickCanvas() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function onRangeChange() {
    const strokeSize = event.target.value;
    ctx.lineWidth = strokeSize;
}

function onModeChange() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function onSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleav", stopPainting);
    canvas.addEventListener("click", onClickCanvas);
}

Array.from(colors).forEach(color => color.addEventListener("click", onChangeColor));


if (range) {
    range.addEventListener("input", onRangeChange);
}

if (mode) {
    mode.addEventListener("click", onModeChange);
}

if (saveBtn) {
    saveBtn.addEventListener("click", onSaveClick);
}

// 색깔 버튼 클릭시 클릭된부분 활성화 코드.
let controlsColors = document.querySelectorAll(".divSetting");
let i;

function onClickEvent() {
    let plusColors = document.querySelector(".backgroundcolor-plus");
    if (plusColors) {
        plusColors.classList.remove("backgroundcolor-plus");
    }
    this.classList.add("backgroundcolor-plus");
}

for (i = 0; i < controlsColors.length; i++) {
    controlsColors[i].addEventListener("click", onClickEvent);
}


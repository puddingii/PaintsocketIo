const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const freeBtn = document.getElementById("jsFree");
const rectBtn = document.getElementById("jsRect");
const circleBtn = document.getElementById("jsCircle");

const INITIAL_COLOR = "#2c2c2c";
const CONVAS_SIZE = 700;

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

//strokestyle은 어떤색으로 나타낼건지.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let nowShape = "free";
let rectBegin = {
    x:0,
    y:0
};
let circleBegin = {
    x:0,
    y:0
};

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;

    if(nowShape === "free") {
        if(!painting) {
            ctx.beginPath();
            ctx.moveTo(x,y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    } else if(nowShape === "circle") {
        if(!painting) {
            ctx.beginPath();
        }
    }
}

function onMouseDown(e) {
    painting = true;
    if(nowShape === "rect") {
        rectBegin.x = e.offsetX;
        rectBegin.y = e.offsetY;
    } else if(nowShape ==="circle") {
        circleBegin.x = e.offsetX;
        circleBegin.y = e.offsetY;
    }
}

function onMouseUp(e) {
    painting = false;
    let x = e.offsetX;
    let y = e.offsetY;
    
    if(nowShape === "rect") {
        ctx.fillRect(rectBegin.x, rectBegin.y, x-rectBegin.x, y-rectBegin.y);
    } else if(nowShape ==="circle") {
        ctx.beginPath();
        const radius = Math.sqrt(Math.pow(circleBegin.x-x,2) + Math.pow(circleBegin.y-y,2))/2; 
        ctx.arc((circleBegin.x+x)/2, (circleBegin.y+y)/2, radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function handleColor(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(e) {
    const size = e.target.value
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleConvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CONVAS_SIZE, CONVAS_SIZE);
    }
}

//우클릭 방지 contextmenu는 우클릭할때의 창이 뜨는걸 말함.
function handleCM(e) {
    e.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();
}

function handleFreeClick() {
    if(nowShape !== "free") {
        freeBtn.innerText = "free..";
        rectBtn.innerText = "rect";
        circleBtn.innerText = "Circle";
        nowShape = "free";
    }
}

function handleRectClick() {
    if(nowShape !== "rect") {
        freeBtn.innerText = "free";
        rectBtn.innerText = "Rect..";
        circleBtn.innerText = "Circle";
        nowShape = "rect";
    }
}

function handleCircleClick() {
    if(nowShape !== "circle") {
        freeBtn.innerText = "free";
        rectBtn.innerText = "Rect";
        circleBtn.innerText = "Circle..";
        nowShape = "circle";
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);  //클릭했을때의 이벤트
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleConvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColor));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}

if(freeBtn) {
    freeBtn.addEventListener("click", handleFreeClick);
}

if(rectBtn) {
    rectBtn.addEventListener("click", handleRectClick);
}

if(circleBtn) {
    circleBtn.addEventListener("click", handleCircleClick);
}

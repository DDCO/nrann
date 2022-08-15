const canvas = document.getElementById('myCanvas');
const context = canvas.getContext("2d");
const clearBtn = document.getElementById('clearBtn');
const trainBtn = document.getElementById('trainBtn');
const result = document.getElementById('result');
let isDrawing = false;
const isDebug = false;

function draw (x, y) {
    context.beginPath();
    context.arc(x, y, 8, 0, 2 * Math.PI);
    context.fill();
}

function getImage () {
    context.drawImage(canvas, 0, 0, canvas.width * 0.1, canvas.height * 0.1);
    return context.getImageData(0, 0, 28, 28);
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    if (isDebug) {
        console.log(event);
    }
});

canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
    const image = getImage();
    result.innerText = classify(image);
    if (isDebug) {
        console.log(event);
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        draw(event.offsetX, event.offsetY);
    }
    if (isDebug) {
        console.log(event);
    }
});

canvas.addEventListener('mouseout', (event) => {
    isDrawing = false;
    if (isDebug) {
        console.log(event);
    }
});

clearBtn.addEventListener('click', (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    result.innerText = '-';
    if (isDebug) {
        console.log(event);
    }
});

trainBtn.addEventListener('click', async (event) => {
    const fit = await train();
    alert('Model successfully trained');
    console.log(fit);
    if (isDebug) {
        console.log(event);
    }
});
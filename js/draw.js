const canvas = document.getElementById('myCanvas');
const hiddenCanvas = document.getElementById('hiddenCanvas');
const context = canvas.getContext("2d");
const hiddenContext = hiddenCanvas.getContext("2d");
const clearBtn = document.getElementById('clearBtn');
const trainBtn = document.getElementById('trainBtn');
const trainSize = document.getElementById('trainSize');
const saveBtn = document.getElementById('saveBtn');
const loadBtn = document.getElementById('loadBtn');
const result = document.getElementById('result');
let isDrawing = false;
const isDebug = false;

function draw (x, y) {
    context.beginPath();
    context.arc(x, y, 10, 0, 2 * Math.PI);
    context.fill();
}

function getImage () {
    hiddenContext.drawImage(canvas, 0, 0, 28, 28);
    return hiddenContext.getImageData(0, 0, 28, 28);
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    if (isDebug) {
        console.log(event);
    }
});

canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
    if (isDebug) {
        console.log(event);
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        draw(event.offsetX, event.offsetY);
        const image = getImage();
        result.innerText = classify(image);
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
    hiddenContext.clearRect(0, 0, canvas.width, canvas.height);
    result.innerText = '-';
    if (isDebug) {
        console.log(event);
    }
});

trainBtn.addEventListener('click', async (event) => {
    const size = parseInt(trainSize.value, 10);
    const fit = await train(size);
    alert('Model successfully trained');
    console.log(fit);
    if (isDebug) {
        console.log(event);
    }
});

saveBtn.addEventListener('click', async (event) => {
    save();
});

loadBtn.addEventListener('click', async (event) => {
    await load();
});
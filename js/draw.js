const canvas = document.getElementById('myCanvas');
const context = canvas.getContext("2d");
const clearBtn = document.getElementById('clearBtn');
const result = document.getElementById('result');
let isDrawing = false;

function draw (x, y) {
    context.beginPath();
    context.arc(x, y, 8, 0, 2 * Math.PI);
    context.fill();
}

function getImage () {
    return context.getImageData(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    console.log(event);
});

canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;
    const image = getImage();
    result.innerText = classify(image);
    console.log(event);
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        draw(event.offsetX, event.offsetY);
    }
    console.log(event);
});

canvas.addEventListener('mouseout', (event) => {
    isDrawing = false;
    console.log(event);
});

clearBtn.addEventListener('click', (event) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(event);
})
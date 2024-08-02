const map = document.getElementById('map');
const canvas = document.getElementById('drawing-canvas');
const detailsLayer = document.getElementById('details-layer');

const context = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let zoomLevel = 100; // Percentage

function handleZoom(delta) {
    zoomLevel = Math.min(400, Math.max(100, zoomLevel + delta)); // Limit zoom levels between 100% and 400%
    map.style.transform = `scale(${zoomLevel / 100})`;

    updateDetails(); // Update the details based on the current zoom level
}

function updateDetails() {
    detailsLayer.innerHTML = ''; // Clear previous details

    if (zoomLevel >= 200) {
        const tire = document.createElement('div');
        tire.style.position = 'absolute';
        tire.style.left = '50%';
        tire.style.top = '30%';
        tire.style.width = '30px';
        tire.style.height = '30px';
        tire.style.backgroundColor = 'black';
        tire.style.borderRadius = '50%';
        detailsLayer.appendChild(tire);
    }

    if (zoomLevel >= 120 && zoomLevel < 200) {
        detailsLayer.style.background = 'url(vegetation.png) no-repeat center center';
        detailsLayer.style.backgroundSize = 'cover';
    } else {
        detailsLayer.style.background = '';
    }
}

// Zoom In and Out
document.getElementById('zoom-in').addEventListener('click', () => handleZoom(20));
document.getElementById('zoom-out').addEventListener('click', () => handleZoom(-20));

// Drawing on canvas
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    context.strokeStyle = '#FF0000';
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Mobile touch support
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    isDrawing = true;
    [lastX, lastY] = [touch.clientX, touch.clientY];
});

canvas.addEventListener('touchmove', (e) => {
    if (!isDrawing) return;
    const touch = e.touches[0];
    context.strokeStyle = '#FF0000';
    context.lineWidth = 2;
    context.lineJoin = 'round';
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(touch.clientX, touch.clientY);
    context.stroke();
    [lastX, lastY] = [touch.clientX, touch.clientY];
});

canvas.addEventListener('touchend', () => isDrawing = false);

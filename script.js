document.addEventListener('DOMContentLoaded', () => {
    const data = [
        { name: "Human", size: 1.57 },
        { name: "Cell", size: 8e-6 },
        { name: "Coin", size: 2e-3 }
    ];

    const logScale = document.getElementById('log-scale');
    const objectsContainer = document.getElementById('objects');

    // Function to convert size to log scale position
    const sizeToPosition = size => Math.log10(size) * 1000;

    // Function to create and append objects
    const createObjects = () => {
        data.forEach(item => {
            const objectDiv = document.createElement('div');
            objectDiv.className = 'object';
            objectDiv.style.top = `${sizeToPosition(item.size)}px`;
            objectDiv.innerHTML = `<span>${item.size} m</span><span>${item.name}</span>`;
            objectsContainer.appendChild(objectDiv);
        });
    };

    // Create objects initially
    createObjects();

    // Handle zooming
    let scale = 1;
    logScale.addEventListener('wheel', (event) => {
        event.preventDefault();
        scale += event.deltaY * -0.01;
        scale = Math.min(Math.max(0.125, scale), 4);
        logScale.style.transform = `scaleY(${scale})`;
    });
});

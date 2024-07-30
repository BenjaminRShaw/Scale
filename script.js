document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    let scale = 1;
    let initialPinchDistance = null;
    let lastScale = 1;

    const applyTransform = () => {
        grid.style.transform = `scale(${scale})`;
    };

    // Handle wheel event for desktop zoom
    grid.addEventListener('wheel', (event) => {
        event.preventDefault();
        scale += event.deltaY * -0.01;
        scale = Math.min(Math.max(0.125, scale), 4);
        applyTransform();
    });

    // Handle pinch zoom for touch devices
    grid.addEventListener('touchstart', (event) => {
        if (event.touches.length === 2) {
            initialPinchDistance = getDistance(event.touches[0], event.touches[1]);
            lastScale = scale;
        }
    });

    grid.addEventListener('touchmove', (event) => {
        if (event.touches.length === 2) {
            const currentPinchDistance = getDistance(event.touches[0], event.touches[1]);
            if (initialPinchDistance) {
                scale = lastScale * (currentPinchDistance / initialPinchDistance);
                scale = Math.min(Math.max(0.125, scale), 4);
                applyTransform();
            }
        }
    });

    const getDistance = (touch1, touch2) => {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dy + dy * dy);
    };
});

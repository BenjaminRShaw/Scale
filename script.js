document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const ticksContainer = document.getElementById('ticks');
    const numTicks = 5;
    let startY = 0;
    let deltaY = 0;

    const createTick = (index, y) => {
        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.style.top = `${y}px`;
        tick.dataset.index = index;

        const number = document.createElement('div');
        number.className = 'number';
        number.style.top = `${y - 7}px`;
        number.textContent = index;

        return { tick, number };
    };

    const appendTicks = (startIndex, startY) => {
        for (let i = 0; i < numTicks; i++) {
            const y = startY + i * 50;
            const { tick, number } = createTick(startIndex + i, y);
            ticksContainer.appendChild(tick);
            ticksContainer.appendChild(number);
        }
    };

    appendTicks(1, 50);

    container.addEventListener('touchstart', (event) => {
        startY = event.touches[0].clientY;
    });

    container.addEventListener('touchmove', (event) => {
        deltaY = event.touches[0].clientY - startY;
        startY = event.touches[0].clientY;

        Array.from(ticksContainer.children).forEach(child => {
            const top = parseInt(child.style.top, 10) + deltaY;
            child.style.top = `${top}px`;

            if (top > window.innerHeight) {
                const index = parseInt(child.dataset.index, 10) + numTicks;
                child.style.top = `${top - window.innerHeight - 50 * numTicks}px`;
                child.textContent = index;
                child.dataset.index = index;
            }
        });
    });
});

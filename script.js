document.addEventListener("DOMContentLoaded", function() {
    const rulerContainer = document.getElementById('ruler-container');
    const rulerHeight = rulerContainer.offsetHeight;
    const minZoom = 1;
    const maxZoom = 100;
    const fontSize = 14;

    let zoomLevel = 1;
    let items = [];

    function createRuler() {
        rulerContainer.innerHTML = '';
        const ordersOfMagnitude = [1, 10, 100, 1000, 10000, 100000, 1000000];

        for (let i = 0; i < ordersOfMagnitude.length; i++) {
            const value = ordersOfMagnitude[i];
            const markPosition = value * zoomLevel;

            if (markPosition > rulerHeight) break;

            const mark = document.createElement('div');
            mark.className = 'ruler-mark';
            mark.style.top = `${rulerHeight - markPosition}px`;
            mark.textContent = `${value} m`;

            rulerContainer.appendChild(mark);
        }

        placeItems();
    }

    function placeItems() {
        items.forEach(item => {
            const position = item.height * zoomLevel;

            if (position > rulerHeight) return;

            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.style.top = `${rulerHeight - position}px`;
            itemElement.style.fontSize = `${fontSize}px`;
            itemElement.textContent = item.name;

            rulerContainer.appendChild(itemElement);
        });
    }

    function handleZoom(event) {
        event.preventDefault();
        const scaleFactor = 1.1;
        zoomLevel *= event.deltaY > 0 ? 1 / scaleFactor : scaleFactor;
        zoomLevel = Math.max(minZoom, Math.min(maxZoom, zoomLevel));
        createRuler();
    }

    function loadCSVData() {
        const csvData = `Ant,0.002
Pencil,0.15
Cat,0.3
Chair,0.85
Human,1.7
Dog,0.6
Elephant,3.2
House,10
Tree,30
Building,50
Skyscraper,200
Eiffel Tower,324
Burj Khalifa,828
Mountain,3500
Mount Everest,8848
Airplane,10000
Weather Balloon,20000
Helium Balloon,1
Soccer Ball,0.22
Basketball,0.24
Giraffe,5.5
Truck,2.5
Bus,3
Football Field,110
Bridge,150
Rocket,100
Satellite,2000
Space Station,400
Jet,12
Boat,4
Submarine,5
Train,4.5
Car,1.5
Motorcycle,1.2
Bicycle,1
Crane,70
Statue of Liberty,93
Golden Gate Bridge,227
Empire State Building,381
Great Pyramid of Giza,146
Wind Turbine,120
Radio Tower,600
Dam,200
Lake,10000
Volcano,3000
Canyon,1600
River,3000
Ocean Depth,11000
Atmosphere,100000`;

        items = csvData.split('\n').map(line => {
            const [name, height] = line.split(',');
            return { name: name.trim(), height: parseFloat(height.trim()) };
        }).filter(item => !isNaN(item.height));

        createRuler();
    }

    rulerContainer.addEventListener('wheel', handleZoom);
    loadCSVData();
});

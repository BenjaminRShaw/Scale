document.addEventListener("DOMContentLoaded", function() {
    const rulerContainer = document.getElementById('ruler-container');
    const rulerHeight = rulerContainer.offsetHeight;
    const fontSize = 14;
    const minZoom = 0.001;
    const maxZoom = 1000;

    let zoomLevel = 1;
    let items = [];

    const waveTypes = [
        { name: "Gamma Rays", wavelength: 1e-12 },
        { name: "X-Rays", wavelength: 1e-10 },
        { name: "Ultraviolet", wavelength: 1e-8 },
        { name: "Visible Light", wavelength: 4e-7 },
        { name: "Infrared", wavelength: 1e-5 },
        { name: "Microwaves", wavelength: 1e-2 },
        { name: "Radio Waves", wavelength: 1 }
    ];

    function createRuler() {
        rulerContainer.innerHTML = '';

        const mainIncrements = [1, 10, 100, 1000, 10000, 100000, 1000000];
        const minorIncrements = [2, 5];

        let lastMarkPosition = rulerHeight;

        for (let i = 0; i < mainIncrements.length; i++) {
            const mainValue = mainIncrements[i];
            let mainMarkPosition = mainValue * zoomLevel;

            if (mainMarkPosition <= rulerHeight) {
                createMark(mainValue, mainMarkPosition, true);
                lastMarkPosition = mainMarkPosition;
            }

            // Add minor increments (e.g., 2m, 5m, 20m, 50m, etc.)
            if (i < mainIncrements.length - 1) {
                for (let j = 0; j < minorIncrements.length; j++) {
                    const minorValue = mainIncrements[i] * minorIncrements[j];
                    let minorMarkPosition = minorValue * zoomLevel;

                    if (minorMarkPosition > lastMarkPosition - 20) break;

                    if (minorMarkPosition <= rulerHeight) {
                        createMark(minorValue, minorMarkPosition, false);
                    }
                }
            }
        }

        placeItems();
    }

    function createMark(value, position, isMain) {
        const mark = document.createElement('div');
        mark.className = 'ruler-mark';
        mark.style.top = `${rulerHeight - position}px`;
        mark.textContent = `${value} m`;
        mark.style.fontSize = `${fontSize}px`;

        const lastMark = rulerContainer.lastChild;
        if (lastMark && lastMark.getBoundingClientRect().top - mark.getBoundingClientRect().top < 20) {
            if (!isMain || lastMark.textContent.length < mark.textContent.length) {
                rulerContainer.removeChild(lastMark);
            } else {
                return;
            }
        }

        rulerContainer.appendChild(mark);

        const wave = waveTypes.find(w => value * 1e-9 <= w.wavelength);
        if (wave && value * 1e-9 <= wave.wavelength * 10) {
            const waveLabel = document.createElement('div');
            waveLabel.className = 'item';
            waveLabel.style.top = `${rulerHeight - position}px`;
            waveLabel.textContent = wave.name;
            waveLabel.style.fontSize = `${fontSize}px`;

            if (!lastMark || waveLabel.getBoundingClientRect().top > lastMark.getBoundingClientRect().top + 20) {
                rulerContainer.appendChild(waveLabel);
            }
        }
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

            const lastItem = rulerContainer.lastChild;
            if (lastItem && lastItem.getBoundingClientRect().top - itemElement.getBoundingClientRect().top < 20) {
                return;
            }

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

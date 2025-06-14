const term = document.querySelector('.term');
const definition = document.querySelector('.definition');
const checkButton = document.querySelector('.check');
const nextButton = document.querySelector('.next');
const setSelector = document.getElementById('set');

let data = [];
let current = null;

function getRandomWord() {
    if (data.length === 0) {
        term.innerHTML = "<h3>No data loaded.</h3>";
        definition.innerHTML = "";
        return;
    }
    current = data[Math.floor(Math.random() * data.length)];
    term.innerHTML = `<h3>${current.term}</h3>`;
    definition.innerHTML = `<h3>${current.definition}</h3>`;
}

checkButton.addEventListener('click', function () {
    definition.style.display = 'block';
});

nextButton.addEventListener('click', function () {
    definition.style.display = 'none';
    getRandomWord();
});

setSelector.addEventListener('change', function () {
    loadSet(setSelector.value);
});

function loadSet(setName) {
    const script = document.createElement('script');
    script.src = `data/${setName}.js`;
    script.onload = () => {
        const variableName = `${setName.replace(/[-]/g, '')}Cards`; // e.g., hebrewalphaCards
        data = window[variableName] || [];
        getRandomWord();
    };
    script.onerror = () => {
        console.error(`Failed to load ${script.src}`);
    };
    document.body.appendChild(script);
}

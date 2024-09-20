let credits = 10000;
let isSpinning = false;

const creditDisplay = document.querySelector('.credits');
const betInput = document.querySelector('#bet-input'); // Invoerveld voor de inzet
const spinButton = document.querySelector('.button');
const reels = document.querySelectorAll('.reel');

// Functie om willekeurig een symbool te kiezen voor de reel
function getRandomSymbols() {
    const symbols = [
        'symbol1.png',
        'symbol2.png',
        'symbol3.png',
        'symbol4.png',
        'symbol5.png'
    ];
    const randomSymbols = [];
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        randomSymbols.push(symbols[randomIndex]);
    }
    return randomSymbols;
}

// Functie om de rollen te laten draaien
function spinReels() {
    // Haal de huidige inzet op uit het invoerveld en maak er een getal van
    let betAmount = parseFloat(betInput.value);

    // Controleer of het spinnen al bezig is of of het inzetbedrag ongeldig is
    if (isSpinning || isNaN(betAmount) || betAmount <= 0) {
        alert("Vul een geldig bet-bedrag in.");
        return;
    }

    // Controleer of er genoeg credits zijn
    if (credits < betAmount) {
        alert("Niet genoeg credits om te betten!");
        return;
    }

    // Zet het spel op 'spinning' en trek de bet af van de credits
    isSpinning = true;
    credits -= betAmount;
    updateDisplay();

    // Voeg de spin-animatie toe aan alle reels
    reels.forEach(reel => {
        reel.classList.add('spin-animation');
    });

    // Na de animatieperiode (2 seconden) stop de reels en toon de symbolen
    setTimeout(function() {
        reels.forEach(reel => {
            reel.classList.remove('spin-animation');
            const symbols = getRandomSymbols(); // Krijg 3 willekeurige symbolen voor elke reel
            const reelImages = reel.querySelectorAll('img');
            reelImages.forEach((img, index) => {
                img.src = symbols[index]; // Toewijzen van elk symbool aan een rij
            });
        });
        isSpinning = false;
        checkWin(betAmount); // Controleer winst na de spin en gebruik betAmount
    }, 2000);
}

// Functie om het credit- en bet-display bij te werken
function updateDisplay() {
    creditDisplay.textContent = `Credit: $${credits.toFixed(2)}`;
}

// Functie om te controleren of er een winst is
function checkWin(betAmount) {
    // Eenvoudige wincheck: controleer alleen de eerste rij symbolen op elke reel
    let firstRowSymbols = Array.from(reels).map(reel => reel.querySelectorAll('img')[0].src);
    let allMatch = firstRowSymbols.every(symbol => symbol === firstRowSymbols[0]);

    if (allMatch) {
        let winAmount = betAmount * 10; // Stel een winstbedrag vast
        credits += winAmount;
        alert(`Gefeliciteerd! Je hebt gewonnen: $${winAmount.toFixed(2)}`);
        updateDisplay();
    }
}

// Spin-knop event listener
spinButton.addEventListener('click', spinReels);

// Zorg dat de display wordt geüpdatet bij het laden van de pagina
window.onload = updateDisplay;

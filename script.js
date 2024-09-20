// Initialisatie van spelvariabelen
let credits = 10000;
let betAmount = 250;
let isSpinning = false; // Voorkomt meerdere spins tegelijk

// HTML-elementen ophalen voor interactie
const creditDisplay = document.querySelector('.credits');
const betDisplay = document.querySelector('.bet');
const spinButton = document.querySelector('.button');
const reels = document.querySelectorAll('.reel img');

// Functie om de rollen te laten draaien
function spinReels() {
    if (isSpinning) return;  // Voorkom dat de speler meerdere keren snel achter elkaar kan spinnen
    if (credits < betAmount) {
        alert("Niet genoeg credits!");
        return;
    }

    // Start spin
    isSpinning = true;
    credits -= betAmount;
    updateDisplay();

    // Voeg de spin-animatie toe aan elke reel
    reels.forEach(reel => {
        reel.classList.add('spin-animation');
    });

    // Stop de animatie na 2 seconden en bepaal het resultaat
    setTimeout(function() {
        reels.forEach(reel => {
            reel.classList.remove('spin-animation');
            reel.src = getRandomSymbol(); // Verander symbool op elke reel
        });
        isSpinning = false;
        checkWin(); // Controleer of de speler gewonnen heeft
    }, 2000);
}

// Functie om willekeurig een symbool te kiezen voor de reel
function getRandomSymbol() {
    const symbols = [
        'symbol1.png',
        'symbol2.png',
        'symbol3.png',
        'symbol4.png',
        'symbol5.png'
    ];
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

// Functie om het credit- en bet-display bij te werken
function updateDisplay() {
    creditDisplay.textContent = `Credit: $${credits.toFixed(2)}`;
    betDisplay.textContent = `Bet: $${betAmount.toFixed(2)}`;
}

// Functie om te controleren of er een winst is
function checkWin() {
    // Eenvoudige wincheck: als alle reels hetzelfde symbool hebben
    let firstSymbol = reels[0].src;
    let allMatch = Array.from(reels).every(reel => reel.src === firstSymbol);

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

const symbols = ['🎣', '🐟', '🦈', '🐠', '🐡', '🐙', '🦑', '🏆']; // Bonus symbool
let score = 100; // Startpunt
let bonusSpins = 0; // Aantal extra spins

// Geluidseffecten
const spinSound = new Audio('sounds/spin.mp3');
const winSound = new Audio('sounds/win.mp3');
const bonusSound = new Audio('sounds/bonus.mp3');

// Functie om willekeurige symbolen te genereren voor een rol
function getRandomSymbols() {
    const reelSymbols = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        reelSymbols.push(symbols[randomIndex]);
    }
    return reelSymbols;
}

// Functie om de rollen te draaien
function spinReels() {
    if (bonusSpins > 0) {
        bonusSpins--; // Verminder bonus spins bij elke draai
    } else {
        const bet = parseInt(document.getElementById('betInput').value);

        // Controleer of de inzet geldig is
        if (isNaN(bet) || bet <= 0 || bet > score) {
            alert("Voer een geldige inzet in!");
            return;
        }

        // Verminder de score met de inzet
        score -= bet;
        document.getElementById('score').textContent = score;
    }

    spinSound.play(); // Speel spin geluid af

    const reels = [];
    for (let i = 0; i < 5; i++) {
        reels.push(getRandomSymbols());
        document.getElementById(`reel${i + 1}`).innerHTML = reels[i].map(symbol => `<div>${symbol}</div>`).join('');
    }

    // Controleer op winst
    const winnings = checkForWinnings(reels);
    score += winnings; // Voeg de gewonnen punten toe aan de score
    displayResult(winnings);

    // Controleer op bonusgame
    checkForBonusGame(reels);
}

// Functie om de winst te controleren
function checkForWinnings(reels) {
    const winCounts = {};
    reels.forEach(reel => {
        const symbol = reel[0]; // Neem het eerste symbool van elke rol
        winCounts[symbol] = (winCounts[symbol] || 0) + 1;
    });

    // Bepaal het win niveau
    let winnings = 0;
    for (const count of Object.values(winCounts)) {
        if (count === 3) {
            winnings += 10; // kleine winst
        } else if (count === 4) {
            winnings += 50; // grotere winst
        } else if (count === 5) {
            winnings += 100; // jackpot
        }
    }
    return winnings;
}

// Functie om bonusgame te controleren
function checkForBonusGame(reels) {
    const specialSymbol = '🏆'; // Bonus symbool
    let bonusCount = 0;

    reels.forEach(reel => {
        if (reel.includes(specialSymbol)) {
            bonusCount++;
        }
    });

    // Wijs spins toe op basis van het aantal bonus symbolen
    if (bonusCount >= 3) {
        if (bonusCount <= 6) {
            bonusSpins += bonusCount; // Extra spins toewijzen
        }
        startBonusGame(bonusCount);
    }
}

// Functie voor de bonusgame
function startBonusGame(bonusCount) {
    bonusSound.play(); // Speel bonus geluid af
    const message = `Je hebt ${bonusCount} bonus symbolen gedraaid! Je krijgt ${bonusCount} extra spins!`;
    document.getElementById('bonusSpinsMessage').textContent = message;
    document.getElementById('score').textContent = score; // Bijgewerkte score
}

// Functie om het resultaat weer te geven
function displayResult(winnings) {
    const resultMessage = winnings > 0 ? `Je hebt gewonnen: ${winnings} punten!` : "Helaas, probeer het opnieuw!";
    document.getElementById('resultMessage').textContent = resultMessage;

    // Speel winst geluid af
    if (winnings > 0) {
        winSound.play();
    }

    document.getElementById('score').textContent = score; // Toon de bijgewerkte score
    document.getElementById('bonusSpinsMessage').textContent = `Resterende bonus spins: ${bonusSpins}`; // Toon resterende spins
}

// Eventlistener voor de Spin knop
document.getElementById('spinButton').addEventListener('click', spinReels);
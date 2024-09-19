const symbols = ['🎣', '🐟', '🦈', '🐠', '🐡', '🐙', '🦑'];

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
    const reels = [];
    for (let i = 0; i < 5; i++) {
        reels.push(getRandomSymbols());
        document.getElementById(`reel${i + 1}`).innerHTML = reels[i].map(symbol => `<div>${symbol}</div>`).join('');
    }

    // Controleer op winst
    const winnings = checkForWinnings(reels);
    displayResult(winnings);
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

// Functie om het resultaat weer te geven
function displayResult(winnings) {
    const resultMessage = winnings > 0 ? `Je hebt gewonnen: ${winnings} punten!` : "Helaas, probeer het opnieuw!";
    document.getElementById('resultMessage').textContent = resultMessage;
}

// Eventlistener voor de Spin knop
document.getElementById('spinButton').addEventListener('click', spinReels);
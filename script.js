const symbols = ['🎣', '🐟', '🦈', '🐠', '🐡', '🐙', '🦑', '🏆'];
let score = 100; // Startpunt
let bonusSpins = 0; // Aantal extra spins

// Geluidseffecten
const spinSound = new Audio('spin.mp3.wav');
const winSound = new Audio('win.mp3.wav');
const bonusSound = new Audio('bonus.mp3.wav');

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
    let winnings = 0;
    let winningLines = []; // Array om winlijnen op te slaan

    // Horizontale winstrijen
    for (let row = 0; row < 4; row++) {
        let count = 1; // Start met 1 voor het eerste symbool
        for (let col = 1; col < 5; col++) {
            if (reels[col][row] === reels[col - 1][row]) {
                count++;
            } else {
                count = 1; // Reset de teller
            }
            if (count >= 3) {
                winnings += 20; // Winst voor 3 of meer gelijke symbolen
                winningLines.push(`row${row}`); // Voeg winlijn toe
                break; // Stop met tellen bij eerste winst
            }
        }
    }

    // Verticale winstrijen
    for (let col = 0; col < 5; col++) {
        let count = 1; // Start met 1 voor het eerste symbool
        for (let row = 1; row < 4; row++) {
            if (reels[col][row] === reels[col][row - 1]) {
                count++;
            } else {
                count = 1; // Reset de teller
            }
            if (count >= 3) {
                winnings += 20; // Winst voor 3 of meer gelijke symbolen
                winningLines.push(`col${col}`); // Voeg winlijn toe
                break; // Stop met tellen bij eerste winst
            }
        }
    }

    // Diagonale winstrijen
    // Van linksboven naar rechtsonder
    for (let start = 0; start < 2; start++) {
        let count = 1;
        for (let i = start; i < 4 - start - 1; i++) {
            if (reels[i][i + start] === reels[i + 1][i + 1 + start]) {
                count++;
            } else {
                count = 1; // Reset de teller
            }
            if (count >= 3) {
                winnings += 20; // Winst voor 3 of meer gelijke symbolen
                winningLines.push(`diag1`); // Voeg winlijn toe
                break; // Stop met tellen bij eerste winst
            }
        }
    }

    // Van rechtsboven naar linksbeneden
    for (let start = 0; start < 2; start++) {
        let count = 1;
        for (let i = start; i < 4 - start - 1; i++) {
            if (reels[i][3 - i - start] === reels[i + 1][2 - i - start]) {
                count++;
            } else {
                count = 1; // Reset de teller
            }
            if (count >= 3) {
                winnings += 20; // Winst voor 3 of meer gelijke symbolen
                winningLines.push(`diag2`); // Voeg winlijn toe
                break; // Stop met tellen bij eerste winst
            }
        }
    }

    // Licht de winlijnen uit
    if (winningLines.length > 0) {
        highlightWinLine(winningLines);
    }

    return winnings;
}

// Functie om de winlijn uit te lichten
function highlightWinLine(lines) {
    lines.forEach(line => {
        const element = document.getElementById(line);
        element.classList.add('highlight'); // Voeg de highlight klasse toe
        setTimeout(() => {
            element.classList.remove('highlight'); // Verwijder de highlight klasse na 5 seconden
        }, 5000);
    });
}

// Functie om bonusgame te controleren
function checkForBonusGame(reels) {
    const specialSymbol = '🏆'; // Bonus symbool
    let bonusCount = 0;

    // Controleer op bonus symbolen in dezelfde rij
    for (let row = 0; row < 4; row++) {
        const rowSymbols = [];
        for (let col = 0; col < 5; col++) {
            rowSymbols.push(reels[col][row]);
        }
        
        if (rowSymbols.every(symbol => symbol === specialSymbol)) {
            bonusCount = rowSymbols.length; // Volledige rij met bonus symbolen
            break; // Stop bij de eerste rij met bonus symbolen
        }
    }

    // Wijs spins toe op basis van het aantal bonus symbolen
    if (bonusCount >= 3) {
        bonusSpins += bonusCount; // Extra spins toewijzen
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
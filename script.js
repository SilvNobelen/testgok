// Symbolen voor de slot-machine
const symbols = ['🎣', '🐟', '🦈', '🐠', '🐡', '🐙', '🦑'];

// Functie om willekeurige symbolen te genereren voor een rol
function getRandomSymbols() {
    const reelSymbols = [];
    for (let i = 0; i < 4; i++) { // 4 rijen per rol
        const randomIndex = Math.floor(Math.random() * symbols.length);
        reelSymbols.push(symbols[randomIndex]);
    }
    return reelSymbols;
}

// Functie om de rollen te draaien
function spinReels() {
    // Elke rol krijgt willekeurige symbolen
    const reel1Symbols = getRandomSymbols();
    const reel2Symbols = getRandomSymbols();
    const reel3Symbols = getRandomSymbols();
    const reel4Symbols = getRandomSymbols();
    const reel5Symbols = getRandomSymbols();

    // Vul de rollen met de symbolen
    document.getElementById('reel1').innerHTML = reel1Symbols.map(symbol => `<div>${symbol}</div>`).join('');
    document.getElementById('reel2').innerHTML = reel2Symbols.map(symbol => `<div>${symbol}</div>`).join('');
    document.getElementById('reel3').innerHTML = reel3Symbols.map(symbol => `<div>${symbol}</div>`).join('');
    document.getElementById('reel4').innerHTML = reel4Symbols.map(symbol => `<div>${symbol}</div>`).join('');
    document.getElementById('
// Game state
let score = 0;
let pointsPerClick = 1;
let autoClickers = 0;
let clickUpgradeCost = 50;
let autoClickerCost = 100;

// DOM elements
let scoreElement;
let ppcElement;
let autoElement;
let clickUpgradeBtn;
let autoUpgradeBtn;
let clickCostElement;
let autoCostElement;
let clickSound;
let khbizaImage;

// Initialize the game
function init() {
    // Get DOM elements
    scoreElement = document.getElementById('score');
    ppcElement = document.getElementById('ppc');
    autoElement = document.getElementById('auto');
    clickUpgradeBtn = document.getElementById('clickUpgrade');
    autoUpgradeBtn = document.getElementById('autoUpgrade');
    clickCostElement = document.getElementById('clickCost');
    autoCostElement = document.getElementById('autoCost');
    clickSound = document.getElementById('clickSound');
    khbizaImage = document.getElementById('khbiza');

    // Initialize sound
    clickSound.isPlaying = false;
    clickSound.addEventListener('ended', () => {
        clickSound.isPlaying = false;
    });

    updateStats();
    requestAnimationFrame(autoClick);
    
    // Add event listeners
    clickUpgradeBtn.addEventListener('click', buyUpgrade);
    autoUpgradeBtn.addEventListener('click', buyAutoClicker);
    khbizaImage.addEventListener('click', clickKhbiza);
    
    // Add animation on click
    khbizaImage.addEventListener('mousedown', () => {
        khbizaImage.style.transform = 'scale(0.95)';
    });
    
    khbizaImage.addEventListener('mouseup', () => {
        khbizaImage.style.transform = 'scale(1)';
    });
    
    khbizaImage.addEventListener('mouseleave', () => {
        khbizaImage.style.transform = 'scale(1)';
    });
}

// Handle clicking the khbiza
function clickKhbiza() {
    score += pointsPerClick;
    updateStats();
    
    // Sound effect
    if(!clickSound.isPlaying) {
        clickSound.currentTime = 0;
        clickSound.isPlaying = true;
        clickSound.play().catch(e => console.log("Audio error:", e));
    }
    
    // Visual feedback
    const feedback = document.createElement('div');
    feedback.textContent = `+${pointsPerClick}`;
    feedback.className = 'click-feedback';
    
    // Position near the image
    const rect = khbizaImage.getBoundingClientRect();
    feedback.style.left = `${rect.left + rect.width/2 - 15}px`;
    feedback.style.top = `${rect.top + rect.height/2 - 30}px`;
    
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 1000);
}

// Buy click upgrade
function buyUpgrade() {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        pointsPerClick += 1;
        clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
        updateStats();
    }
}

// Buy auto clicker
function buyAutoClicker() {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.5);
        updateStats();
    }
}

// Auto clicker functionality
let lastUpdate = 0;
function autoClick(timestamp) {
    if (!lastUpdate) lastUpdate = timestamp;
    const delta = timestamp - lastUpdate;
    
    if (delta >= 1000 && autoClickers > 0) {
        score += autoClickers;
        updateStats();
        lastUpdate = timestamp;
    }
    
    requestAnimationFrame(autoClick);
}

// Update all game stats
function updateStats() {
    scoreElement.textContent = score;
    ppcElement.textContent = pointsPerClick;
    autoElement.textContent = autoClickers;
    
    // Update button states
    clickUpgradeBtn.disabled = score < clickUpgradeCost;
    autoUpgradeBtn.disabled = score < autoClickerCost;
    
    // Update cost displays
    clickCostElement.textContent = clickUpgradeCost;
    autoCostElement.textContent = autoClickerCost;
}

// Add animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(-50px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

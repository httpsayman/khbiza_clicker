try {
            document.addEventListener('DOMContentLoaded', function() {
          updateStats();
            requestAnimationFrame(autoClick);
            khbizaImage.addEventListener('click', clickKhbiza);
            clickUpgradeBtn.addEventListener('click', buyUpgrade);
            autoUpgradeBtn.addEventListener('click', buyAutoClicker);
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
          init(); // Your existing init function
        });
        // Game state
        let score = 0;
        let pointsPerClick = 1;
        let autoClickers = 0;
        let clickUpgradeCost = 50;
        let autoClickerCost = 100;
        
        // DOM elements
        const scoreElement = document.getElementById('score');
        const ppcElement = document.getElementById('ppc');
        const autoElement = document.getElementById('auto');
        const clickUpgradeBtn = document.getElementById('clickUpgrade');
        const autoUpgradeBtn = document.getElementById('autoUpgrade');
        const clickCostElement = document.getElementById('clickCost');
        const autoCostElement = document.getElementById('autoCost');
        const clickSound = document.getElementById('clickSound');
        const khbizaImage = document.getElementById('khbiza');
        
        // Initialize the game
        function init() {
            scoreElement = document.getElementById('score');
            ppcElement = document.getElementById('ppc');
            autoElement = document.getElementById('auto');
            clickUpgradeBtn = document.getElementById('clickUpgrade');
            autoUpgradeBtn = document.getElementById('autoUpgrade');
            clickCostElement = document.getElementById('clickCost');
            autoCostElement = document.getElementById('autoCost');
            clickSound = document.getElementById('clickSound');
            khbizaImage = document.getElementById('khbiza');
                    
            updateStats();
            requestAnimationFrame(autoClick);
                    
            document.getElementById('clickUpgrade').addEventListener('click', buyUpgrade);
            document.getElementById('autoUpgrade').addEventListener('click', buyAutoClicker);
            document.getElementById('khbiza').addEventListener('click', clickKhbiza);
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
        // Replace your clickKhbiza function with this optimized version:
        function clickKhbiza() {
            score += pointsPerClick;
            scoreElement.textContent = score; // Update only score first
            
            // Debounce the sound to prevent lag
            if(!clickSound.isPlaying) {
                clickSound.currentTime = 0;
                clickSound.play();
                clickSound.isPlaying = true;
                setTimeout(() => { clickSound.isPlaying = false; }, 100);
            }
            
            // Simplified feedback animation
            const feedback = document.createElement('div');
            feedback.textContent = `+${pointsPerClick}`;
            feedback.className = 'click-feedback';
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
                scoreElement.textContent = score;
                lastUpdate = timestamp;
            }
            
            requestAnimationFrame(autoClick); // More efficient than setInterval
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
        
        // Start the game
        
        init();
} catch (error) {
    console.error("Game error:", error);
}


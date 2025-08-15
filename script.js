// Game state
        let gameState = {
            score: 0,
            pointsPerClick: 1,
            autoClickers: 0,
            clickUpgradeCost: 50,
            autoClickerCost: 100
        };

        // DOM elements
        const elements = {
            score: document.getElementById('score'),
            ppc: document.getElementById('ppc'),
            auto: document.getElementById('auto'),
            clickUpgradeBtn: document.getElementById('clickUpgrade'),
            autoUpgradeBtn: document.getElementById('autoUpgrade'),
            clickCostElement: document.getElementById('clickCost'),
            autoCostElement: document.getElementById('autoCost'),
            khbizaImage: document.getElementById('khbiza')
        };

        // Initialize the game
        function init() {
            updateDisplay();
            startAutoClicker();
            
            // Event listeners
            elements.clickUpgradeBtn.addEventListener('click', buyClickUpgrade);
            elements.autoUpgradeBtn.addEventListener('click', buyAutoClicker);
            elements.khbizaImage.addEventListener('click', clickKhbiza);
        }

        // Handle clicking the khbiza
        function clickKhbiza(event) {
            gameState.score += gameState.pointsPerClick;
            updateDisplay();
            
            // Visual feedback
            showClickFeedback(event);
            createParticles(event);
        }

        // Show floating points feedback
        function showClickFeedback(event) {
            const feedback = document.createElement('div');
            feedback.textContent = `+${gameState.pointsPerClick}`;
            feedback.className = 'click-feedback';
            
            // Position at click location
            const rect = elements.khbizaImage.getBoundingClientRect();
            feedback.style.left = `${event.clientX - 20}px`;
            feedback.style.top = `${event.clientY - 30}px`;
            
            document.body.appendChild(feedback);
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 1500);
        }

        // Create particle effects
        function createParticles(event) {
            for (let i = 0; i < 6; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'particles';
                    
                    const randomX = (Math.random() - 0.5) * 200;
                    const randomY = -Math.random() * 150 - 50;
                    
                    particle.style.setProperty('--random-x', randomX + 'px');
                    particle.style.setProperty('--random-y', randomY + 'px');
                    particle.style.left = event.clientX + 'px';
                    particle.style.top = event.clientY + 'px';
                    
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 1000);
                }, i * 50);
            }
        }

        // Buy click upgrade
        function buyClickUpgrade() {
            if (gameState.score >= gameState.clickUpgradeCost) {
                gameState.score -= gameState.clickUpgradeCost;
                gameState.pointsPerClick += 1;
                gameState.clickUpgradeCost = Math.floor(gameState.clickUpgradeCost * 1.5);
                updateDisplay();
            }
        }

        // Buy auto clicker
        function buyAutoClicker() {
            if (gameState.score >= gameState.autoClickerCost) {
                gameState.score -= gameState.autoClickerCost;
                gameState.autoClickers += 1;
                gameState.autoClickerCost = Math.floor(gameState.autoClickerCost * 1.5);
                updateDisplay();
            }
        }

        // Auto clicker functionality
        function startAutoClicker() {
            setInterval(() => {
                if (gameState.autoClickers > 0) {
                    gameState.score += gameState.autoClickers;
                    updateDisplay();
                }
            }, 1000);
        }

        // Update display
        function updateDisplay() {
            elements.score.textContent = formatNumber(gameState.score);
            elements.ppc.textContent = formatNumber(gameState.pointsPerClick);
            elements.auto.textContent = formatNumber(gameState.autoClickers);
            
            elements.clickUpgradeBtn.disabled = gameState.score < gameState.clickUpgradeCost;
            elements.autoUpgradeBtn.disabled = gameState.score < gameState.autoClickerCost;
            
            elements.clickCostElement.textContent = formatNumber(gameState.clickUpgradeCost);
            elements.autoCostElement.textContent = formatNumber(gameState.autoClickerCost);
        }

        // Format large numbers
        function formatNumber(num) {
            if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
            if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
            if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
            return num.toString();
        }

        // Initialize game when DOM is loaded
        document.addEventListener('DOMContentLoaded', init);

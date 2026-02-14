/* =========================================
   MINI LOVE GAME
   ========================================= */

class LoveGame {
    constructor() {
        this.score = 0;
        this.targetScore = 50;
        this.isPlaying = false;
        this.heartInterval = null;
        this.initialized = false;
    }
    
    init() {
        if (!this.initialized) {
            this.setupGame();
            this.initialized = true;
        }
    }
    
    setupGame() {
        const startBtn = document.getElementById('start-game-btn');
        const gameArea = document.getElementById('game-area');
        
        startBtn.addEventListener('click', () => {
            this.startGame();
        });
        
        gameArea.addEventListener('click', (e) => {
            if (this.isPlaying && e.target.classList.contains('falling-heart')) {
                this.catchHeart(e.target, e);
            }
        });
    }
    
    startGame() {
        this.score = 0;
        this.isPlaying = true;
        this.updateScore();
        
        const startBtn = document.getElementById('start-game-btn');
        startBtn.style.display = 'none';
        
        // Clear any existing hearts
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = '';
        
        // Start spawning hearts
        this.spawnHearts();
    }
    
    spawnHearts() {
        const gameArea = document.getElementById('game-area');
        
        this.heartInterval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(this.heartInterval);
                return;
            }
            
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.textContent = '💖';
            
            const startX = Math.random() * (gameArea.offsetWidth - 40);
            heart.style.left = startX + 'px';
            heart.style.top = '-40px';
            
            const duration = 3000 + Math.random() * 2000;
            heart.style.animationDuration = duration + 'ms';
            
            gameArea.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, duration);
            
        }, 800);
    }
    
    catchHeart(heart, event) {
        // Remove heart
        heart.remove();
        
        // Increase score
        this.score++;
        this.updateScore();
        
        // Create particle explosion
        this.createExplosion(event.clientX, event.clientY);
        
        // Check win condition
        if (this.score >= this.targetScore) {
            this.winGame();
        }
    }
    
    updateScore() {
        const scoreElement = document.getElementById('game-score');
        scoreElement.textContent = this.score;
        
        // Add pulse animation
        scoreElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            scoreElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    createExplosion(x, y) {
        const colors = ['#8B5CF6', '#EC4899', '#38BDF8', '#F9A8D4'];
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'heart-particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 12;
            const velocity = 30 + Math.random() * 40;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 600);
        }
    }
    
    winGame() {
        this.isPlaying = false;
        clearInterval(this.heartInterval);
        
        // Clear remaining hearts
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = '';
        
        // Show completion modal
        const modal = document.getElementById('game-complete-modal');
        modal.classList.remove('hidden');
        
        // Trigger fireworks
        this.createFireworksDisplay();
        
        // Setup continue button
        const continueBtn = document.getElementById('continue-to-finale');
        continueBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            this.goToFinale();
        }, { once: true });
    }
    
    createFireworksDisplay() {
        const container = document.getElementById('fireworks');
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createFirework(container);
            }, i * 100);
        }
        
        // Continue creating fireworks for celebration
        const fireworkInterval = setInterval(() => {
            this.createFirework(container);
        }, 500);
        
        // Stop after 5 seconds
        setTimeout(() => {
            clearInterval(fireworkInterval);
        }, 5000);
    }
    
    createFirework(container) {
        const rect = container.getBoundingClientRect();
        const x = rect.width * 0.2 + Math.random() * rect.width * 0.6;
        const y = rect.height * 0.2 + Math.random() * rect.height * 0.4;
        
        const colors = ['#8B5CF6', '#EC4899', '#38BDF8', '#A78BFA', '#F9A8D4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            const angle = (Math.PI * 2 * i) / 25;
            const velocity = 80 + Math.random() * 80;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
    
    goToFinale() {
        // Hide game chapter
        const gameChapter = document.getElementById('game-chapter');
        gameChapter.classList.remove('active');
        gameChapter.classList.add('hidden');
        
        // Hide navigation
        const nav = document.getElementById('chapter-nav');
        nav.classList.add('hidden');
        
        // Show finale scene
        const finaleScene = document.getElementById('finale-scene');
        finaleScene.classList.remove('hidden');
        finaleScene.classList.add('active');
        
        // Create heart formation in 3D
        setTimeout(() => {
            if (window.galaxyScene) {
                window.galaxyScene.createHeartFormation();
            }
        }, 1000);
    }
    
    reset() {
        this.score = 0;
        this.isPlaying = false;
        this.updateScore();
        
        const startBtn = document.getElementById('start-game-btn');
        startBtn.style.display = 'block';
        
        const gameArea = document.getElementById('game-area');
        gameArea.innerHTML = '';
        
        if (this.heartInterval) {
            clearInterval(this.heartInterval);
        }
    }
}

// Create global instance
window.loveGame = new LoveGame();

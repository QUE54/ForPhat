/* =========================================
   MAIN APPLICATION CONTROLLER
   ========================================= */

class ValentineApp {
    constructor() {
        this.currentScene = null;
        this.currentChapter = null;
        this.isUnlocked = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startOpeningSequence();
    }
    
    setupEventListeners() {
        // Lock screen
        const unlockBtn = document.getElementById('unlock-btn');
        const passwordInput = document.getElementById('password-input');
        
        unlockBtn.addEventListener('click', () => this.checkPassword());
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkPassword();
        });
        
        // Begin journey button
        document.getElementById('begin-journey-btn').addEventListener('click', () => {
            this.showChapter('timeline');
        });
        
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chapter = e.currentTarget.dataset.chapter;
                this.showChapter(chapter);
            });
        });
        
        // Next chapter buttons
        document.querySelectorAll('.next-chapter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const next = e.currentTarget.dataset.next;
                this.showChapter(next);
            });
        });
        
        // Final button
        document.getElementById('final-btn').addEventListener('click', () => {
            this.triggerFinalFireworks();
        });
    }
    
    startOpeningSequence() {
        setTimeout(() => {
            document.getElementById('loading-screen').classList.add('hidden');
        }, 2000);
        
        // Show opening cinematic
        setTimeout(() => {
            this.showScene('opening-scene');
        }, 2500);
        
        // Transition to lock screen
        setTimeout(() => {
            this.showScene('lock-screen');
        }, 10000);
    }
    
    showScene(sceneId) {
        // Hide current scene
        if (this.currentScene) {
            this.currentScene.classList.remove('active');
        }
        
        // Show new scene
        const scene = document.getElementById(sceneId);
        if (scene) {
            scene.classList.add('active');
            this.currentScene = scene;
        }
    }
    
    checkPassword() {
        const input = document.getElementById('password-input');
        const errorText = document.getElementById('lock-error');
        const lockCard = document.querySelector('.lock-card');
        
        const correctPassword = '06/06/2024';
        const enteredPassword = input.value.trim();
        
        if (enteredPassword === correctPassword) {
            // Correct password
            this.isUnlocked = true;
            
            // Zoom effect
            if (window.galaxyScene) {
                window.galaxyScene.zoomCamera(2, 1500);
            }
            
            setTimeout(() => {
                this.showScene('title-scene');
            }, 1500);
            
        } else {
            // Wrong password
            lockCard.classList.add('shake', 'error');
            errorText.textContent = 'Wrong date. Try again.';
            errorText.classList.add('show');
            
            setTimeout(() => {
                lockCard.classList.remove('shake', 'error');
                errorText.classList.remove('show');
            }, 1000);
            
            input.value = '';
        }
    }
    
    showChapter(chapterId) {
        // Hide title scene if shown
        const titleScene = document.getElementById('title-scene');
        if (titleScene.classList.contains('active')) {
            titleScene.classList.remove('active');
        }
        
        // Hide all chapters
        document.querySelectorAll('.chapter').forEach(chapter => {
            chapter.classList.remove('active');
            chapter.classList.add('hidden');
        });
        
        // Show selected chapter
        const chapter = document.getElementById(chapterId + '-chapter');
        if (chapter) {
            setTimeout(() => {
                chapter.classList.remove('hidden');
                chapter.classList.add('active');
                this.currentChapter = chapter;
            }, 100);
        }
        
        // Show navigation
        const nav = document.getElementById('chapter-nav');
        nav.classList.remove('hidden');
        
        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.chapter === chapterId) {
                btn.classList.add('active');
            }
        });
        
        // Initialize chapter-specific functionality
        this.initializeChapter(chapterId);
    }
    
    initializeChapter(chapterId) {
        switch(chapterId) {
            case 'timeline':
                if (window.timelineManager) {
                    window.timelineManager.init();
                }
                break;
            case 'galaxy':
                if (window.memoryGallery) {
                    window.memoryGallery.init();
                }
                break;
            case 'letter':
                if (window.letterScene) {
                    window.letterScene.init();
                }
                break;
            case 'game':
                if (window.loveGame) {
                    window.loveGame.init();
                }
                break;
        }
    }
    
    triggerFinalFireworks() {
        const container = document.getElementById('final-fireworks');
        container.classList.remove('hidden');
        
        // Create massive fireworks display
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                this.createFirework(container);
            }, i * 50);
        }
        
        // Create petal storm
        this.createPetalStorm();
        
        // Show final message
        setTimeout(() => {
            alert('Happy Valentine\'s Day, Phat! 💜\n\nYou can always return to this universe.\nIt was made only for you. ✨');
        }, 3000);
    }
    
    createFirework(container) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        const colors = ['#8B5CF6', '#EC4899', '#38BDF8', '#F9A8D4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.background = color;
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 100 + Math.random() * 100;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
    
    createPetalStorm() {
        const container = document.getElementById('petals-container');
        
        for (let i = 0; i < 200; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'petal';
                
                const startX = Math.random() * window.innerWidth;
                const size = 8 + Math.random() * 12;
                
                petal.style.left = startX + 'px';
                petal.style.width = size + 'px';
                petal.style.height = size + 'px';
                petal.style.animationDuration = '3s';
                petal.style.opacity = '0.8';
                
                container.appendChild(petal);
                
                setTimeout(() => petal.remove(), 3000);
            }, i * 20);
        }
    }
}

// Initialize app when DOM is ready
let valentineApp;

window.addEventListener('DOMContentLoaded', () => {
    valentineApp = new ValentineApp();
});

// Prevent right-click and text selection for premium feel
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => {
    if (!e.target.matches('input, textarea')) {
        e.preventDefault();
    }
});

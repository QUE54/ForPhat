/* =========================================
   LETTER CHAPTER
   ========================================= */

class LetterScene {
    constructor() {
        this.initialized = false;
        this.observer = null;
    }
    
    init() {
        if (!this.initialized) {
            this.setupScrollAnimations();
            this.addReadingProgress();
            this.initialized = true;
        }
    }
    
    setupScrollAnimations() {
        const letterChapter = document.getElementById('letter-chapter');
        
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            root: letterChapter,
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all paragraphs
        const paragraphs = document.querySelectorAll('.letter-body p');
        paragraphs.forEach(p => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(p);
        });
    }
    
    addReadingProgress() {
        const letterContainer = document.querySelector('.letter-container');
        const letterChapter = document.getElementById('letter-chapter');
        
        // Create progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'linear-gradient(90deg, #8B5CF6, #EC4899)';
        progressBar.style.zIndex = '1001';
        progressBar.style.transition = 'width 0.1s ease';
        progressBar.id = 'letter-progress';
        
        document.body.appendChild(progressBar);
        
        // Update progress on scroll
        letterChapter.addEventListener('scroll', () => {
            const scrollHeight = letterChapter.scrollHeight - letterChapter.clientHeight;
            const scrolled = (letterChapter.scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Add ambient music control (optional)
    addMusicControl() {
        const musicBtn = document.createElement('button');
        musicBtn.className = 'music-toggle';
        musicBtn.innerHTML = '🎵';
        musicBtn.style.position = 'fixed';
        musicBtn.style.bottom = '100px';
        musicBtn.style.right = '20px';
        musicBtn.style.width = '50px';
        musicBtn.style.height = '50px';
        musicBtn.style.borderRadius = '50%';
        musicBtn.style.background = 'rgba(139, 92, 246, 0.3)';
        musicBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        musicBtn.style.color = 'white';
        musicBtn.style.fontSize = '1.5rem';
        musicBtn.style.cursor = 'pointer';
        musicBtn.style.zIndex = '1000';
        musicBtn.style.backdropFilter = 'blur(10px)';
        musicBtn.style.transition = 'all 0.3s ease';
        
        musicBtn.addEventListener('click', () => {
            // Toggle music (placeholder functionality)
            musicBtn.style.transform = musicBtn.style.transform === 'scale(1.2)' ? 'scale(1)' : 'scale(1.2)';
        });
        
        document.body.appendChild(musicBtn);
    }
    
    // Method to customize letter content
    updateLetter(content) {
        const letterBody = document.getElementById('letter-text');
        if (letterBody && content) {
            letterBody.innerHTML = content;
            this.setupScrollAnimations();
        }
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        const progressBar = document.getElementById('letter-progress');
        if (progressBar) {
            progressBar.remove();
        }
    }
}

// Create global instance
window.letterScene = new LetterScene();

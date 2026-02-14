/* =========================================
   MEMORY GALAXY CHAPTER
   ========================================= */

class MemoryGallery {
    constructor() {
        this.memories = [];
        this.initialized = false;
        this.modal = null;
    }
    
    init() {
        if (!this.initialized) {
            this.setupMemories();
            this.createStarField();
            this.setupModal();
            this.initialized = true;
        }
    }
    
    setupMemories() {
        // Placeholder memories - users can add their own photos
        this.memories = [
            {
                image: './images/1.jpg',
                caption: 'phat day'
            },
            {
                image: './images/2.jpg',
                caption: 'วันทัศนศึกษา'
            },
            {
                image: './images/3.jpg',
                caption: 'วันลอยกระทง'
            },
            {
                image: './images/4.jpg',
                caption: 'วันปีใหม่'
            },
            {
                image: './images/5.jpg',
                caption: 'งานวันแห่เทียน'
            },
            {
                image: './images/6.jpg',
                caption: 'วันไปแข่ง46ict'
            },
            {
                image: './images/7.jpg',
                caption: '582 day'
            }
        ];
    }
    
    createPlaceholderImage(color, text) {
        // Create SVG placeholder
        const svg = `
            <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad-${color.replace('#', '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${this.shiftColor(color)};stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="400" height="400" fill="url(#grad-${color.replace('#', '')})" />
                <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.8">
                    ${text}
                </text>
                <text x="50%" y="60%" font-family="Arial" font-size="14" fill="white" text-anchor="middle" dominant-baseline="middle" opacity="0.5">
                    Add your photo here
                </text>
            </svg>
        `;
        
        return 'data:image/svg+xml;base64,' + btoa(svg);
    }
    
    shiftColor(hex) {
        // Shift color slightly for gradient effect
        const num = parseInt(hex.slice(1), 16);
        const r = Math.min(255, (num >> 16) + 30);
        const g = Math.min(255, ((num >> 8) & 0x00FF) + 20);
        const b = Math.min(255, (num & 0x0000FF) + 40);
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }
    
    createStarField() {
        const container = document.getElementById('memory-galaxy');
        container.innerHTML = '';
        
        this.memories.forEach((memory, index) => {
            const star = this.createMemoryStar(memory, index);
            container.appendChild(star);
        });
    }
    
    createMemoryStar(memory, index) {
        const star = document.createElement('div');
        star.className = 'memory-star';
        
        // Position stars in a flowing pattern
        const angle = (index / this.memories.length) * Math.PI * 2;
        const radius = 150 + (index % 3) * 80;
        const centerX = window.innerWidth / 2;
        const centerY = 300;
        
        const x = centerX + Math.cos(angle) * radius - 40;
        const y = centerY + Math.sin(angle) * radius - 40;
        
        star.style.left = Math.max(20, Math.min(window.innerWidth - 100, x)) + 'px';
        star.style.top = Math.max(20, Math.min(500, y)) + 'px';
        
        const starGlow = document.createElement('div');
        starGlow.className = 'star-glow';
        starGlow.style.animationDelay = (index * 0.3) + 's';
        
        star.appendChild(starGlow);
        
        star.addEventListener('click', () => {
            this.openMemory(memory);
        });
        
        return star;
    }
    
    setupModal() {
        this.modal = document.getElementById('memory-modal');
        const backdrop = this.modal.querySelector('.modal-backdrop');
        const closeBtn = this.modal.querySelector('.modal-close');
        
        backdrop.addEventListener('click', () => this.closeModal());
        closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    openMemory(memory) {
        const modalImage = document.getElementById('modal-image');
        const modalCaption = document.getElementById('modal-caption');
        
        modalImage.src = memory.image;
        modalCaption.textContent = memory.caption;
        
        this.modal.classList.remove('hidden');
        
        // Add entrance animation
        setTimeout(() => {
            this.modal.querySelector('.modal-content').style.animation = 'modal-appear 0.4s ease';
        }, 10);
        
        // Create particle effect
        this.createModalParticles();
    }
    
    closeModal() {
        this.modal.classList.add('hidden');
    }
    
    createModalParticles() {
        const modalContent = this.modal.querySelector('.modal-content');
        const rect = modalContent.getBoundingClientRect();
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.left = rect.left + Math.random() * rect.width + 'px';
                particle.style.top = rect.top + 'px';
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.background = ['#8B5CF6', '#EC4899', '#38BDF8'][Math.floor(Math.random() * 3)];
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.animation = 'float-up-particle 2s ease-out forwards';
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }, i * 30);
        }
        
        // Add particle animation if not exists
        if (!document.getElementById('particle-style')) {
            const style = document.createElement('style');
            style.id = 'particle-style';
            style.textContent = `
                @keyframes float-up-particle {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100px) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Method to add custom memory
    addMemory(imageUrl, caption) {
        this.memories.push({
            image: imageUrl,
            caption: caption
        });
        
        // Re-create star field
        this.createStarField();
    }
}

// Create global instance
window.memoryGallery = new MemoryGallery();

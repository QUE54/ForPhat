/* =========================================
   TIMELINE CHAPTER
   ========================================= */

class TimelineManager {
    constructor() {
        this.relationshipStart = new Date('2024-06-06');
        this.today = new Date();
        this.initialized = false;
    }
    
    init() {
        if (!this.initialized) {
            this.calculateDays();
            this.setupInteractions();
            this.initialized = true;
        }
    }
    
    calculateDays() {
        const diffTime = Math.abs(this.today - this.relationshipStart);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const daysElement = document.getElementById('days-together');
        if (daysElement) {
            this.animateNumber(daysElement, diffDays);
        }
    }
    
    animateNumber(element, targetNumber) {
        const duration = 2000;
        const startTime = Date.now();
        const startNumber = 0;
        
        const update = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * this.easeOutCubic(progress));
            
            element.textContent = `${currentNumber} Days Together`;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `${targetNumber} Days Together`;
            }
        };
        
        update();
    }
    
    setupInteractions() {
        const timelineCards = document.querySelectorAll('.timeline-card');
        
        timelineCards.forEach(card => {
            card.addEventListener('click', () => {
                this.toggleCard(card);
            });
        });
    }
    
    toggleCard(card) {
        const isExpanded = card.classList.contains('expanded');
        
        // Close all cards
        document.querySelectorAll('.timeline-card').forEach(c => {
            c.classList.remove('expanded');
        });
        
        // Toggle current card
        if (!isExpanded) {
            card.classList.add('expanded');
            
            // Add sparkle effect
            this.createSparkles(card);
        }
    }
    
    createSparkles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.style.position = 'fixed';
                sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
                sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
                sparkle.style.width = '4px';
                sparkle.style.height = '4px';
                sparkle.style.background = '#8B5CF6';
                sparkle.style.borderRadius = '50%';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '9999';
                sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
                
                document.body.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 50);
        }
        
        // Add sparkle animation if not exists
        if (!document.getElementById('sparkle-style')) {
            const style = document.createElement('style');
            style.id = 'sparkle-style';
            style.textContent = `
                @keyframes sparkle-fade {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-30px) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // Method to add custom milestones
    addMilestone(date, title, description, detail) {
        const container = document.getElementById('timeline-container');
        const items = container.querySelectorAll('.timeline-item');
        const index = items.length;
        
        const milestoneHTML = `
            <div class="timeline-item" data-index="${index}">
                <div class="timeline-dot"></div>
                <div class="timeline-card glass-card">
                    <div class="timeline-date">${this.formatDate(date)}</div>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <div class="timeline-detail">
                        ${detail}
                    </div>
                </div>
            </div>
        `;
        
        // Insert before the last item (Today)
        const lastItem = items[items.length - 1];
        lastItem.insertAdjacentHTML('beforebegin', milestoneHTML);
        
        // Re-setup interactions
        this.setupInteractions();
    }
    
    formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }
}

// Create global instance
window.timelineManager = new TimelineManager();

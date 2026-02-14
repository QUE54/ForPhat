/* =========================================
   THREE.JS GALAXY SCENE
   ========================================= */

class GalaxyScene {
    constructor() {
        this.canvas = document.getElementById('galaxy-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.stars = [];
        this.animationId = null;
        
        this.init();
        this.createGalaxy();
        this.createFloatingStars();
        this.animate();
        this.handleResize();
    }
    
    init() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0A0118, 1, 15);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    
    createGalaxy() {
        const particleCount = 3000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        const colorPalette = [
            new THREE.Color(0x8B5CF6), // Violet
            new THREE.Color(0xEC4899), // Pink
            new THREE.Color(0x38BDF8), // Sky Blue
            new THREE.Color(0xA78BFA), // Light Violet
            new THREE.Color(0xF9A8D4)  // Light Pink
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Spiral galaxy distribution
            const radius = Math.random() * 10;
            const spinAngle = radius * 2;
            const branchAngle = (i % 5) * (Math.PI * 2 / 5);
            
            positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
            positions[i3 + 1] = (Math.random() - 0.5) * 3;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;
            
            // Random color from palette
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;
        }
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.05,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    createFloatingStars() {
        const starGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        
        for (let i = 0; i < 50; i++) {
            const material = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? 0xEC4899 : 0x8B5CF6,
                transparent: true,
                opacity: 0.8
            });
            
            const star = new THREE.Mesh(starGeometry, material);
            
            star.position.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
            
            star.userData.velocity = {
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.002,
                z: (Math.random() - 0.5) * 0.002
            };
            
            this.stars.push(star);
            this.scene.add(star);
        }
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Rotate galaxy slowly
        if (this.particles) {
            this.particles.rotation.y += 0.0005;
            this.particles.rotation.x += 0.0002;
        }
        
        // Animate floating stars
        this.stars.forEach(star => {
            star.position.x += star.userData.velocity.x;
            star.position.y += star.userData.velocity.y;
            star.position.z += star.userData.velocity.z;
            
            // Wrap around
            if (Math.abs(star.position.x) > 10) star.position.x *= -1;
            if (Math.abs(star.position.y) > 10) star.position.y *= -1;
            if (Math.abs(star.position.z) > 10) star.position.z *= -1;
            
            // Pulse effect
            const scale = 1 + Math.sin(Date.now() * 0.001 + star.position.x) * 0.3;
            star.scale.set(scale, scale, scale);
        });
        
        this.renderer.render(this.scene, this.camera);
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    zoomCamera(targetZ, duration = 2000) {
        const startZ = this.camera.position.z;
        const startTime = Date.now();
        
        const zoom = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = this.easeInOutCubic(progress);
            
            this.camera.position.z = startZ + (targetZ - startZ) * easeProgress;
            
            if (progress < 1) {
                requestAnimationFrame(zoom);
            }
        };
        
        zoom();
    }
    
    createHeartFormation() {
        // Remove existing particles
        if (this.particles) {
            this.scene.remove(this.particles);
        }
        
        const heartPoints = this.generateHeartShape(500);
        const positions = new Float32Array(heartPoints.length * 3);
        const colors = new Float32Array(heartPoints.length * 3);
        
        heartPoints.forEach((point, i) => {
            const i3 = i * 3;
            positions[i3] = point.x;
            positions[i3 + 1] = point.y;
            positions[i3 + 2] = point.z;
            
            // Gradient from violet to pink
            const t = i / heartPoints.length;
            colors[i3] = 0.545 + t * 0.38;     // R
            colors[i3 + 1] = 0.361 + t * 0.02; // G
            colors[i3 + 2] = 0.965 - t * 0.365; // B
        });
        
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.08,
            sizeAttenuation: true,
            vertexColors: true,
            transparent: true,
            opacity: 1,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        // Animate gathering
        this.animateHeartGathering();
    }
    
    generateHeartShape(count) {
        const points = [];
        
        for (let i = 0; i < count; i++) {
            const t = (i / count) * Math.PI * 2;
            
            // Parametric heart equation
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            
            // Add some depth variation
            const z = (Math.random() - 0.5) * 2;
            
            points.push({
                x: x * 0.15,
                y: y * 0.15,
                z: z
            });
        }
        
        return points;
    }
    
    animateHeartGathering() {
        let scale = 0;
        const animate = () => {
            scale += 0.02;
            if (scale < 1) {
                this.particles.scale.set(scale, scale, scale);
                requestAnimationFrame(animate);
            } else {
                this.particles.scale.set(1, 1, 1);
                this.startHeartRotation();
            }
        };
        animate();
    }
    
    startHeartRotation() {
        const rotateHeart = () => {
            if (this.particles) {
                this.particles.rotation.y += 0.005;
            }
            requestAnimationFrame(rotateHeart);
        };
        rotateHeart();
    }
    
    easeInOutCubic(t) {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Create floating petals effect
function createPetals() {
    const container = document.getElementById('petals-container');
    
    function addPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        
        const startX = Math.random() * window.innerWidth;
        const duration = 10 + Math.random() * 10;
        const delay = Math.random() * 5;
        const size = 6 + Math.random() * 8;
        
        petal.style.left = startX + 'px';
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.animationDuration = duration + 's';
        petal.style.animationDelay = delay + 's';
        
        container.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }
    
    // Create initial petals
    for (let i = 0; i < 20; i++) {
        setTimeout(addPetal, i * 300);
    }
    
    // Continuously add petals
    setInterval(addPetal, 2000);
}

// Initialize
let galaxyScene;

window.addEventListener('DOMContentLoaded', () => {
    galaxyScene = new GalaxyScene();
    createPetals();
});

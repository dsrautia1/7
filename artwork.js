// Advanced Abstract Art Generator
// Enhanced with multiple styles, animations, and interactive controls

class AdvancedArtGenerator {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animating = false;
        this.currentStyle = 'abstract';
        this.complexity = 50;
        this.density = 50;
        this.colorPalette = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3'];
        this.gradient = null;
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Initialize
        this.generateArt();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth * 0.9;
        this.canvas.height = window.innerHeight * 0.7;
        this.generateArt();
    }
    
    setStyle(style) {
        this.currentStyle = style;
        this.generateArt();
    }
    
    setComplexity(value) {
        this.complexity = parseInt(value);
        this.generateArt();
    }
    
    setDensity(value) {
        this.density = parseInt(value);
        this.generateArt();
    }
    
    setPalette(colors) {
        this.colorPalette = colors;
        this.generateArt();
    }
    
    generateArt() {
        if (this.animating) {
            this.stopAnimation();
        }
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        switch(this.currentStyle) {
            case 'abstract':
                this.generateAbstractArt();
                break;
            case 'impressionist':
                this.generateImpressionistArt();
                break;
            case 'pointillism':
                this.generatePointillismArt();
                break;
            case 'cubism':
                this.generateCubismArt();
                break;
            case 'popart':
                this.generatePopArt();
                break;
            case 'vangogh':
                this.generateVanGoghStyle();
                break;
            case 'renaissance':
                this.generateRenaissanceStyle();
                break;
            case 'japanese':
                this.generateJapaneseStyle();
                break;
            case 'surrealism':
                this.generateSurrealism();
                break;
            case 'pixel':
                this.generatePixelArt();
                break;
            case 'fractal':
                this.generateFractalArt();
                break;
            case 'fluid':
                this.generateFluidArt();
                break;
            case 'geometric':
                this.generateGeometricArt();
                break;
            case 'cyberpunk':
                this.generateCyberpunkArt();
                break;
            default:
                this.generateAbstractArt();
        }
    }
    
    generateAbstractArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Create gradient background
        this.createGradientBackground();
        
        // Draw random shapes
        const numShapes = 10 + this.complexity * 0.5;
        
        for (let i = 0; i < numShapes; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 10 + Math.random() * 50 * (this.complexity / 100);
            const color = palette[Math.floor(Math.random() * palette.length)];
            const opacity = 0.3 + Math.random() * 0.7;
            const rotation = Math.random() * Math.PI * 2;
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(rotation);
            
            this.ctx.beginPath();
            
            if (Math.random() > 0.5) {
                // Circle
                this.ctx.arc(0, 0, size, 0, Math.PI * 2);
            } else {
                // Rectangle
                const w = size * (1 + Math.random());
                const h = size * (1 + Math.random());
                this.ctx.rect(-w/2, -h/2, w, h);
            }
            
            this.ctx.fillStyle = this.adjustColorAlpha(color, opacity);
            this.ctx.fill();
            
            // Add subtle shadow
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowOffsetX = 5;
            this.ctx.shadowOffsetY = 5;
            
            this.ctx.restore();
        }
        
        // Draw random lines
        const numLines = this.complexity * 0.3;
        
        for (let i = 0; i < numLines; i++) {
            const x1 = Math.random() * width;
            const y1 = Math.random() * height;
            const x2 = x1 + (Math.random() - 0.5) * width * 0.5;
            const y2 = y1 + (Math.random() - 0.5) * height * 0.5;
            const color = palette[Math.floor(Math.random() * palette.length)];
            const width = 1 + Math.random() * 5 * (this.complexity / 100);
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = width;
            this.ctx.stroke();
        }
        
        // Add some particles for depth
        this.addParticles(20);
    }
    
    generateImpressionistArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        // Create a base gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette[0]);
        gradient.addColorStop(1, palette[palette.length - 1]);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw short brush strokes in various directions
        const numStrokes = 100 + this.complexity * 2;
        
        for (let i = 0; i < numStrokes; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const length = 5 + Math.random() * 20 * (this.complexity / 100);
            const angle = Math.random() * Math.PI * 2;
            const color = palette[Math.floor(Math.random() * palette.length)];
            const width = 1 + Math.random() * 3 * (this.complexity / 100);
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(
                x + Math.cos(angle) * length,
                y + Math.sin(angle) * length
            );
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = width;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();
        }
    }
    
    generatePointillismArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        // Create a base color
        this.ctx.fillStyle = palette[0];
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw many small dots
        const numDots = 500 + this.complexity * 10;
        const dotSize = Math.max(1, 5 - this.complexity * 0.05);
        
        for (let i = 0; i < numDots; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const color = palette[Math.floor(Math.random() * palette.length)];
            const sizeVariation = 0.5 + Math.random() * 1.5;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, dotSize * sizeVariation, 0, Math.PI * 2);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }
    
    generateCubismArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw geometric shapes
        const numShapes = 20 + this.complexity * 0.5;
        
        for (let i = 0; i < numShapes; i++) {
            const points = [];
            const numPoints = 3 + Math.floor(Math.random() * 4); // 3-6 points
            const centerX = Math.random() * width;
            const centerY = Math.random() * height;
            const size = 10 + Math.random() * 40 * (this.complexity / 100);
            
            for (let p = 0; p < numPoints; p++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = size * (0.5 + Math.random() * 0.5);
                points.push({
                    x: centerX + Math.cos(angle) * distance,
                    y: centerY + Math.sin(angle) * distance
                });
            }
            
            // Draw the polygon
            this.ctx.beginPath();
            this.ctx.moveTo(points[0].x, points[0].y);
            
            for (let p = 1; p < points.length; p++) {
                this.ctx.lineTo(points[p].x, points[p].y);
            }
            
            this.ctx.closePath();
            this.ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
            this.ctx.fill();
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }
    
    generatePopArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Use a limited, vibrant palette for pop art
        const popPalette = [
            '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
            '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'
        ];
        
        // Create a grid of cells
        const gridSize = 4 + Math.floor(this.complexity / 20);
        const cellWidth = width / gridSize;
        const cellHeight = height / gridSize;
        
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = col * cellWidth;
                const y = row * cellHeight;
                
                // Fill cell with a solid color
                this.ctx.fillStyle = popPalette[Math.floor(Math.random() * popPalette.length)];
                this.ctx.fillRect(x, y, cellWidth, cellHeight);
                
                // Add a simple shape in the center
                const centerX = x + cellWidth / 2;
                const centerY = y + cellHeight / 2;
                const size = Math.min(cellWidth, cellHeight) * 0.4;
                
                this.ctx.beginPath();
                
                if (Math.random() > 0.5) {
                    // Circle
                    this.ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
                } else {
                    // Star
                    this.ctx.moveTo(centerX, centerY - size);
                    for (let i = 1; i <= 5; i++) {
                        const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
                        this.ctx.lineTo(
                            centerX + Math.cos(angle) * size,
                            centerY + Math.sin(angle) * size
                        );
                    }
                    this.ctx.closePath();
                }
                
                this.ctx.fillStyle = popPalette[Math.floor(Math.random() * popPalette.length)];
                this.ctx.fill();
            }
        }
    }
    
    generateVanGoghStyle() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = ['#2C3E50', '#E74C3C', '#F39C12', '#27AE60', '#3498DB', '#F1C40F'];
        
        // Create swirling, expressive strokes
        this.ctx.clearRect(0, 0, width, height);
        
        // Background
        this.ctx.fillStyle = palette[0];
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw swirling strokes
        const numStrokes = 200 + this.complexity * 0.3;
        
        for (let i = 0; i < numStrokes; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const length = 10 + Math.random() * 30 * (this.complexity / 100);
            const curl = 0.5 + Math.random() * 2;
            const color = palette[1 + Math.floor(Math.random() * (palette.length - 1))];
            const width = 1 + Math.random() * 4 * (this.complexity / 100);
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            
            // Create a swirling path
            for (let j = 1; j <= 10; j++) {
                const t = j / 10;
                const angle = t * Math.PI * 2 * curl;
                const segmentLength = length * t / 10;
                
                this.ctx.lineTo(
                    x + Math.cos(angle) * segmentLength,
                    y + Math.sin(angle) * segmentLength
                );
            }
            
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = width;
            this.ctx.lineCap = 'round';
            this.ctx.stroke();
        }
    }
    
    generateRenaissanceStyle() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = ['#8B4513', '#D2B48C', '#F5DEB3', '#A0522D', '#CD853F', '#DAA520'];
        
        // Create a classical, balanced composition
        this.ctx.clearRect(0, 0, width, height);
        
        // Background with gradient
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette[0]);
        gradient.addColorStop(1, palette[1]);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw a central focal point (simulating a classical subject)
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.3;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = palette[2];
        this.ctx.fill();
        
        // Add decorative elements
        const numElements = 20 + this.complexity * 0.5;
        
        for (let i = 0; i < numElements; i++) {
            const angle = i * Math.PI * 2 / numElements;
            const distance = radius * 1.2;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            const size = 5 + Math.random() * 15 * (this.complexity / 100);
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = palette[3 + Math.floor(Math.random() * 2)];
            this.ctx.fill();
        }
    }
    
    generateJapaneseStyle() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = ['#FFFFFF', '#000000', '#C33B32', '#006E63', '#F8C3CD'];
        
        // Minimalist Japanese aesthetic
        this.ctx.clearRect(0, 0, width, height);
        
        // Background
        this.ctx.fillStyle = palette[0];
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw a few simple, elegant elements
        const numElements = 3 + Math.floor(this.complexity / 30);
        
        for (let i = 0; i < numElements; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const elementType = Math.floor(Math.random() * 3);
            
            this.ctx.strokeStyle = palette[1];
            this.ctx.lineWidth = 2 + Math.random() * 3 * (this.complexity / 100);
            
            if (elementType === 0) {
                // Bamboo stalk
                const segments = 3 + Math.floor(Math.random() * 4);
                const segmentHeight = 20 + Math.random() * 30 * (this.complexity / 100);
                
                for (let s = 0; s < segments; s++) {
                    const segmentY = y + s * segmentHeight;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, segmentY);
                    this.ctx.lineTo(x, segmentY + segmentHeight);
                    this.ctx.stroke();
                    
                    // Add a small branch
                    if (s > 0 && Math.random() > 0.7) {
                        const branchX = x + (Math.random() > 0.5 ? 10 : -10);
                        this.ctx.beginPath();
                        this.ctx.moveTo(x, segmentY + segmentHeight/2);
                        this.ctx.lineTo(branchX, segmentY + segmentHeight/2);
                        this.ctx.stroke();
                    }
                }
            } else if (elementType === 1) {
                // Cherry blossom
                this.ctx.beginPath();
                this.ctx.arc(x, y, 15 + Math.random() * 20 * (this.complexity / 100), 0, Math.PI * 2);
                this.ctx.stroke();
                
                // Petals
                const petals = 5;
                for (let p = 0; p < petals; p++) {
                    const angle = p * Math.PI * 2 / petals;
                    const petalLength = 10 + Math.random() * 15 * (this.complexity / 100);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(
                        x + Math.cos(angle) * petalLength,
                        y + Math.sin(angle) * petalLength
                    );
                    this.ctx.stroke();
                }
            } else {
                // Kanji-like character (simplified)
                const strokes = 3 + Math.floor(Math.random() * 4);
                
                for (let s = 0; s < strokes; s++) {
                    const startX = x + Math.random() * 40 - 20;
                    const startY = y + Math.random() * 40 - 20;
                    const endX = startX + Math.random() * 40 - 20;
                    const endY = startY + Math.random() * 40 - 20;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(startX, startY);
                    this.ctx.lineTo(endX, endY);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    generateSurrealism() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        // Create a dreamlike, surreal composition
        this.ctx.clearRect(0, 0, width, height);
        
        // Background with gradient
        const gradient = this.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette[0]);
        gradient.addColorStop(1, palette[palette.length - 1]);
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // Draw floating, disconnected elements
        const numElements = 10 + this.complexity * 0.5;
        
        for (let i = 0; i < numElements; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 10 + Math.random() * 40 * (this.complexity / 100);
            const elementType = Math.floor(Math.random() * 5);
            
            this.ctx.save();
            this.ctx.translate(x, y);
            this.ctx.rotate(Math.random() * Math.PI * 2);
            
            switch (elementType) {
                case 0:
                    // Floating clock
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, size, 0, Math.PI * 2);
                    this.ctx.strokeStyle = palette[2];
                    this.ctx.lineWidth = 3;
                    this.ctx.stroke();
                    
                    // Clock hands
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(0, -size * 0.7);
                    this.ctx.stroke();
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, 0);
                    this.ctx.lineTo(size * 0.4, 0);
                    this.ctx.stroke();
                    break;
                    
                case 1:
                    // Melting object
                    this.ctx.beginPath();
                    this.ctx.moveTo(-size/2, -size/2);
                    this.ctx.lineTo(size/2, -size/2);
                    
                    // Melting drips
                    for (let d = 0; d < 3; d++) {
                        const dripX = -size/2 + (d + 0.5) * size/3;
                        this.ctx.lineTo(dripX, -size/2 + size/4);
                        this.ctx.lineTo(dripX - size/10, -size/2 + size/2);
                        this.ctx.lineTo(dripX + size/10, -size/2 + size/2);
                        this.ctx.lineTo(dripX, -size/2 + size/4);
                    }
                    
                    this.ctx.lineTo(size/2, -size/2);
                    this.ctx.lineTo(size/2, size/2);
                    this.ctx.lineTo(-size/2, size/2);
                    this.ctx.closePath();
                    this.ctx.fillStyle = palette[3];
                    this.ctx.fill();
                    break;
                    
                case 2:
                    // Eye
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, size, 0, Math.PI * 2);
                    this.ctx.strokeStyle = palette[4];
                    this.ctx.lineWidth = 2;
                    this.ctx.stroke();
                    
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, size/2, 0, Math.PI * 2);
                    this.ctx.fillStyle = palette[1];
                    this.ctx.fill();
                    
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, size/4, 0, Math.PI * 2);
                    this.ctx.fillStyle = palette[0];
                    this.ctx.fill();
                    break;
                    
                case 3:
                    // Floating island
                    this.ctx.beginPath();
                    this.ctx.ellipse(0, 0, size, size/2, 0, 0, Math.PI * 2);
                    this.ctx.fillStyle = palette[5];
                    this.ctx.fill();
                    
                    // Little tree on top
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -size/2);
                    this.ctx.lineTo(-size/4, -size);
                    this.ctx.lineTo(size/4, -size);
                    this.ctx.closePath();
                    this.ctx.fillStyle = palette[2];
                    this.ctx.fill();
                    break;
                    
                case 4:
                    // Lobster telephone (simplified)
                    this.ctx.beginPath();
                    // Telephone base
                    this.ctx.rect(-size/2, -size/4, size, size/2);
                    this.ctx.fillStyle = palette[3];
                    this.ctx.fill();
                    
                    // Receiver
                    this.ctx.beginPath();
                    this.ctx.arc(size/2 + size/4, 0, size/4, 0, Math.PI * 2);
                    this.ctx.fillStyle = palette[4];
                    this.ctx.fill();
                    
                    // Lobster
                    this.ctx.beginPath();
                    for (let s = 0; s < 5; s++) {
                        const segmentX = -size/2 + s * size/5;
                        this.ctx.arc(segmentX, -size/4, size/10, 0, Math.PI * 2);
                    }
                    this.ctx.fillStyle = palette[1];
                    this.ctx.fill();
                    break;
            }
            
            this.ctx.restore();
        }
    }
    
    generatePixelArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        // Create a grid of pixels
        const pixelSize = Math.max(1, Math.floor(10 - this.complexity * 0.05));
        const cols = Math.floor(width / pixelSize);
        const rows = Math.floor(height / pixelSize);
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                // Determine if we should draw a pixel based on density
                if (Math.random() < this.density / 100) {
                    const color = palette[Math.floor(Math.random() * palette.length)];
                    this.ctx.fillStyle = color;
                    this.ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
                }
            }
        }
    }
    
    // Additional advanced styles
    
    generateFractalArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw fractal patterns
        const iterations = 100 + this.complexity * 2;
        
        for (let i = 0; i < iterations; i++) {
            const x = width / 2;
            const y = height / 2;
            const size = Math.min(width, height) * 0.4;
            
            this.drawFractal(x, y, size, palette, 0);
        }
    }
    
    drawFractal(x, y, size, palette, depth) {
        if (size < 2 || depth > 8) return;
        
        const color = palette[depth % palette.length];
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 1;
        
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.stroke();
        
        const newSize = size * 0.7;
        
        // Recursive calls for fractal pattern
        this.drawFractal(x + size * 0.5, y, newSize, palette, depth + 1);
        this.drawFractal(x - size * 0.5, y, newSize, palette, depth + 1);
        this.drawFractal(x, y + size * 0.5, newSize, palette, depth + 1);
        this.drawFractal(x, y - size * 0.5, newSize, palette, depth + 1);
    }
    
    generateFluidArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Create fluid-like patterns
        const numDrops = 5 + this.complexity * 0.2;
        
        for (let i = 0; i < numDrops; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 20 + Math.random() * 80 * (this.complexity / 100);
            const color = palette[Math.floor(Math.random() * palette.length)];
            
            this.drawFluidDrop(x, y, size, color);
        }
    }
    
    drawFluidDrop(x, y, size, color) {
        this.ctx.save();
        this.ctx.translate(x, y);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        
        // Create fluid-like shape
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const radius = size * (0.8 + Math.random() * 0.4);
            const xPos = Math.cos(angle) * radius;
            const yPos = Math.sin(angle) * radius;
            
            this.ctx.lineTo(xPos, yPos);
        }
        
        this.ctx.closePath();
        
        // Create gradient fill
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, this.adjustColorAlpha(color, 0.8));
        gradient.addColorStop(1, this.adjustColorAlpha(color, 0.2));
        
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    generateGeometricArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = this.colorPalette;
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw geometric patterns
        const shapes = 10 + this.complexity * 0.5;
        
        for (let i = 0; i < shapes; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 10 + Math.random() * 60 * (this.complexity / 100);
            const sides = 3 + Math.floor(Math.random() * 5); // 3-7 sides
            const color = palette[Math.floor(Math.random() * palette.length)];
            const rotation = Math.random() * Math.PI * 2;
            
            this.drawGeometricShape(x, y, size, sides, color, rotation);
        }
    }
    
    drawGeometricShape(x, y, size, sides, color, rotation) {
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        
        this.ctx.beginPath();
        this.ctx.moveTo(size, 0);
        
        for (let i = 1; i < sides; i++) {
            const angle = (i / sides) * Math.PI * 2;
            this.ctx.lineTo(
                Math.cos(angle) * size,
                Math.sin(angle) * size
            );
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        
        this.ctx.restore();
    }
    
    generateCyberpunkArt() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        const palette = ['#FF00FF', '#00FFFF', '#FFFF00', '#000000', '#FFFFFF'];
        
        this.ctx.clearRect(0, 0, width, height);
        
        // Dark background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, width, height);
        
        // Grid lines
        this.ctx.strokeStyle = palette[0];
        this.ctx.lineWidth = 1;
        
        const gridSize = 20 + this.complexity * 0.2;
        
        for (let x = 0; x < width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(width, y);
            this.ctx.stroke();
        }
        
        // Neon elements
        const numElements = 10 + this.complexity * 0.3;
        
        for (let i = 0; i < numElements; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = 5 + Math.random() * 30 * (this.complexity / 100);
            const color = palette[Math.floor(Math.random() * 3)]; // First 3 colors are neon
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Glow effect
            this.ctx.beginPath();
            this.ctx.arc(x, y, size + 5, 0, Math.PI * 2);
            this.ctx.strokeStyle = this.adjustColorAlpha(color, 0.3);
            this.ctx.lineWidth = 10;
            this.ctx.stroke();
        }
    }
    
    // Utility methods
    
    createGradientBackground() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        this.gradient = this.ctx.createLinearGradient(0, 0, width, height);
        this.gradient.addColorStop(0, this.colorPalette[0]);
        this.gradient.addColorStop(1, this.colorPalette[this.colorPalette.length - 1]);
        
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, width, height);
    }
    
    adjustColorAlpha(color, alpha) {
        // Convert hex to rgba
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    addParticles(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 2 - 1,
                color: this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)]
            });
        }
    }
    
    animate() {
        if (!this.animating) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Redraw base art
        this.generateArt();
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Bounce off edges
            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.speedY *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        }
        
        // Continue animation
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    startAnimation() {
        if (this.animating) return;
        
        this.animating = true;
        this.animate();
    }
    
    stopAnimation() {
        if (!this.animating) return;
        
        this.animating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    // Method to save the artwork as an image
    saveArtwork() {
        const link = document.createElement('a');
        link.download = 'artwork.png';
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }
    
    // Method to clear the canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = [];
        if (this.animating) {
            this.stopAnimation();
        }
    }
}

// Initialize the art generator when the page loads
document.addEventListener('DOMContentLoaded', function() {
    window.artGenerator = new AdvancedArtGenerator('artCanvas');
});

export {constructor, resizeCanvas, setStyle, setComplexity, setDensity, setPalette, generateArt, generateAbstractArt,
    generateImpressionistArt,generatePointillismArt, generateCubismArt, generatePopArt, generateVanGoghStyle,
    generateRenaissanceStyle,generateJapaneseStyle,generateSurrealism, generatePixelArt,generateFractalArt,
    drawFractal,generateFluidArt,drawFluidDrop, generateGeometricArt, drawGeometricShape, generateCyberpunkArt,
    createGradientBackground,adjustColorAlpha, addParticles, animate, startAnimation, stopAnimation, saveArtwork,
    clearCanvas,
};
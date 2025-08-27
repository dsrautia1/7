// Advanced Abstract Art Generator
// Enhanced with multiple styles, animations, and interactive controls

// Global variables
let canvas;
let ctx;
let particles = [];
let animating = false;
let currentStyle = 'abstract';
let complexity = 50;
let density = 50;
let colorPalette = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3'];
let gradient = null;
let animationId = null;

// Initialize the art generator
function initArtGenerator(canvasId) {
    canvas = document.getElementById(canvasId);
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', () => resizeCanvas());
    
    // Initialize
    generateArt();
}

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;
    generateArt();
}

function setStyle(style) {
    currentStyle = style;
    generateArt();
}

function setComplexity(value) {
    complexity = parseInt(value);
    generateArt();
}

function setDensity(value) {
    density = parseInt(value);
    generateArt();
}

function setPalette(colors) {
    colorPalette = colors;
    generateArt();
}

function generateArt() {
    if (animating) {
        stopAnimation();
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch(currentStyle) {
        case 'abstract':
            generateAbstractArt();
            break;
        case 'impressionist':
            generateImpressionistArt();
            break;
        case 'pointillism':
            generatePointillismArt();
            break;
        case 'cubism':
            generateCubismArt();
            break;
        case 'popart':
            generatePopArt();
            break;
        case 'vangogh':
            generateVanGoghStyle();
            break;
        case 'renaissance':
            generateRenaissanceStyle();
            break;
        case 'japanese':
            generateJapaneseStyle();
            break;
        case 'surrealism':
            generateSurrealism();
            break;
        case 'pixel':
            generatePixelArt();
            break;
        case 'fractal':
            generateFractalArt();
            break;
        case 'fluid':
            generateFluidArt();
            break;
        case 'geometric':
            generateGeometricArt();
            break;
        case 'cyberpunk':
            generateCyberpunkArt();
            break;
        default:
            generateAbstractArt();
    }
}

function generateAbstractArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    ctx.clearRect(0, 0, width, height);
    
    // Create gradient background
    createGradientBackground();
    
    // Draw random shapes
    const numShapes = 10 + complexity * 0.5;
    
    for (let i = 0; i < numShapes; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 10 + Math.random() * 50 * (complexity / 100);
        const color = palette[Math.floor(Math.random() * palette.length)];
        const opacity = 0.3 + Math.random() * 0.7;
        const rotation = Math.random() * Math.PI * 2;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        ctx.beginPath();
        
        if (Math.random() > 0.5) {
            // Circle
            ctx.arc(0, 0, size, 0, Math.PI * 2);
        } else {
            // Rectangle
            const w = size * (1 + Math.random());
            const h = size * (1 + Math.random());
            ctx.rect(-w/2, -h/2, w, h);
        }
        
        ctx.fillStyle = adjustColorAlpha(color, opacity);
        ctx.fill();
        
        // Add subtle shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        
        ctx.restore();
    }
    
    // Draw random lines
    const numLines = complexity * 0.3;
    
    for (let i = 0; i < numLines; i++) {
        const x1 = Math.random() * width;
        const y1 = Math.random() * height;
        const x2 = x1 + (Math.random() - 0.5) * width * 0.5;
        const y2 = y1 + (Math.random() - 0.5) * height * 0.5;
        const color = palette[Math.floor(Math.random() * palette.length)];
        const width = 1 + Math.random() * 5 * (complexity / 100);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
    }
    
    // Add some particles for depth
    addParticles(20);
}

function generateImpressionistArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    // Create a base gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(1, palette[palette.length - 1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw short brush strokes in various directions
    const numStrokes = 100 + complexity * 2;
    
    for (let i = 0; i < numStrokes; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const length = 5 + Math.random() * 20 * (complexity / 100);
        const angle = Math.random() * Math.PI * 2;
        const color = palette[Math.floor(Math.random() * palette.length)];
        const width = 1 + Math.random() * 3 * (complexity / 100);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + Math.cos(angle) * length,
            y + Math.sin(angle) * length
        );
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

function generatePointillismArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    // Create a base color
    ctx.fillStyle = palette[0];
    ctx.fillRect(0, 0, width, height);
    
    // Draw many small dots
    const numDots = 500 + complexity * 10;
    const dotSize = Math.max(1, 5 - complexity * 0.05);
    
    for (let i = 0; i < numDots; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const color = palette[Math.floor(Math.random() * palette.length)];
        const sizeVariation = 0.5 + Math.random() * 1.5;
        
        ctx.beginPath();
        ctx.arc(x, y, dotSize * sizeVariation, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

function generateCubismArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw geometric shapes
    const numShapes = 20 + complexity * 0.5;
    
    for (let i = 0; i < numShapes; i++) {
        const points = [];
        const numPoints = 3 + Math.floor(Math.random() * 4); // 3-6 points
        const centerX = Math.random() * width;
        const centerY = Math.random() * height;
        const size = 10 + Math.random() * 40 * (complexity / 100);
        
        for (let p = 0; p < numPoints; p++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = size * (0.5 + Math.random() * 0.5);
            points.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance
            });
        }
        
        // Draw the polygon
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        
        for (let p = 1; p < points.length; p++) {
            ctx.lineTo(points[p].x, points[p].y);
        }
        
        ctx.closePath();
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function generatePopArt() {
    const width = canvas.width;
    const height = canvas.height;
    
    // Use a limited, vibrant palette for pop art
    const popPalette = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
        '#FF00FF', '#00FFFF', '#FFFFFF', '#000000'
    ];
    
    // Create a grid of cells
    const gridSize = 4 + Math.floor(complexity / 20);
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const x = col * cellWidth;
            const y = row * cellHeight;
            
            // Fill cell with a solid color
            ctx.fillStyle = popPalette[Math.floor(Math.random() * popPalette.length)];
            ctx.fillRect(x, y, cellWidth, cellHeight);
            
            // Add a simple shape in the center
            const centerX = x + cellWidth / 2;
            const centerY = y + cellHeight / 2;
            const size = Math.min(cellWidth, cellHeight) * 0.4;
            
            ctx.beginPath();
            
            if (Math.random() > 0.5) {
                // Circle
                ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
            } else {
                // Star
                ctx.moveTo(centerX, centerY - size);
                for (let i = 1; i <= 5; i++) {
                    const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
                    ctx.lineTo(
                        centerX + Math.cos(angle) * size,
                        centerY + Math.sin(angle) * size
                    );
                }
                ctx.closePath();
            }
            
            ctx.fillStyle = popPalette[Math.floor(Math.random() * popPalette.length)];
            ctx.fill();
        }
    }
}

function generateVanGoghStyle() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = ['#2C3E50', '#E74C3C', '#F39C12', '#27AE60', '#3498DB', '#F1C40F'];
    
    // Create swirling, expressive strokes
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = palette[0];
    ctx.fillRect(0, 0, width, height);
    
    // Draw swirling strokes
    const numStrokes = 200 + complexity * 0.3;
    
    for (let i = 0; i < numStrokes; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const length = 10 + Math.random() * 30 * (complexity / 100);
        const curl = 0.5 + Math.random() * 2;
        const color = palette[1 + Math.floor(Math.random() * (palette.length - 1))];
        const width = 1 + Math.random() * 4 * (complexity / 100);
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Create a swirling path
        for (let j = 1; j <= 10; j++) {
            const t = j / 10;
            const angle = t * Math.PI * 2 * curl;
            const segmentLength = length * t / 10;
            
            ctx.lineTo(
                x + Math.cos(angle) * segmentLength,
                y + Math.sin(angle) * segmentLength
            );
        }
        
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

function generateRenaissanceStyle() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = ['#8B4513', '#D2B48C', '#F5DEB3', '#A0522D', '#CD853F', '#DAA520'];
    
    // Create a classical, balanced composition
    ctx.clearRect(0, 0, width, height);
    
    // Background with gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(1, palette[1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw a central focal point (simulating a classical subject)
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = palette[2];
    ctx.fill();
    
    // Add decorative elements
    const numElements = 20 + complexity * 0.5;
    
    for (let i = 0; i < numElements; i++) {
        const angle = i * Math.PI * 2 / numElements;
        const distance = radius * 1.2;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const size = 5 + Math.random() * 15 * (complexity / 100);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = palette[3 + Math.floor(Math.random() * 2)];
        ctx.fill();
    }
}

function generateJapaneseStyle() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = ['#FFFFFF', '#000000', '#C33B32', '#006E63', '#F8C3CD'];
    
    // Minimalist Japanese aesthetic
    ctx.clearRect(0, 0, width, height);
    
    // Background
    ctx.fillStyle = palette[0];
    ctx.fillRect(0, 0, width, height);
    
    // Draw a few simple, elegant elements
    const numElements = 3 + Math.floor(complexity / 30);
    
    for (let i = 0; i < numElements; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const elementType = Math.floor(Math.random() * 3);
        
        ctx.strokeStyle = palette[1];
        ctx.lineWidth = 2 + Math.random() * 3 * (complexity / 100);
        
        if (elementType === 0) {
            // Bamboo stalk
            const segments = 3 + Math.floor(Math.random() * 4);
            const segmentHeight = 20 + Math.random() * 30 * (complexity / 100);
            
            for (let s = 0; s < segments; s++) {
                const segmentY = y + s * segmentHeight;
                ctx.beginPath();
                ctx.moveTo(x, segmentY);
                ctx.lineTo(x, segmentY + segmentHeight);
                ctx.stroke();
                
                // Add a small branch
                if (s > 0 && Math.random() > 0.7) {
                    const branchX = x + (Math.random() > 0.5 ? 10 : -10);
                    ctx.beginPath();
                    ctx.moveTo(x, segmentY + segmentHeight/2);
                    ctx.lineTo(branchX, segmentY + segmentHeight/2);
                    ctx.stroke();
                }
            }
        } else if (elementType === 1) {
            // Cherry blossom
            ctx.beginPath();
            ctx.arc(x, y, 15 + Math.random() * 20 * (complexity / 100), 0, Math.PI * 2);
            ctx.stroke();
            
            // Petals
            const petals = 5;
            for (let p = 0; p < petals; p++) {
                const angle = p * Math.PI * 2 / petals;
                const petalLength = 10 + Math.random() * 15 * (complexity / 100);
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(
                    x + Math.cos(angle) * petalLength,
                    y + Math.sin(angle) * petalLength
                );
                ctx.stroke();
            }
        } else {
            // Kanji-like character (simplified)
            const strokes = 3 + Math.floor(Math.random() * 4);
            
            for (let s = 0; s < strokes; s++) {
                const startX = x + Math.random() * 40 - 20;
                const startY = y + Math.random() * 40 - 20;
                const endX = startX + Math.random() * 40 - 20;
                const endY = startY + Math.random() * 40 - 20;
                
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
        }
    }
}

function generateSurrealism() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    // Create a dreamlike, surreal composition
    ctx.clearRect(0, 0, width, height);
    
    // Background with gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, palette[0]);
    gradient.addColorStop(1, palette[palette.length - 1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw floating, disconnected elements
    const numElements = 10 + complexity * 0.5;
    
    for (let i = 0; i < numElements; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 10 + Math.random() * 40 * (complexity / 100);
        const elementType = Math.floor(Math.random() * 5);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * Math.PI * 2);
        
        switch (elementType) {
            case 0:
                // Floating clock
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.strokeStyle = palette[2];
                ctx.lineWidth = 3;
                ctx.stroke();
                
                // Clock hands
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -size * 0.7);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(size * 0.4, 0);
                ctx.stroke();
                break;
                
            case 1:
                // Melting object
                ctx.beginPath();
                ctx.moveTo(-size/2, -size/2);
                ctx.lineTo(size/2, -size/2);
                
                // Melting drips
                for (let d = 0; d < 3; d++) {
                    const dripX = -size/2 + (d + 0.5) * size/3;
                    ctx.lineTo(dripX, -size/2 + size/4);
                    ctx.lineTo(dripX - size/10, -size/2 + size/2);
                    ctx.lineTo(dripX + size/10, -size/2 + size/2);
                    ctx.lineTo(dripX, -size/2 + size/4);
                }
                
                ctx.lineTo(size/2, -size/2);
                ctx.lineTo(size/2, size/2);
                ctx.lineTo(-size/2, size/2);
                ctx.closePath();
                ctx.fillStyle = palette[3];
                ctx.fill();
                break;
                
            case 2:
                // Eye
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.strokeStyle = palette[4];
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(0, 0, size/2, 0, Math.PI * 2);
                ctx.fillStyle = palette[1];
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(0, 0, size/4, 0, Math.PI * 2);
                ctx.fillStyle = palette[0];
                ctx.fill();
                break;
                
            case 3:
                // Floating island
                ctx.beginPath();
                ctx.ellipse(0, 0, size, size/2, 0, 0, Math.PI * 2);
                ctx.fillStyle = palette[5];
                ctx.fill();
                
                // Little tree on top
                ctx.beginPath();
                ctx.moveTo(0, -size/2);
                ctx.lineTo(-size/4, -size);
                ctx.lineTo(size/4, -size);
                ctx.closePath();
                ctx.fillStyle = palette[2];
                ctx.fill();
                break;
                
            case 4:
                // Lobster telephone (simplified)
                ctx.beginPath();
                // Telephone base
                ctx.rect(-size/2, -size/4, size, size/2);
                ctx.fillStyle = palette[3];
                ctx.fill();
                
                // Receiver
                ctx.beginPath();
                ctx.arc(size/2 + size/4, 0, size/4, 0, Math.PI * 2);
                ctx.fillStyle = palette[4];
                ctx.fill();
                
                // Lobster
                ctx.beginPath();
                for (let s = 0; s < 5; s++) {
                    const segmentX = -size/2 + s * size/5;
                    ctx.arc(segmentX, -size/4, size/10, 0, Math.PI * 2);
                }
                ctx.fillStyle = palette[1];
                ctx.fill();
                break;
        }
        
        ctx.restore();
    }
}

function generatePixelArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    // Create a grid of pixels
    const pixelSize = Math.max(1, Math.floor(10 - complexity * 0.05));
    const cols = Math.floor(width / pixelSize);
    const rows = Math.floor(height / pixelSize);
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            // Determine if we should draw a pixel based on density
            if (Math.random() < density / 100) {
                const color = palette[Math.floor(Math.random() * palette.length)];
                ctx.fillStyle = color;
                ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

// Additional advanced styles

function generateFractalArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw fractal patterns
    const iterations = 100 + complexity * 2;
    
    for (let i = 0; i < iterations; i++) {
        const x = width / 2;
        const y = height / 2;
        const size = Math.min(width, height) * 0.4;
        
        drawFractal(x, y, size, palette, 0);
    }
}

function drawFractal(x, y, size, palette, depth) {
    if (size < 2 || depth > 8) return;
    
    const color = palette[depth % palette.length];
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.stroke();
    
    const newSize = size * 0.7;
    
    // Recursive calls for fractal pattern
    drawFractal(x + size * 0.5, y, newSize, palette, depth + 1);
    drawFractal(x - size * 0.5, y, newSize, palette, depth + 1);
    drawFractal(x, y + size * 0.5, newSize, palette, depth + 1);
    drawFractal(x, y - size * 0.5, newSize, palette, depth + 1);
}

function generateFluidArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    ctx.clearRect(0, 0, width, height);
    
    // Create fluid-like patterns
    const numDrops = 5 + complexity * 0.2;
    
    for (let i = 0; i < numDrops; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 20 + Math.random() * 80 * (complexity / 100);
        const color = palette[Math.floor(Math.random() * palette.length)];
        
        drawFluidDrop(x, y, size, color);
    }
}

function drawFluidDrop(x, y, size, color) {
    ctx.save();
    ctx.translate(x, y);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    // Create fluid-like shape
    for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const radius = size * (0.8 + Math.random() * 0.4);
        const xPos = Math.cos(angle) * radius;
        const yPos = Math.sin(angle) * radius;
        
        ctx.lineTo(xPos, yPos);
    }
    
    ctx.closePath();
    
    // Create gradient fill
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    gradient.addColorStop(0, adjustColorAlpha(color, 0.8));
    gradient.addColorStop(1, adjustColorAlpha(color, 0.2));
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    ctx.restore();
}

function generateGeometricArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = colorPalette;
    
    ctx.clearRect(0, 0, width, height);
    
    // Draw geometric patterns
    const shapes = 10 + complexity * 0.5;
    
    for (let i = 0; i < shapes; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 10 + Math.random() * 60 * (complexity / 100);
        const sides = 3 + Math.floor(Math.random() * 5); // 3-7 sides
        const color = palette[Math.floor(Math.random() * palette.length)];
        const rotation = Math.random() * Math.PI * 2;
        
        drawGeometricShape(x, y, size, sides, color, rotation);
    }
}

function drawGeometricShape(x, y, size, sides, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    ctx.beginPath();
    ctx.moveTo(size, 0);
    
    for (let i = 1; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        ctx.lineTo(
            Math.cos(angle) * size,
            Math.sin(angle) * size
        );
    }
    
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.restore();
}

function generateCyberpunkArt() {
    const width = canvas.width;
    const height = canvas.height;
    const palette = ['#FF00FF', '#00FFFF', '#FFFF00', '#000000', '#FFFFFF'];
    
    ctx.clearRect(0, 0, width, height);
    
    // Dark background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    
    // Grid lines
    ctx.strokeStyle = palette[0];
    ctx.lineWidth = 1;
    
    const gridSize = 20 + complexity * 0.2;
    
    for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Neon elements
    const numElements = 10 + complexity * 0.3;
    
    for (let i = 0; i < numElements; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 5 + Math.random() * 30 * (complexity / 100);
        const color = palette[Math.floor(Math.random() * 3)]; // First 3 colors are neon
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(x, y, size + 5, 0, Math.PI * 2);
        ctx.strokeStyle = adjustColorAlpha(color, 0.3);
        ctx.lineWidth = 10;
        ctx.stroke();
    }
}

// Utility methods

function createGradientBackground() {
    const width = canvas.width;
    const height = canvas.height;
    
    gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colorPalette[0]);
    gradient.addColorStop(1, colorPalette[colorPalette.length - 1]);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function adjustColorAlpha(color, alpha) {
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function addParticles(count) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: colorPalette[Math.floor(Math.random() * colorPalette.length)]
        });
    }
}

function animate() {
    if (!animating) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Redraw base art
    generateArt();
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
    
    // Continue animation
    animationId = requestAnimationFrame(() => animate());
}

function startAnimation() {
    if (animating) return;
    
    animating = true;
    animate();
}

function stopAnimation() {
    if (!animating) return;
    
    animating = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Method to save the artwork as an image
function saveArtwork() {
    const link = document.createElement('a');
    link.download = 'artwork.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Method to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
    if (animating) {
        stopAnimation();
    }
}

// Initialize the art generator when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initArtGenerator('artCanvas');
});

// Export all functions
export {generateAbstractArt,
    generateImpressionistArt, generatePointillismArt, generateCubismArt, generatePopArt, generateVanGoghStyle,
    generateRenaissanceStyle, generateJapaneseStyle, generateSurrealism, generatePixelArt, generateFractalArt,
};

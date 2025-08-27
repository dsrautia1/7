// Advanced Logo Generator with enhanced features
const elements = {
    canvas: document.getElementById('logoCanvas'),
    ctx: document.getElementById('logoCanvas').getContext('2d'),
    resolution: document.getElementById('resolution'),
    logoText: document.getElementById('logoText'),
    logoIndustry: document.getElementById('logoIndustry'),
    logoStyle: document.getElementById('logoStyle'),
    logoComplexity: document.getElementById('logoComplexity'),
    progressFill: document.querySelector('.progress-fill'),
    timerValue: document.querySelector('.timer-value')
};

let imageData = null;
const stateHistory = [];
let currentState = -1;

// Enhanced color palette generator
function getColorPalette() {
    const palettes = {
        tech: ['#0a192f', '#172a45', '#64ffda', '#8892b0', '#e6f1ff'],
        food: ['#f8f4e3', '#d34f73', '#ffa630', '#588157', '#3a5a40'],
        fashion: ['#f8f4ff', '#d4c1ec', '#9f9fed', '#736ced', '#3e2f5b'],
        health: ['#e0f2e9', '#a6d4c9', '#74b49b', '#5c8d89', '#1c3738'],
        abstract: ['#f4f1de', '#e07a5f', '#3d405b', '#81b29a', '#f2cc8f']
    };
    
    const industry = elements.logoIndustry.value;
    return palettes[industry] || palettes.abstract;
}

// Enhanced tech logo generator with circuit board effects
function generateTechLogo(x, y, size, text, style, complexity, palette) {
    elements.ctx.save();
    
    // Background glow effect
    if (style !== 'minimal') {
        const gradient = elements.ctx.createRadialGradient(x, y, size * 0.1, x, y, size * 0.8);
        gradient.addColorStop(0, palette[2] + '60');
        gradient.addColorStop(1, 'transparent');
        elements.ctx.fillStyle = gradient;
        elements.ctx.fillRect(x - size * 0.8, y - size * 0.8, size * 1.6, size * 1.6);
    }
    
    // Circuit board grid
    elements.ctx.strokeStyle = palette[2] + '40';
    elements.ctx.lineWidth = 1;
    const gridSize = size / 10;
    
    for (let i = -5; i <= 5; i++) {
        elements.ctx.beginPath();
        elements.ctx.moveTo(x - size * 0.5, y + i * gridSize);
        elements.ctx.lineTo(x + size * 0.5, y + i * gridSize);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(x + i * gridSize, y - size * 0.5);
        elements.ctx.lineTo(x + i * gridSize, y + size * 0.5);
        elements.ctx.stroke();
    }
    
    // Circuit paths with animated effect
    elements.ctx.strokeStyle = palette[2];
    elements.ctx.lineWidth = 2;
    elements.ctx.lineCap = 'round';
    
    const paths = complexity + 2;
    for (let i = 0; i < paths; i++) {
        const angle = (i * Math.PI * 2) / paths;
        const radius = size * (0.2 + 0.3 * Math.random());
        
        elements.ctx.beginPath();
        // Create circuit-like path with right angles
        const points = [];
        const segments = 4 + Math.floor(Math.random() * 4);
        
        for (let s = 0; s <= segments; s++) {
            const segmentAngle = angle + (s * Math.PI * 0.25);
            const segmentRadius = radius * (0.8 + 0.4 * Math.random());
            const px = x + Math.cos(segmentAngle) * segmentRadius;
            const py = y + Math.sin(segmentAngle) * segmentRadius;
            
            if (s === 0) elements.ctx.moveTo(px, py);
            else elements.ctx.lineTo(px, py);
            
            points.push({x: px, y: py});
        }
        
        elements.ctx.stroke();
        
        // Connection points with glow effect
        for (const point of points) {
            elements.ctx.beginPath();
            elements.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            elements.ctx.fillStyle = palette[3];
            elements.ctx.fill();
            
            // Glow effect
            if (style !== 'minimal') {
                const gradient = elements.ctx.createRadialGradient(
                    point.x, point.y, 0, point.x, point.y, 8
                );
                gradient.addColorStop(0, palette[2] + 'CC');
                gradient.addColorStop(1, palette[2] + '00');
                elements.ctx.fillStyle = gradient;
                elements.ctx.fillRect(point.x - 8, point.y - 8, 16, 16);
            }
        }
    }
    
    // Central tech icon (microchip style)
    elements.ctx.fillStyle = palette[4];
    const chipSize = size * 0.2;
    elements.ctx.fillRect(x - chipSize/2, y - chipSize/2, chipSize, chipSize);
    
    // Chip details
    elements.ctx.strokeStyle = palette[2];
    elements.ctx.lineWidth = 1;
    elements.ctx.strokeRect(x - chipSize/2, y - chipSize/2, chipSize, chipSize);
    
    // Chip pins
    const pinLength = chipSize * 0.15;
    for (let i = 0; i < 4; i++) {
        const side = i;
        for (let p = 0; p < 5; p++) {
            let px, py, dx, dy;
            
            if (side === 0) { // Top
                px = x - chipSize/2 + (p + 0.5) * (chipSize/5);
                py = y - chipSize/2;
                dx = 0;
                dy = -pinLength;
            } else if (side === 1) { // Right
                px = x + chipSize/2;
                py = y - chipSize/2 + (p + 0.5) * (chipSize/5);
                dx = pinLength;
                dy = 0;
            } else if (side === 2) { // Bottom
                px = x - chipSize/2 + (p + 0.5) * (chipSize/5);
                py = y + chipSize/2;
                dx = 0;
                dy = pinLength;
            } else { // Left
                px = x - chipSize/2;
                py = y - chipSize/2 + (p + 0.5) * (chipSize/5);
                dx = -pinLength;
                dy = 0;
            }
            
            elements.ctx.beginPath();
            elements.ctx.moveTo(px, py);
            elements.ctx.lineTo(px + dx, py + dy);
            elements.ctx.stroke();
        }
    }
    
    // Text with tech font style
    elements.ctx.font = `bold ${size * 0.12}px 'Courier New', monospace`;
    elements.ctx.fillStyle = palette[4];
    elements.ctx.textAlign = 'center';
    elements.ctx.textBaseline = 'middle';
    
    // Text background for better readability
    if (style !== 'minimal') {
        elements.ctx.fillStyle = palette[0] + 'CC';
        const textWidth = elements.ctx.measureText(text).width;
        elements.ctx.fillRect(
            x - textWidth/2 - size * 0.05, 
            y + size * 0.35, 
            textWidth + size * 0.1, 
            size * 0.15
        );
    }
    
    elements.ctx.fillStyle = palette[4];
    elements.ctx.fillText(text, x, y + size * 0.42);
    
    elements.ctx.restore();
}

// Enhanced food logo generator
function generateFoodLogo(x, y, size, text, style, complexity, palette) {
    elements.ctx.save();
    
    // Plate with gradient and shadow
    const plateGradient = elements.ctx.createRadialGradient(
        x, y, size * 0.05, x, y, size * 0.4
    );
    plateGradient.addColorStop(0, palette[1]);
    plateGradient.addColorStop(1, palette[0]);
    
    elements.ctx.beginPath();
    elements.ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    elements.ctx.fillStyle = plateGradient;
    elements.ctx.fill();
    
    // Plate rim
    elements.ctx.strokeStyle = palette[2];
    elements.ctx.lineWidth = size * 0.02;
    elements.ctx.stroke();
    
    // Food item (varies by complexity)
    if (complexity >= 3) {
        // Multiple food items
        const foodItems = Math.min(complexity - 2, 5);
        for (let i = 0; i < foodItems; i++) {
            const angle = (i * Math.PI * 2) / foodItems;
            const foodX = x + Math.cos(angle) * size * 0.2;
            const foodY = y + Math.sin(angle) * size * 0.2;
            const foodSize = size * (0.1 + 0.05 * Math.random());
            
            // Different food types
            if (i % 3 === 0) {
                // Vegetable
                elements.ctx.fillStyle = palette[3];
                elements.ctx.beginPath();
                elements.ctx.ellipse(foodX, foodY, foodSize, foodSize * 0.7, angle, 0, Math.PI * 2);
                elements.ctx.fill();
                
                // Leaf
                elements.ctx.fillStyle = palette[4];
                elements.ctx.beginPath();
                elements.ctx.ellipse(foodX - foodSize * 0.5, foodY, foodSize * 0.4, foodSize * 0.3, -Math.PI/4, 0, Math.PI * 2);
                elements.ctx.fill();
            } else if (i % 3 === 1) {
                // Meat
                elements.ctx.fillStyle = palette[2];
                elements.ctx.beginPath();
                elements.ctx.arc(foodX, foodY, foodSize, 0, Math.PI * 2);
                elements.ctx.fill();
                
                // Grill marks
                elements.ctx.strokeStyle = palette[0];
                elements.ctx.lineWidth = 1;
                elements.ctx.beginPath();
                elements.ctx.moveTo(foodX - foodSize * 0.7, foodY);
                elements.ctx.lineTo(foodX + foodSize * 0.7, foodY);
                elements.ctx.stroke();
            } else {
                // Pasta
                elements.ctx.fillStyle = palette[1];
                for (let j = 0; j < 5; j++) {
                    const pastaAngle = j * Math.PI * 0.4;
                    const pastaX = foodX + Math.cos(pastaAngle) * foodSize * 0.5;
                    const pastaY = foodY + Math.sin(pastaAngle) * foodSize * 0.5;
                    
                    elements.ctx.beginPath();
                    elements.ctx.arc(pastaX, pastaY, foodSize * 0.3, 0, Math.PI * 2);
                    elements.ctx.fill();
                }
            }
        }
    } else {
        // Single main food item (burger)
        elements.ctx.fillStyle = palette[3]; // Bun top
        elements.ctx.beginPath();
        elements.ctx.ellipse(x, y - size * 0.05, size * 0.25, size * 0.1, 0, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.fillStyle = palette[2]; // Patty
        elements.ctx.beginPath();
        elements.ctx.ellipse(x, y, size * 0.23, size * 0.08, 0, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.fillStyle = palette[3]; // Bun bottom
        elements.ctx.beginPath();
        elements.ctx.ellipse(x, y + size * 0.05, size * 0.25, size * 0.1, 0, 0, Math.PI * 2);
        elements.ctx.fill();
        
        // Sesame seeds
        elements.ctx.fillStyle = palette[4];
        for (let i = 0; i < 5; i++) {
            const seedX = x - size * 0.15 + i * size * 0.075;
            const seedY = y - size * 0.1 + Math.random() * size * 0.05;
            elements.ctx.beginPath();
            elements.ctx.arc(seedX, seedY, size * 0.02, 0, Math.PI * 2);
            elements.ctx.fill();
        }
    }
    
    // Utensils with improved design
    elements.ctx.strokeStyle = palette[4];
    elements.ctx.lineWidth = size * 0.015;
    elements.ctx.lineCap = 'round';
    
    // Fork
    elements.ctx.save();
    elements.ctx.translate(x - size * 0.3, y);
    elements.ctx.rotate(-Math.PI/8);
    
    elements.ctx.beginPath();
    elements.ctx.moveTo(0, -size * 0.3);
    elements.ctx.lineTo(0, size * 0.3);
    elements.ctx.stroke();
    
    for (let i = 0; i < 3; i++) {
        const tineY = -size * 0.3 + i * size * 0.1;
        elements.ctx.beginPath();
        elements.ctx.moveTo(0, tineY);
        elements.ctx.lineTo(-size * 0.1, tineY + size * 0.05);
        elements.ctx.stroke();
    }
    elements.ctx.restore();
    
    // Knife
    elements.ctx.save();
    elements.ctx.translate(x + size * 0.3, y);
    elements.ctx.rotate(Math.PI/8);
    
    elements.ctx.beginPath();
    elements.ctx.moveTo(0, -size * 0.3);
    elements.ctx.lineTo(0, size * 0.3);
    elements.ctx.stroke();
    
    elements.ctx.beginPath();
    elements.ctx.moveTo(0, -size * 0.3);
    elements.ctx.lineTo(size * 0.1, -size * 0.2);
    elements.ctx.stroke();
    elements.ctx.restore();
    
    // Text with food-themed styling
    elements.ctx.font = `italic ${size * 0.1}px 'Georgia', serif`;
    elements.ctx.fillStyle = palette[4];
    elements.ctx.textAlign = 'center';
    
    // Text background for readability
    if (style !== 'minimal') {
        const textWidth = elements.ctx.measureText(text).width;
        elements.ctx.fillStyle = palette[0] + 'CC';
        elements.ctx.fillRect(
            x - textWidth/2 - size * 0.05, 
            y + size * 0.5, 
            textWidth + size * 0.1, 
            size * 0.12
        );
    }
    
    elements.ctx.fillStyle = palette[4];
    elements.ctx.fillText(text, x, y + size * 0.55);
    
    elements.ctx.restore();
}

// Enhanced fashion logo generator
function generateFashionLogo(x, y, size, text, style, complexity, palette) {
    elements.ctx.save();
    
    // Background pattern based on style
    if (style === 'gradient') {
        const gradient = elements.ctx.createLinearGradient(
            x - size * 0.6, y - size * 0.6, x + size * 0.6, y + size * 0.6
        );
        gradient.addColorStop(0, palette[0]);
        gradient.addColorStop(0.5, palette[1]);
        gradient.addColorStop(1, palette[2]);
        elements.ctx.fillStyle = gradient;
        elements.ctx.fillRect(x - size * 0.6, y - size * 0.6, size * 1.2, size * 1.2);
    }
    
    // Hanger shape
    elements.ctx.strokeStyle = palette[3];
    elements.ctx.lineWidth = size * 0.02;
    elements.ctx.lineCap = 'round';
    
    elements.ctx.beginPath();
    elements.ctx.moveTo(x - size * 0.3, y - size * 0.1);
    elements.ctx.lineTo(x, y - size * 0.3);
    elements.ctx.lineTo(x + size * 0.3, y - size * 0.1);
    elements.ctx.stroke();
    
    elements.ctx.beginPath();
    elements.ctx.arc(x, y - size * 0.1, size * 0.05, 0, Math.PI * 2);
    elements.ctx.stroke();
    
    // Clothing item (changes with complexity)
    if (complexity <= 2) {
        // Simple dress
        elements.ctx.fillStyle = palette[2];
        elements.ctx.beginPath();
        elements.ctx.moveTo(x - size * 0.2, y - size * 0.1);
        elements.ctx.lineTo(x - size * 0.3, y + size * 0.3);
        elements.ctx.lineTo(x + size * 0.3, y + size * 0.3);
        elements.ctx.lineTo(x + size * 0.2, y - size * 0.1);
        elements.ctx.fill();
    } else if (complexity <= 4) {
        // Detailed dress with pattern
        elements.ctx.fillStyle = palette[2];
        elements.ctx.beginPath();
        elements.ctx.moveTo(x - size * 0.2, y - size * 0.1);
        elements.ctx.bezierCurveTo(
            x - size * 0.25, y + size * 0.1,
            x - size * 0.35, y + size * 0.3,
            x - size * 0.3, y + size * 0.35
        );
        elements.ctx.lineTo(x + size * 0.3, y + size * 0.35);
        elements.ctx.bezierCurveTo(
            x + size * 0.35, y + size * 0.3,
            x + size * 0.25, y + size * 0.1,
            x + size * 0.2, y - size * 0.1
        );
        elements.ctx.fill();
        
        // Pattern
        elements.ctx.strokeStyle = palette[3];
        elements.ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const patternY = y - size * 0.05 + i * size * 0.08;
            elements.ctx.beginPath();
            elements.ctx.moveTo(x - size * 0.2 + i * size * 0.02, patternY);
            elements.ctx.lineTo(x + size * 0.2 - i * size * 0.02, patternY);
            elements.ctx.stroke();
        }
    } else {
        // Complex outfit with multiple items
        // Dress
        elements.ctx.fillStyle = palette[2];
        elements.ctx.beginPath();
        elements.ctx.moveTo(x - size * 0.2, y - size * 0.1);
        elements.ctx.bezierCurveTo(
            x - size * 0.25, y + size * 0.1,
            x - size * 0.35, y + size * 0.3,
            x - size * 0.3, y + size * 0.35
        );
        elements.ctx.lineTo(x + size * 0.3, y + size * 0.35);
        elements.ctx.bezierCurveTo(
            x + size * 0.35, y + size * 0.3,
            x + size * 0.25, y + size * 0.1,
            x + size * 0.2, y - size * 0.1
        );
        elements.ctx.fill();
        
        // Belt
        elements.ctx.fillStyle = palette[3];
        elements.ctx.fillRect(x - size * 0.25, y + size * 0.1, size * 0.5, size * 0.05);
        
        // Accessories
        elements.ctx.fillStyle = palette[4];
        // Necklace
        elements.ctx.beginPath();
        elements.ctx.arc(x, y + size * 0.05, size * 0.08, 0, Math.PI);
        elements.ctx.stroke();
        
        // Pendant
        elements.ctx.beginPath();
        elements.ctx.moveTo(x, y + size * 0.13);
        elements.ctx.lineTo(x - size * 0.03, y + size * 0.18);
        elements.ctx.lineTo(x + size * 0.03, y + size * 0.18);
        elements.ctx.closePath();
        elements.ctx.fill();
    }
    
    // Text with elegant font
    elements.ctx.font = `${size * 0.12}px 'Playfair Display', serif`;
    elements.ctx.fillStyle = palette[4];
    elements.ctx.textAlign = 'center';
    
    // Text shadow for depth
    if (style !== 'minimal') {
        elements.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        elements.ctx.shadowBlur = 4;
        elements.ctx.shadowOffsetX = 2;
        elements.ctx.shadowOffsetY = 2;
    }
    
    elements.ctx.fillText(text, x, y + size * 0.5);
    
    // Reset shadow
    elements.ctx.shadowColor = 'transparent';
    elements.ctx.shadowBlur = 0;
    elements.ctx.shadowOffsetX = 0;
    elements.ctx.shadowOffsetY = 0;
    
    elements.ctx.restore();
}

// Enhanced health logo generator
function generateHealthLogo(x, y, size, text, style, complexity, palette) {
    elements.ctx.save();
    
    // Background with healing symbol
    if (style !== 'minimal') {
        const symbolGradient = elements.ctx.createRadialGradient(
            x, y, size * 0.1, x, y, size * 0.5
        );
        symbolGradient.addColorStop(0, palette[2] + '60');
        symbolGradient.addColorStop(1, 'transparent');
        elements.ctx.fillStyle = symbolGradient;
        elements.ctx.fillRect(x - size * 0.5, y - size * 0.5, size, size);
    }
    
    // Medical cross
    elements.ctx.fillStyle = palette[3];
    
    // Vertical part
    elements.ctx.fillRect(
        x - size * 0.05, 
        y - size * 0.3, 
        size * 0.1, 
        size * 0.6
    );
    
    // Horizontal part
    elements.ctx.fillRect(
        x - size * 0.3, 
        y - size * 0.05, 
        size * 0.6, 
        size * 0.1
    );
    
    // Heart symbol (if complexity is high)
    if (complexity >= 3) {
        elements.ctx.fillStyle = palette[2];
        elements.ctx.beginPath();
        const heartSize = size * 0.2;
        elements.ctx.moveTo(x, y - heartSize * 0.5);
        elements.ctx.bezierCurveTo(
            x - heartSize, y - heartSize,
            x - heartSize * 1.5, y,
            x, y + heartSize
        );
        elements.ctx.bezierCurveTo(
            x + heartSize * 1.5, y,
            x + heartSize, y - heartSize,
            x, y - heartSize * 0.5
        );
        elements.ctx.fill();
    }
    
    // ECG line (if complexity is high)
    if (complexity >= 4) {
        elements.ctx.strokeStyle = palette[4];
        elements.ctx.lineWidth = size * 0.01;
        elements.ctx.beginPath();
        
        const startX = x - size * 0.4;
        const startY = y - size * 0.1;
        elements.ctx.moveTo(startX, startY);
        
        // Create ECG pattern
        for (let i = 0; i < 20; i++) {
            const segmentX = startX + i * size * 0.04;
            
            if (i === 5) {
                // Heartbeat spike
                elements.ctx.lineTo(segmentX, startY - size * 0.1);
                elements.ctx.lineTo(segmentX + size * 0.02, startY);
            } else {
                elements.ctx.lineTo(segmentX, startY);
            }
        }
        
        elements.ctx.stroke();
    }
    
    // Stethoscope (if complexity is high)
    if (complexity >= 5) {
        elements.ctx.strokeStyle = palette[4];
        elements.ctx.lineWidth = size * 0.015;
        
        // Earpieces
        elements.ctx.beginPath();
        elements.ctx.arc(x - size * 0.25, y - size * 0.25, size * 0.03, 0, Math.PI * 2);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.arc(x + size * 0.25, y - size * 0.25, size * 0.03, 0, Math.PI * 2);
        elements.ctx.stroke();
        
        // Tube
        elements.ctx.beginPath();
        elements.ctx.moveTo(x - size * 0.25, y - size * 0.22);
        elements.ctx.bezierCurveTo(
            x - size * 0.15, y - size * 0.35,
            x + size * 0.15, y - size * 0.35,
            x + size * 0.25, y - size * 0.22
        );
        elements.ctx.stroke();
        
        // Chestpiece
        elements.ctx.beginPath();
        elements.ctx.arc(x, y + size * 0.1, size * 0.05, 0, Math.PI * 2);
        elements.ctx.stroke();
    }
    
    // Text with clean, medical font
    elements.ctx.font = `bold ${size * 0.12}px 'Arial', sans-serif`;
    elements.ctx.fillStyle = palette[4];
    elements.ctx.textAlign = 'center';
    
    // Text background for readability
    if (style !== 'minimal') {
        const textWidth = elements.ctx.measureText(text).width;
        elements.ctx.fillStyle = palette[0] + 'CC';
        elements.ctx.fillRect(
            x - textWidth/2 - size * 0.05, 
            y + size * 0.4, 
            textWidth + size * 0.1, 
            size * 0.14
        );
    }
    
    elements.ctx.fillStyle = palette[4];
    elements.ctx.fillText(text, x, y + size * 0.48);
    
    elements.ctx.restore();
}

// Enhanced abstract logo generator
function generateAbstractLogo(x, y, size, text, style, complexity, palette) {
    elements.ctx.save();
    
    // Create a unique abstract design based on complexity
    if (complexity === 1) {
        // Simple circle design
        elements.ctx.fillStyle = palette[1];
        elements.ctx.beginPath();
        elements.ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.strokeStyle = palette[2];
        elements.ctx.lineWidth = size * 0.02;
        elements.ctx.stroke();
    } else if (complexity === 2) {
        // Two overlapping shapes
        elements.ctx.fillStyle = palette[1];
        elements.ctx.beginPath();
        elements.ctx.arc(x - size * 0.1, y, size * 0.3, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.fillStyle = palette[2];
        elements.ctx.beginPath();
        elements.ctx.arc(x + size * 0.1, y, size * 0.3, 0, Math.PI * 2);
        elements.ctx.fill();
    } else if (complexity === 3) {
        // Geometric pattern
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const tx = x + Math.cos(angle) * size * 0.2;
            const ty = y + Math.sin(angle) * size * 0.2;
            
            elements.ctx.fillStyle = palette[i % palette.length];
            elements.ctx.beginPath();
            elements.ctx.moveTo(tx, ty);
            for (let j = 0; j < 6; j++) {
                const vertexAngle = angle + (j * Math.PI * 2) / 6;
                const vx = tx + Math.cos(vertexAngle) * size * 0.15;
                const vy = ty + Math.sin(vertexAngle) * size * 0.15;
                elements.ctx.lineTo(vx, vy);
            }
            elements.ctx.closePath();
            elements.ctx.fill();
        }
    } else if (complexity === 4) {
        // Spiral design
        elements.ctx.strokeStyle = palette[2];
        elements.ctx.lineWidth = size * 0.01;
        elements.ctx.beginPath();
        
        for (let i = 0; i < 100; i++) {
            const angle = i * 0.1;
            const radius = size * 0.05 + (i * size * 0.004);
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            
            if (i === 0) elements.ctx.moveTo(px, py);
            else elements.ctx.lineTo(px, py);
        }
        elements.ctx.stroke();
        
        // Dots along the spiral
        for (let i = 0; i < 20; i++) {
            const angle = i * 0.5;
            const radius = size * 0.05 + (i * size * 0.02);
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            
            elements.ctx.fillStyle = palette[i % palette.length];
            elements.ctx.beginPath();
            elements.ctx.arc(px, py, size * 0.02, 0, Math.PI * 2);
            elements.ctx.fill();
        }
    } else {
        // Complex abstract design with multiple elements
        // Central shape
        elements.ctx.fillStyle = palette[1];
        elements.ctx.beginPath();
        elements.ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
        elements.ctx.fill();
        
        // Surrounding elements
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            const distance = size * 0.5;
            const ex = x + Math.cos(angle) * distance;
            const ey = y + Math.sin(angle) * distance;
            
            elements.ctx.fillStyle = palette[(i + 2) % palette.length];
            
            if (i % 2 === 0) {
                // Circle
                elements.ctx.beginPath();
                elements.ctx.arc(ex, ey, size * 0.1, 0, Math.PI * 2);
                elements.ctx.fill();
            } else {
                // Square
                elements.ctx.fillRect(ex - size * 0.08, ey - size * 0.08, size * 0.16, size * 0.16);
            }
            
            // Connecting line
            elements.ctx.strokeStyle = palette[3];
            elements.ctx.lineWidth = size * 0.01;
            elements.ctx.beginPath();
            elements.ctx.moveTo(x + Math.cos(angle) * size * 0.3, y + Math.sin(angle) * size * 0.3);
            elements.ctx.lineTo(ex, ey);
            elements.ctx.stroke();
        }
    }
    
    // Text with modern font
    elements.ctx.font = `bold ${size * 0.1}px 'Helvetica', sans-serif`;
    elements.ctx.fillStyle = palette[4];
    elements.ctx.textAlign = 'center';
    elements.ctx.fillText(text, x, y + size * 0.45);
    
    elements.ctx.restore();
}

// Main generation function
function generateLogo() {
    const res = parseInt(elements.resolution.value);
    elements.canvas.width = res;
    elements.canvas.height = res;
    
    resetView();
    showGenerationTimer();
    
    const startTime = Date.now();
    
    function generateFrame() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 1000, 1);
        
        elements.progressFill.style.width = `${progress * 100}%`;
        elements.timerValue.textContent = `${Math.ceil(5 - progress * 5)}s`;
        
        if (progress < 1) {
            requestAnimationFrame(generateFrame);
        } else {
            const text = elements.logoText.value || 'LOGO';
            const industry = elements.logoIndustry.value;
            const style = elements.logoStyle.value;
            const complexity = parseInt(elements.logoComplexity.value);
            
            // Generate logo based on parameters
            generateStyledLogo(text, industry, style, complexity);
            
            hideGenerationTimer();
            imageData = elements.ctx.getImageData(0, 0, elements.canvas.width, elements.canvas.height);
            saveState();
        }
    }
    
    requestAnimationFrame(generateFrame);
}

function generateStyledLogo(text, industry, style, complexity) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Background based on style
    if (style === 'minimal') {
        elements.ctx.fillStyle = palette[0];
        elements.ctx.fillRect(0, 0, width, height);
    } else if (style === 'gradient') {
        const gradient = elements.ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, palette[0]);
        gradient.addColorStop(1, palette[1]);
        elements.ctx.fillStyle = gradient;
        elements.ctx.fillRect(0, 0, width, height);
    } else if (style === 'geometric') {
        // Geometric pattern background
        const tileSize = width / 10;
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                elements.ctx.fillStyle = (i + j) % 2 === 0 ? palette[0] : palette[1];
                elements.ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }
    
    const centerX = width / 2;
    const centerY = height / 2;
    const logoSize = Math.min(width, height) * 0.6;
    
    // Industry-specific logo elements
    switch(industry) {
        case 'tech':
            generateTechLogo(centerX, centerY, logoSize, text, style, complexity, palette);
            break;
        case 'food':
            generateFoodLogo(centerX, centerY, logoSize, text, style, complexity, palette);
            break;
        case 'fashion':
            generateFashionLogo(centerX, centerY, logoSize, text, style, complexity, palette);
            break;
        case 'health':
            generateHealthLogo(centerX, centerY, logoSize, text, style, complexity, palette);
            break;
        default:
            generateAbstractLogo(centerX, centerY, logoSize, text, style, complexity, palette);
    }
}

// Utility functions (assumed to be implemented elsewhere)
function resetView() {
    // Implementation depends on your specific UI
}

function showGenerationTimer() {
    // Implementation depends on your specific UI
}

function hideGenerationTimer() {
    // Implementation depends on your specific UI
}

function saveState() {
    // Implementation for undo/redo functionality
}

// Initialize the logo generator
function initLogoGenerator() {
    // Set up event listeners and initial state
    document.getElementById('generateBtn').addEventListener('click', generateLogo);
    
    // Initial generation
    generateLogo();
}

// Start the logo generator when the page loads
window.addEventListener('load', initLogoGenerator);

// At the end of logo.js, replace the current export with:
export {
  generateLogo,initLogoGenerator,
};

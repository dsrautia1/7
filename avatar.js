// Global elements object
const elements = {
    canvas: document.createElement('canvas'),
    ctx: null,
    resolution: { value: 256 },
    avatarStyle: { value: 'geometric' },
    avatarMood: { value: 'neutral' },
    avatarSize: { value: 'medium' },
    avatarFeatures: { value: [] },
    progressFill: { style: {} },
    timerValue: { textContent: '' }
};
elements.ctx = elements.canvas.getContext('2d');
let imageData = null;
let stateHistory = [];
let currentState = -1;
const maxHistoryStates = 10;

// Initialize with external elements if needed
function init(externalElements = null) {
    if (externalElements) {
        Object.assign(elements, externalElements);
    }
}

// Main generation function
function generateAvatar() {
    const res = parseInt(elements.resolution.value);
    elements.canvas.width = res;
    elements.canvas.height = res;
    
    resetView();
    showGenerationTimer();
    
    const startTime = Date.now();
    const style = elements.avatarStyle.value;
    const mood = elements.avatarMood.value;
    const size = elements.avatarSize.value;
    const features = Array.isArray(elements.avatarFeatures.value) ? 
        elements.avatarFeatures.value : 
        elements.avatarFeatures.value.split(',');
    
    // Pre-calculate parameters for performance
    const generationParams = {
        style, mood, size, features,
        palette: getColorPalette(),
        width: res,
        height: res,
        centerX: res / 2,
        centerY: res / 2,
        radius: res * 0.4,
        ctx: elements.ctx
    };

    const generateFrame = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 1000, 1);
        
        if (elements.progressFill && elements.progressFill.style) {
            elements.progressFill.style.width = `${progress * 100}%`;
        }
        
        if (elements.timerValue) {
            elements.timerValue.textContent = `${Math.ceil(6 - progress * 6)}s`;
        }
        
        if (progress < 1) {
            // Show progressive rendering during generation
            if (progress > 0.3) {
                elements.ctx.clearRect(0, 0, generationParams.width, generationParams.height);
                generateStyledAvatar(generationParams, progress);
            }
            requestAnimationFrame(generateFrame);
        } else {
            // Final render
            generateStyledAvatar(generationParams, 1);
            hideGenerationTimer();
            imageData = elements.ctx.getImageData(0, 0, elements.canvas.width, elements.canvas.height);
            saveState();
        }
    };
    
    requestAnimationFrame(generateFrame);
}

// Advanced avatar generation with multiple techniques
function generateStyledAvatar(params, progress = 1) {
    const { style, mood, size, features, palette, width, height, centerX, centerY, radius } = params;
    
    // Clear with a subtle gradient background
    drawBackground(params, progress);
    
    // Apply different generation techniques based on style
    switch(style) {
        case 'geometric':
            generateGeometricAvatar(params, progress);
            break;
        case 'pixelart':
            generatePixelArtAvatar(params, progress);
            break;
        case 'minimalist':
            generateMinimalistAvatar(params, progress);
            break;
        case 'realistic':
            generateRealisticAvatar(params, progress);
            break;
        case 'abstract':
            generateAbstractAvatar(params, progress);
            break;
        case 'cyberpunk':
            generateCyberpunkAvatar(params, progress);
            break;
        case 'watercolor':
            generateWatercolorAvatar(params, progress);
            break;
        case 'lowpoly':
            generateLowPolyAvatar(params, progress);
            break;
        default:
            generateCartoonAvatar(params, progress);
    }
    
    // Apply mood effects
    applyMoodEffects(params, progress);
    
    // Add optional features
    applyFeatures(params, progress);
    
    // Apply size scaling
    applySizeScaling(params, progress);
}

// Different generation techniques
function generateGeometricAvatar(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    // Create geometric face structure
    const shapes = [
        { type: 'circle', x: centerX, y: centerY, radius: radius * 0.9, color: palette.skin },
        { type: 'triangle', points: getTrianglePoints(centerX, centerY - radius * 0.2, radius * 0.3), color: palette.hair },
        { type: 'rect', x: centerX - radius * 0.4, y: centerY, width: radius * 0.2, height: radius * 0.1, color: palette.eyes },
        { type: 'rect', x: centerX + radius * 0.2, y: centerY, width: radius * 0.2, height: radius * 0.1, color: palette.eyes },
        { type: 'arc', x: centerX, y: centerY + radius * 0.3, radius: radius * 0.15, color: palette.mouth }
    ];
    
    shapes.forEach(shape => drawShape(ctx, shape, progress));
}

function generatePixelArtAvatar(params, progress) {
    const { ctx, width, height, palette } = params;
    const pixelSize = Math.max(4, Math.floor(width / 32));
    
    // Generate pixel art face
    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            if (Math.random() < 0.7 * progress) continue;
            
            const dist = Math.sqrt(Math.pow(x - width/2, 2) + Math.pow(y - height/2, 2));
            if (dist > width/2 * 0.9) continue;
            
            let color;
            if (dist < width/2 * 0.3) color = palette.skin;
            else if (dist < width/2 * 0.5) color = palette.hair;
            else if (Math.abs(x - width/2) < width/4 && Math.abs(y - height/2) < height/6) color = palette.eyes;
            else color = palette.background;
            
            ctx.fillStyle = color;
            ctx.fillRect(x, y, pixelSize, pixelSize);
        }
    }
}

function generateMinimalistAvatar(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    // Simple circles for eyes and mouth
    ctx.fillStyle = palette.skin;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = palette.eyes;
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.1, radius * 0.15, 0, Math.PI * 2);
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.1, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
    
    // Simple smile
    ctx.strokeStyle = palette.mouth;
    ctx.lineWidth = radius * 0.05;
    ctx.beginPath();
    ctx.arc(centerX, centerY + radius * 0.2, radius * 0.2, 0.2, Math.PI - 0.2);
    ctx.stroke();
}

function generateRealisticAvatar(params, progress) {
    const { ctx, palette, width, height } = params;
    
    // Create a more realistic face using gradients and noise
    const skinGradient = ctx.createRadialGradient(
        width/2, height/2, 0,
        width/2, height/2, width/2
    );
    skinGradient.addColorStop(0, lightenColor(palette.skin, 20));
    skinGradient.addColorStop(1, darkenColor(palette.skin, 10));
    
    ctx.fillStyle = skinGradient;
    ctx.beginPath();
    ctx.ellipse(width/2, height/2, width/2 * 0.9, height/2 * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Add subtle skin texture
    addNoiseTexture(ctx, width, height, palette.skin, 0.1 * progress);
    
    // Add realistic eyes
    drawRealisticEyes(params, progress);
    
    // Add realistic mouth
    drawRealisticMouth(params, progress);
}

function generateAbstractAvatar(params, progress) {
    const { ctx, palette, width, height } = params;
    
    // Create abstract patterns using mathematical functions
    ctx.save();
    ctx.translate(width/2, height/2);
    
    for (let i = 0; i < 12 * progress; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const dist = width/4 * (0.5 + Math.random() * 0.5);
        
        ctx.fillStyle = i % 2 === 0 ? palette.primary : palette.secondary;
        ctx.beginPath();
        ctx.arc(
            Math.cos(angle) * dist,
            Math.sin(angle) * dist,
            width/20 * (0.8 + Math.random() * 0.4),
            0, Math.PI * 2
        );
        ctx.fill();
    }
    
    ctx.restore();
}

function generateCyberpunkAvatar(params, progress) {
    const { ctx, palette, width, height, centerX, centerY, radius } = params;
    
    // Base head shape with neon outline
    ctx.fillStyle = darkenColor(palette.skin, 40);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
    ctx.fill();
    
    // Neon outline
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = palette.accent;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowBlur = 0;
    
    // Circuit pattern overlay
    drawCircuitPattern(params, progress);
    
    // Robotic eyes
    drawCyberpunkEyes(params, progress);
}

function generateWatercolorAvatar(params, progress) {
    const { ctx, palette, width, height, centerX, centerY, radius } = params;
    
    // Watercolor effect using multiple translucent layers
    const layers = 5;
    for (let i = 0; i < layers * progress; i++) {
        const layerRadius = radius * (0.7 + i * 0.06);
        const layerColor = adjustTransparency(palette.skin, 0.3);
        
        ctx.fillStyle = layerColor;
        ctx.beginPath();
        
        // Add some randomness to create watercolor bleeding effect
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 20) {
            const randomOffset = (Math.random() - 0.5) * 15;
            const x = centerX + Math.cos(a) * (layerRadius + randomOffset);
            const y = centerY + Math.sin(a) * (layerRadius + randomOffset);
            
            if (a === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        
        ctx.closePath();
        ctx.fill();
    }
    
    // Soft features
    drawWatercolorEyes(params, progress);
    drawWatercolorMouth(params, progress);
}

function generateLowPolyAvatar(params, progress) {
    const { ctx, palette, width, height, centerX, centerY, radius } = params;
    
    // Create low poly effect using Delaunay triangulation
    const points = [];
    const numPoints = 50;
    
    // Generate points with higher density in the center
    for (let i = 0; i < numPoints; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius * 0.9;
        
        points.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance
        });
    }
    
    // Add face feature points
    points.push({ x: centerX - radius * 0.3, y: centerY - radius * 0.1 }); // Left eye
    points.push({ x: centerX + radius * 0.3, y: centerY - radius * 0.1 }); // Right eye
    points.push({ x: centerX, y: centerY + radius * 0.2 }); // Mouth center
    points.push({ x: centerX, y: centerY - radius * 0.3 }); // Forehead
    
    // Simple triangulation (in a real implementation, use a proper Delaunay library)
    for (let i = 0; i < points.length - 2; i += 1) {
        if (i % 3 === 0 && i + 2 < points.length) {
            const p1 = points[i];
            const p2 = points[i + 1];
            const p3 = points[i + 2];
            
            // Check if the triangle is mostly inside the face circle
            const center = {
                x: (p1.x + p2.x + p3.x) / 3,
                y: (p1.y + p2.y + p3.y) / 3
            };
            
            const distToCenter = Math.sqrt(
                Math.pow(center.x - centerX, 2) + 
                Math.pow(center.y - centerY, 2)
            );
            
            if (distToCenter < radius * 0.9) {
                const hue = extractHue(palette.skin);
                const variation = (Math.random() - 0.5) * 20;
                const color = `hsl(${hue + variation}, 70%, ${60 + (Math.random() - 0.5) * 10}%)`;
                
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

function generateCartoonAvatar(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    // Base face
    ctx.fillStyle = palette.skin;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.1, radius * 0.2, 0, Math.PI * 2);
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.1, radius * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = palette.eyes;
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.1, radius * 0.1, 0, Math.PI * 2);
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.1, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.1, radius * 0.05, 0, Math.PI * 2);
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.1, radius * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    // Smile
    ctx.strokeStyle = palette.mouth;
    ctx.lineWidth = radius * 0.05;
    ctx.beginPath();
    ctx.arc(centerX, centerY + radius * 0.2, radius * 0.3, 0.2, Math.PI - 0.2);
    ctx.stroke();
    
    // Blush
    ctx.fillStyle = adjustTransparency(palette.mouth, 0.3);
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.5, centerY, radius * 0.15, 0, Math.PI * 2);
    ctx.arc(centerX + radius * 0.5, centerY, radius * 0.15, 0, Math.PI * 2);
    ctx.fill();
}

// Feature drawing functions
function drawRealisticEyes(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    // Left eye
    ctx.save();
    ctx.translate(centerX - radius * 0.3, centerY - radius * 0.1);
    
    // Eye white
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.15, radius * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Iris
    ctx.fillStyle = palette.eyes;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupil
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.04, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(radius * 0.05, -radius * 0.03, radius * 0.02, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
    
    // Right eye (mirror of left)
    ctx.save();
    ctx.translate(centerX + radius * 0.3, centerY - radius * 0.1);
    
    // Eye white
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.15, radius * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Iris
    ctx.fillStyle = palette.eyes;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupil
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.04, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(radius * 0.05, -radius * 0.03, radius * 0.02, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawRealisticMouth(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    ctx.fillStyle = palette.mouth;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + radius * 0.25, radius * 0.2, radius * 0.1, 0, 0, Math.PI);
    ctx.fill();
    
    // Upper lip highlight
    ctx.fillStyle = lightenColor(palette.mouth, 20);
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + radius * 0.23, radius * 0.19, radius * 0.05, 0, 0, Math.PI);
    ctx.fill();
}

function drawCyberpunkEyes(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    // Left eye
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.1, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = palette.accent;
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.1, radius * 0.06, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.1, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = palette.accent;
    ctx.beginPath();
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.1, radius * 0.06, 0, Math.PI * 2);
    ctx.fill();
    
    // Glowing effect
    ctx.shadowBlur = 15;
    ctx.shadowColor = palette.accent;
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawCircuitPattern(params, progress) {
    const { ctx, palette, width, height } = params;
    
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1;
    
    // Draw circuit pattern lines
    for (let i = 0; i < 20; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        // Create a circuit-like path
        for (let j = 0; j < 5; j++) {
            if (Math.random() > 0.5) {
                ctx.lineTo(startX + (Math.random() * 40 - 20), startY + (Math.random() * 40 - 20));
            } else {
                // Create a right angle
                if (Math.random() > 0.5) {
                    ctx.lineTo(startX + (Math.random() * 40 - 20), startY);
                    ctx.lineTo(startX + (Math.random() * 40 - 20), startY + (Math.random() * 40 - 20));
                } else {
                    ctx.lineTo(startX, startY + (Math.random() * 40 - 20));
                    ctx.lineTo(startX + (Math.random() * 40 - 20), startY + (Math.random() * 40 - 20));
                }
            }
        }
        
        ctx.stroke();
    }
    
    // Add circuit nodes
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        ctx.fillStyle = palette.accent;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawWatercolorEyes(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    // Soft eyes with watercolor effect
    const eyeColor = darkenColor(palette.eyes, 20);
    
    // Left eye
    ctx.fillStyle = adjustTransparency(eyeColor, 0.7);
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.3, centerY - radius * 0.1, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye
    ctx.fillStyle = adjustTransparency(eyeColor, 0.7);
    ctx.beginPath();
    ctx.arc(centerX + radius * 0.3, centerY - radius * 0.1, radius * 0.1, 0, Math.PI * 2);
    ctx.fill();
}

function drawWatercolorMouth(params, progress) {
    const { ctx, palette, centerX, centerY, radius } = params;
    
    // Soft mouth with watercolor effect
    ctx.fillStyle = adjustTransparency(palette.mouth, 0.6);
    ctx.beginPath();
    ctx.arc(centerX, centerY + radius * 0.2, radius * 0.15, 0, Math.PI);
    ctx.fill();
}

// Utility functions
function drawBackground(params, progress) {
    const { ctx, width, height, palette } = params;
    
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, lightenColor(palette.background, 10));
    gradient.addColorStop(1, darkenColor(palette.background, 10));
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function applyMoodEffects(params, progress) {
    const { ctx, mood, width, height, palette } = params;
    
    ctx.save();
    
    switch(mood) {
        case 'happy':
            // Brighten and add warm glow
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = 'rgba(255, 255, 200, 0.1)';
            ctx.fillRect(0, 0, width, height);
            break;
        case 'sad':
            // Desaturate and add blue tint
            ctx.fillStyle = 'rgba(0, 0, 100, 0.2)';
            ctx.fillRect(0, 0, width, height);
            
            // Add tear drops
            ctx.fillStyle = 'rgba(200, 200, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(params.centerX - params.radius * 0.25, params.centerY + params.radius * 0.1, 3, 0, Math.PI * 2);
            ctx.arc(params.centerX + params.radius * 0.25, params.centerY + params.radius * 0.1, 3, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'angry':
            // Red tint and dynamic lines
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            ctx.fillRect(0, 0, width, height);
            
            // Angry eyebrows
            ctx.strokeStyle = darkenColor(palette.hair, 30);
            ctx.lineWidth = params.radius * 0.03;
            ctx.beginPath();
            ctx.moveTo(params.centerX - params.radius * 0.4, params.centerY - params.radius * 0.2);
            ctx.lineTo(params.centerX - params.radius * 0.2, params.centerY - params.radius * 0.3);
            ctx.moveTo(params.centerX + params.radius * 0.4, params.centerY - params.radius * 0.2);
            ctx.lineTo(params.centerX + params.radius * 0.2, params.centerY - params.radius * 0.3);
            ctx.stroke();
            break;
        case 'surprised':
            // Bright highlight and wide eyes
            ctx.globalCompositeOperation = 'lighter';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.arc(params.centerX, params.centerY, params.radius * 0.7, 0, Math.PI * 2);
            ctx.fill();
            
            // Make eyes larger
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(params.centerX - params.radius * 0.3, params.centerY - params.radius * 0.1, params.radius * 0.15, 0, Math.PI * 2);
            ctx.arc(params.centerX + params.radius * 0.3, params.centerY - params.radius * 0.1, params.radius * 0.15, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
    
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
}

function applyFeatures(params, progress) {
    const { ctx, features, centerX, centerY, radius, palette } = params;
    
    if (features.includes('glasses')) {
        ctx.strokeStyle = palette.accent;
        ctx.lineWidth = radius * 0.03;
        ctx.beginPath();
        
        // Left lens
        ctx.rect(centerX - radius * 0.5, centerY - radius * 0.2, radius * 0.4, radius * 0.3);
        
        // Right lens
        ctx.rect(centerX + radius * 0.1, centerY - radius * 0.2, radius * 0.4, radius * 0.3);
        
        // Bridge
        ctx.moveTo(centerX - radius * 0.1, centerY - radius * 0.1);
        ctx.lineTo(centerX + radius * 0.1, centerY - radius * 0.1);
        
        ctx.stroke();
    }
    
    if (features.includes('hat')) {
        ctx.fillStyle = palette.accent;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - radius * 0.8, radius * 0.7, radius * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Hat brim
        ctx.fillStyle = darkenColor(palette.accent, 20);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - radius * 0.6, radius * 0.9, radius * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    if (features.includes('facial_hair')) {
        ctx.fillStyle = palette.hair;
        ctx.beginPath();
        
        // Beard
        ctx.ellipse(centerX, centerY + radius * 0.4, radius * 0.4, radius * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Mustache
        ctx.fillStyle = palette.hair;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + radius * 0.3, radius * 0.3, radius * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    
    if (features.includes('earrings')) {
        ctx.fillStyle = palette.accent;
        ctx.beginPath();
        ctx.arc(centerX - radius * 0.8, centerY, radius * 0.05, 0, Math.PI * 2);
        ctx.arc(centerX + radius * 0.8, centerY, radius * 0.05, 0, Math.PI * 2);
        ctx.fill();
    }
    
    if (features.includes('scar')) {
        ctx.strokeStyle = darkenColor(palette.skin, 30);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX - radius * 0.2, centerY - radius * 0.1);
        ctx.lineTo(centerX + radius * 0.2, centerY + radius * 0.2);
        ctx.stroke();
    }
}

function applySizeScaling(params, progress) {
    const { ctx, size, width, height } = params;
    
    if (size === 'small') {
        // Scale down for small avatars
        const scale = 0.7;
        const newWidth = width * scale;
        const newHeight = height * scale;
        const xOffset = (width - newWidth) / 2;
        const yOffset = (height - newHeight) / 2;
        
        const imageData = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);
        ctx.putImageData(imageData, xOffset, yOffset, 0, 0, newWidth, newHeight);
    } else if (size === 'large') {
        // Scale up for large avatars with crisp pixels
        const scale = 1.2;
        const newWidth = width * scale;
        const newHeight = height * scale;
        const xOffset = (width - newWidth) / 2;
        const yOffset = (height - newHeight) / 2;
        
        ctx.imageSmoothingEnabled = false;
        const imageData = ctx.getImageData(0, 0, width, height);
        ctx.clearRect(0, 0, width, height);
        ctx.putImageData(imageData, xOffset, yOffset, 0, 0, newWidth, newHeight);
        ctx.imageSmoothingEnabled = true;
    }
}

function getColorPalette() {
    const hue = Math.random() * 360;
    const complementaryHue = (hue + 180) % 360;
    const analogousHue1 = (hue + 30) % 360;
    const analogousHue2 = (hue + 330) % 360;
    
    return {
        primary: `hsl(${hue}, 70%, 60%)`,
        secondary: `hsl(${complementaryHue}, 70%, 50%)`,
        accent: `hsl(${analogousHue1}, 80%, 40%)`,
        background: `hsl(${analogousHue2}, 20%, 95%)`,
        skin: `hsl(${30 + Math.random() * 30}, ${40 + Math.random() * 30}%, ${70 + Math.random() * 20}%)`,
        hair: `hsl(${Math.random() * 40}, ${50 + Math.random() * 30}%, ${20 + Math.random() * 30}%)`,
        eyes: `hsl(${180 + Math.random() * 90}, 70%, 40%)`,
        mouth: `hsl(${350 + Math.random() * 20}, 70%, 50%)`
    };
}

function lightenColor(color, amount) {
    // Parse HSL color
    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
        let h = parseInt(hslMatch[1]);
        let s = parseInt(hslMatch[2]);
        let l = parseInt(hslMatch[3]);
        
        l = Math.min(100, l + amount);
        
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    // Parse HEX color (simplified)
    if (color.startsWith('#')) {
        // Simplified implementation - in a real scenario, convert to HSL and back
        return color; // Placeholder
    }
    
    return color;
}

function darkenColor(color, amount) {
    // Parse HSL color
    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
        let h = parseInt(hslMatch[1]);
        let s = parseInt(hslMatch[2]);
        let l = parseInt(hslMatch[3]);
        
        l = Math.max(0, l - amount);
        
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    
    // Parse HEX color (simplified)
    if (color.startsWith('#')) {
        // Simplified implementation
        return color; // Placeholder
    }
    
    return color;
}

// Utility: Adjust transparency for color strings (HSL and HEX)
function adjustTransparency(color, alpha = 1) {
    const hslMatch = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
        const h = parseInt(hslMatch[1]);
        const s = parseInt(hslMatch);
        const l = parseInt(hslMatch);
        return `hsla(${h}, ${s}%, ${l}%, ${alpha})`;
    }
    if (color.startsWith('#')) {
        // HEX to RGBA conversion (simple version)
        let c = color.substring(1);
        if (c.length === 3) c = c + c + c[1] + c[1] + c + c;
        const num = parseInt(c, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r},${g},${b},${alpha})`;
    }
    return color;
}

// Utility: extract hue from hsl string for lowpoly color variation
function extractHue(color) {
    const hslMatch = color.match(/hsl\((\d+),/);
    return hslMatch ? parseInt(hslMatch[1]) : 0;
}

// Utility: Add noise texture for realistic skin rendering
function addNoiseTexture(ctx, width, height, baseColor, amount = 0.1) {
    const imageData = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (Math.random() < amount) {
            imageData.data[i] += Math.floor(Math.random() * 10);     // R
            imageData.data[i + 1] += Math.floor(Math.random() * 10); // G
            imageData.data[i + 2] += Math.floor(Math.random() * 10); // B
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

// Utility: Draw geometric shapes
function drawShape(ctx, shape, progress) {
    ctx.save();
    ctx.globalAlpha = 0.7 + 0.3 * progress;
    switch (shape.type) {
        case 'circle':
            ctx.fillStyle = shape.color;
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
            ctx.fill();
            break;
        case 'triangle':
            ctx.fillStyle = shape.color;
            ctx.beginPath();
            ctx.moveTo(shape.points.x, shape.points.y);
            ctx.lineTo(shape.points[1].x, shape.points[1].y);
            ctx.lineTo(shape.points.x, shape.points.y);
            ctx.closePath();
            ctx.fill();
            break;
        case 'rect':
            ctx.fillStyle = shape.color;
            ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
            break;
        case 'arc':
            ctx.strokeStyle = shape.color;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, Math.PI * 0.2, Math.PI - Math.PI * 0.2);
            ctx.stroke();
            break;
    }
    ctx.restore();
}

// Utility: Generate points for geometric triangle shapes
function getTrianglePoints(cx, cy, r) {
    return [
        { x: cx, y: cy - r },
        { x: cx - r * Math.sin(Math.PI / 3), y: cy + r / 2 },
        { x: cx + r * Math.sin(Math.PI / 3), y: cy + r / 2 },
    ];
}

// History Management
function saveState() {
    if (imageData) {
        if (stateHistory.length >= maxHistoryStates) {
            stateHistory.shift();
        }
        stateHistory.push(imageData);
        currentState = stateHistory.length - 1;
    }
}

function undoState() {
    if (currentState > 0) {
        currentState--;
        elements.ctx.putImageData(stateHistory[currentState], 0, 0);
    }
}

function redoState() {
    if (currentState < stateHistory.length - 1) {
        currentState++;
        elements.ctx.putImageData(stateHistory[currentState], 0, 0);
    }
}

// Timer and Progress Bar UI
function showGenerationTimer() {
    if (elements.progressFill && elements.progressFill.style) {
        elements.progressFill.style.display = 'block';
        elements.progressFill.style.width = '0%';
    }
    if (elements.timerValue) {
        elements.timerValue.textContent = '6s';
    }
}

function hideGenerationTimer() {
    if (elements.progressFill && elements.progressFill.style) {
        elements.progressFill.style.display = 'none';
    }
    if (elements.timerValue) {
        elements.timerValue.textContent = '';
    }
}

// Canvas View Reset
function resetView() {
    elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
}

export {generateAvatar};

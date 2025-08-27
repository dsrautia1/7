// Advanced Character Generator with enhanced features

// Global elements object
const elements = {
    canvas: document.getElementById('characterCanvas'),
    ctx: document.getElementById('characterCanvas').getContext('2d'),
    resolution: document.getElementById('resolution'),
    characterType: document.getElementById('characterType'),
    characterPose: document.getElementById('characterPose'),
    characterSize: document.getElementById('characterSize'),
    characterStyle: document.getElementById('characterStyle'),
    progressFill: document.querySelector('.progress-fill'),
    timerValue: document.querySelector('.timer-value'),
    generationTimer: document.querySelector('.generation-timer')
};

// Global variables
let particleSystems = [];
let currentCharacter = null;
let animationFrameId = null;
let imageData = null;
const settings = {
    animateIdle: true
};

// Initialize any event listeners or setup
function init() {
    console.log("Advanced Character Generator initialized");
}

function generateCharacter() {
    const res = parseInt(elements.resolution.value);
    elements.canvas.width = res;
    elements.canvas.height = res;
    
    resetView();
    showGenerationTimer();
    
    const startTime = Date.now();
    
    const generateFrame = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 1000, 1);
        
        elements.progressFill.style.width = `${progress * 100}%`;
        elements.timerValue.textContent = `${Math.ceil(8 - progress * 8)}s`;
        
        if (progress < 1) {
            animationFrameId = requestAnimationFrame(generateFrame);
        } else {
            const type = elements.characterType.value;
            const pose = elements.characterPose.value;
            const size = elements.characterSize.value;
            const style = elements.characterStyle.value;
            
            // Generate character based on parameters with advanced features
            generateAdvancedCharacter(type, pose, size, style);
            
            hideGenerationTimer();
            imageData = elements.ctx.getImageData(0, 0, elements.canvas.width, elements.canvas.height);
            saveState();
        }
    };
    
    animationFrameId = requestAnimationFrame(generateFrame);
}

function generateAdvancedCharacter(type, pose, size, style) {
    // Clear any existing animations
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Clear canvas
    elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    
    // Generate character with advanced features
    switch(type) {
        case 'human':
            generateHumanCharacter(pose, size, style);
            break;
        case 'creature':
            generateCreatureCharacter(pose, size, style);
            break;
        case 'robot':
            generateRobotCharacter(pose, size, style);
            break;
        case 'fantasy':
            generateFantasyCharacter(pose, size, style);
            break;
        case 'hybrid':
            generateHybridCharacter(pose, size, style);
            break;
    }
    
    // Add special effects based on style
    addSpecialEffects(style);
    
    // Start idle animation if enabled
    if (settings.animateIdle) {
        startIdleAnimation();
    }
}

function generateHumanCharacter(pose, size, style) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getAdvancedColorPalette(style);
    const detailsLevel = getDetailsLevel();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Draw background based on style
    drawBackground(style);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
    
    // Draw shadow
    elements.ctx.beginPath();
    elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
    elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    elements.ctx.fill();
    
    // Body with advanced features
    drawAdvancedBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
    
    // Head with advanced features
    drawAdvancedHead(centerX, centerY, characterSize, palette, detailsLevel, style);
    
    // Limbs with advanced features
    drawAdvancedLimbs(centerX, centerY, characterSize, pose, palette, detailsLevel);
    
    // Clothing and accessories based on style
    drawClothing(centerX, centerY, characterSize, pose, style, palette);
    
    // Facial features with expressions
    drawAdvancedFace(centerX, centerY, characterSize, palette, style);
    
    // Store character data for animation
    currentCharacter = {
        type: 'human',
        pose,
        size,
        style,
        centerX,
        centerY,
        characterSize,
        palette,
        detailsLevel,
        timestamp: Date.now()
    };
}

function generateCreatureCharacter(pose, size, style) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getAdvancedColorPalette(style);
    const detailsLevel = getDetailsLevel();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Draw background based on style
    drawBackground(style);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
    
    // Draw shadow
    elements.ctx.beginPath();
    elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
    elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    elements.ctx.fill();
    
    // Generate random creature features
    const creatureType = Math.floor(Math.random() * 5); // 0-4 different creature types
    const numEyes = Math.floor(Math.random() * 3) + 1; // 1-3 eyes
    const numLimbs = Math.floor(Math.random() * 4) + 2; // 2-5 limbs
    const hasWings = Math.random() > 0.7;
    const hasTail = Math.random() > 0.3;
    const hasHorns = Math.random() > 0.5;
    
    // Draw creature body based on type
    switch(creatureType) {
        case 0: // Quadruped
            drawQuadrupedBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 1: // Bipedal
            drawBipedalBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 2: // Slime/blob
            drawSlimeBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 3: // Insectoid
            drawInsectoidBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 4: // Aquatic
            drawAquaticBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
    }
    
    // Draw creature features
    if (hasWings) drawWings(centerX, centerY, characterSize, palette, detailsLevel);
    if (hasTail) drawTail(centerX, centerY, characterSize, pose, palette, detailsLevel);
    if (hasHorns) drawHorns(centerX, centerY, characterSize, palette, detailsLevel);
    
    // Draw eyes
    drawCreatureEyes(centerX, centerY, characterSize, numEyes, palette, detailsLevel);
    
    // Store character data for animation
    currentCharacter = {
        type: 'creature',
        pose,
        size,
        style,
        centerX,
        centerY,
        characterSize,
        palette,
        detailsLevel,
        creatureType,
        numEyes,
        numLimbs,
        hasWings,
        hasTail,
        hasHorns,
        timestamp: Date.now()
    };
}

function generateRobotCharacter(pose, size, style) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getAdvancedColorPalette(style);
    const detailsLevel = getDetailsLevel();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Draw background based on style
    drawBackground(style);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
    
    // Draw shadow
    elements.ctx.beginPath();
    elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
    elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    elements.ctx.fill();
    
    // Generate robot features
    const robotType = Math.floor(Math.random() * 4); // 0-3 different robot types
    const hasAntennas = Math.random() > 0.5;
    const hasJetpack = Math.random() > 0.7;
    const hasWeapon = Math.random() > 0.6;
    
    // Draw robot body based on type
    switch(robotType) {
        case 0: // Humanoid
            drawHumanoidRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 1: // Mech
            drawMechRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 2: // Spider bot
            drawSpiderRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 3: // Floating orb
            drawOrbRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
    }
    
    // Draw robot features
    if (hasAntennas) drawAntennas(centerX, centerY, characterSize, palette, detailsLevel);
    if (hasJetpack) drawJetpack(centerX, centerY, characterSize, palette, detailsLevel);
    if (hasWeapon) drawWeapon(centerX, centerY, characterSize, pose, palette, detailsLevel);
    
    // Draw lights and screens
    drawRobotLights(centerX, centerY, characterSize, palette, detailsLevel);
    
    // Store character data for animation
    currentCharacter = {
        type: 'robot',
        pose,
        size,
        style,
        centerX,
        centerY,
        characterSize,
        palette,
        detailsLevel,
        robotType,
        hasAntennas,
        hasJetpack,
        hasWeapon,
        timestamp: Date.now()
    };
}

function generateFantasyCharacter(pose, size, style) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getAdvancedColorPalette(style);
    const detailsLevel = getDetailsLevel();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Draw background based on style
    drawBackground(style);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
    
    // Draw shadow
    elements.ctx.beginPath();
    elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
    elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    elements.ctx.fill();
    
    // Generate fantasy race
    const race = Math.floor(Math.random() * 5); // 0-4 different races
    const hasMagic = Math.random() > 0.3;
    const hasWings = Math.random() > 0.6;
    const hasCrown = Math.random() > 0.7;
    
    // Draw fantasy body based on race
    switch(race) {
        case 0: // Elf
            drawElfBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 1: // Dwarf
            drawDwarfBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 2: // Orc
            drawOrcBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 3: // Fairy
            drawFairyBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 4: // Demon
            drawDemonBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
    }
    
    // Draw fantasy features
    if (hasMagic) drawMagicEffects(centerX, centerY, characterSize, palette, detailsLevel);
    if (hasWings) drawFantasyWings(centerX, centerY, characterSize, palette, detailsLevel);
    if (hasCrown) drawCrown(centerX, centerY, characterSize, palette, detailsLevel);
    
    // Draw facial features with fantasy elements
    drawFantasyFace(centerX, centerY, characterSize, race, palette, detailsLevel);
    
    // Store character data for animation
    currentCharacter = {
        type: 'fantasy',
        pose,
        size,
        style,
        centerX,
        centerY,
        characterSize,
        palette,
        detailsLevel,
        race,
        hasMagic,
        hasWings,
        hasCrown,
        timestamp: Date.now()
    };
}

function generateHybridCharacter(pose, size, style) {
    // This method creates hybrid characters by combining features from different types
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getAdvancedColorPalette(style);
    const detailsLevel = getDetailsLevel();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Draw background based on style
    drawBackground(style);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
    
    // Draw shadow
    elements.ctx.beginPath();
    elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
    elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    elements.ctx.fill();
    
    // Randomly combine features from different character types
    const primaryType = Math.floor(Math.random() * 4); // 0-3 (human, creature, robot, fantasy)
    const secondaryInfluence = Math.random() * 0.4; // How much secondary type influences (0-0.4)
    const secondaryType = Math.floor(Math.random() * 4);
    
    // Draw base body based on primary type
    switch(primaryType) {
        case 0: // Human base
            drawAdvancedBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 1: // Creature base
            drawBipedalBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 2: // Robot base
            drawHumanoidRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
        case 3: // Fantasy base
            drawElfBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
            break;
    }
    
    // Add influences from secondary type
    switch(secondaryType) {
        case 0: // Human influence
            if (primaryType !== 0) addHumanFeatures(centerX, centerY, characterSize, secondaryInfluence);
            break;
        case 1: // Creature influence
            if (primaryType !== 1) addCreatureFeatures(centerX, centerY, characterSize, secondaryInfluence);
            break;
        case 2: // Robot influence
            if (primaryType !== 2) addRobotFeatures(centerX, centerY, characterSize, secondaryInfluence);
            break;
        case 3: // Fantasy influence
            if (primaryType !== 3) addFantasyFeatures(centerX, centerY, characterSize, secondaryInfluence);
            break;
    }
    
    // Draw hybrid head
    drawHybridHead(centerX, centerY, characterSize, primaryType, secondaryType, secondaryInfluence, palette, detailsLevel);
    
    // Store character data for animation
    currentCharacter = {
        type: 'hybrid',
        pose,
        size,
        style,
        centerX,
        centerY,
        characterSize,
        palette,
        detailsLevel,
        primaryType,
        secondaryType,
        secondaryInfluence,
        timestamp: Date.now()
    };
}

// Advanced drawing methods for different body parts and features
function drawAdvancedBody(centerX, centerY, size, pose, palette, detailsLevel) {
    // Implementation for drawing detailed body with musculature, clothing, etc.
    elements.ctx.fillStyle = palette[1];
    
    if (pose === 'standing') {
        // Draw torso with more detail
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.12, centerY);
        elements.ctx.bezierCurveTo(
            centerX - size * 0.15, centerY - size * 0.05,
            centerX - size * 0.1, centerY + size * 0.4,
            centerX - size * 0.08, centerY + size * 0.4
        );
        elements.ctx.bezierCurveTo(
            centerX - size * 0.12, centerY + size * 0.35,
            centerX - size * 0.15, centerY,
            centerX - size * 0.12, centerY
        );
        elements.ctx.fill();
        
        // Right side of torso
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.12, centerY);
        elements.ctx.bezierCurveTo(
            centerX + size * 0.15, centerY - size * 0.05,
            centerX + size * 0.1, centerY + size * 0.4,
            centerX + size * 0.08, centerY + size * 0.4
        );
        elements.ctx.bezierCurveTo(
            centerX + size * 0.12, centerY + size * 0.35,
            centerX + size * 0.15, centerY,
            centerX + size * 0.12, centerY
        );
        elements.ctx.fill();
        
        // Add muscle definition if details level is high
        if (detailsLevel > 1) {
            elements.ctx.fillStyle = adjustColor(palette[1], -20);
            // Draw abdominal muscles
            elements.ctx.beginPath();
            elements.ctx.moveTo(centerX - size * 0.05, centerY + size * 0.1);
            elements.ctx.lineTo(centerX + size * 0.05, centerY + size * 0.1);
            elements.ctx.lineTo(centerX + size * 0.04, centerY + size * 0.15);
            elements.ctx.lineTo(centerX - size * 0.04, centerY + size * 0.15);
            elements.ctx.closePath();
            elements.ctx.fill();
            
            // Draw pectoral shading
            elements.ctx.beginPath();
            elements.ctx.arc(centerX - size * 0.08, centerY + size * 0.05, size * 0.06, Math.PI * 0.5, Math.PI * 1.5);
            elements.ctx.fill();
            
            elements.ctx.beginPath();
            elements.ctx.arc(centerX + size * 0.08, centerY + size * 0.05, size * 0.06, Math.PI * 1.5, Math.PI * 0.5);
            elements.ctx.fill();
        }
    } else if (pose === 'sitting') {
        // Implementation for sitting pose
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.15, centerY);
        elements.ctx.bezierCurveTo(
            centerX - size * 0.2, centerY - size * 0.05,
            centerX - size * 0.18, centerY + size * 0.3,
            centerX - size * 0.15, centerY + size * 0.3
        );
        elements.ctx.bezierCurveTo(
            centerX - size * 0.1, centerY + size * 0.25,
            centerX - size * 0.12, centerY,
            centerX - size * 0.15, centerY
        );
        elements.ctx.fill();
        
        // Right side of torso
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.15, centerY);
        elements.ctx.bezierCurveTo(
            centerX + size * 0.2, centerY - size * 0.05,
            centerX + size * 0.18, centerY + size * 0.3,
            centerX + size * 0.15, centerY + size * 0.3
        );
        elements.ctx.bezierCurveTo(
            centerX + size * 0.1, centerY + size * 0.25,
            centerX + size * 0.12, centerY,
            centerX + size * 0.15, centerY
        );
        elements.ctx.fill();
    } else { // running
        // Implementation for running pose
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.1, centerY);
        elements.ctx.bezierCurveTo(
            centerX - size * 0.15, centerY - size * 0.1,
            centerX - size * 0.12, centerY + size * 0.3,
            centerX - size * 0.08, centerY + size * 0.3
        );
        elements.ctx.bezierCurveTo(
            centerX - size * 0.05, centerY + size * 0.25,
            centerX - size * 0.08, centerY,
            centerX - size * 0.1, centerY
        );
        elements.ctx.fill();
        
        // Right side of torso
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.1, centerY);
        elements.ctx.bezierCurveTo(
            centerX + size * 0.15, centerY - size * 0.05,
            centerX + size * 0.08, centerY + size * 0.35,
            centerX + size * 0.05, centerY + size * 0.35
        );
        elements.ctx.bezierCurveTo(
            centerX + size * 0.02, centerY + size * 0.3,
            centerX + size * 0.05, centerY,
            centerX + size * 0.1, centerY
        );
        elements.ctx.fill();
    }
}

function drawAdvancedHead(centerX, centerY, size, palette, detailsLevel, style) {
    // Draw head with advanced features based on style and details level
    elements.ctx.fillStyle = palette[1];
    
    // Head shape varies based on style
    if (style === 'realistic') {
        // Realistic head shape
        elements.ctx.beginPath();
        elements.ctx.ellipse(centerX, centerY - size * 0.2, size * 0.18, size * 0.22, 0, 0, Math.PI * 2);
        elements.ctx.fill();
    } else if (style === 'cartoon') {
        // Cartoon head shape
        elements.ctx.beginPath();
        elements.ctx.arc(centerX, centerY - size * 0.2, size * 0.2, 0, Math.PI * 2);
        elements.ctx.fill();
    } else if (style === 'anime') {
        // Anime head shape
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.15, centerY - size * 0.15);
        elements.ctx.quadraticCurveTo(centerX, centerY - size * 0.3, centerX + size * 0.15, centerY - size * 0.15);
        elements.ctx.quadraticCurveTo(centerX + size * 0.2, centerY, centerX + size * 0.15, centerY + size * 0.05);
        elements.ctx.quadraticCurveTo(centerX, centerY + size * 0.1, centerX - size * 0.15, centerY + size * 0.05);
        elements.ctx.quadraticCurveTo(centerX - size * 0.2, centerY, centerX - size * 0.15, centerY - size * 0.15);
        elements.ctx.fill();
    } else {
        // Default head shape
        elements.ctx.beginPath();
        elements.ctx.arc(centerX, centerY - size * 0.2, size * 0.18, 0, Math.PI * 2);
        elements.ctx.fill();
    }
    
    // Add details based on details level
    if (detailsLevel > 0) {
        // Basic shading
        elements.ctx.fillStyle = adjustColor(palette[1], -30);
        elements.ctx.beginPath();
        elements.ctx.arc(centerX - size * 0.05, centerY - size * 0.25, size * 0.1, Math.PI * 0.5, Math.PI * 1.5);
        elements.ctx.fill();
    }
    
    if (detailsLevel > 1) {
        // Highlight
        elements.ctx.fillStyle = adjustColor(palette[1], 40);
        elements.ctx.beginPath();
        elements.ctx.arc(centerX + size * 0.06, centerY - size * 0.25, size * 0.05, Math.PI * 1.5, Math.PI * 0.5);
        elements.ctx.fill();
    }
}

function drawAdvancedLimbs(centerX, centerY, size, pose, palette, detailsLevel) {
    // Draw limbs with advanced details based on pose and details level
    elements.ctx.strokeStyle = palette[1];
    elements.ctx.lineWidth = size * 0.05;
    elements.ctx.lineCap = 'round';
    
    if (pose === 'standing') {
        // Arms
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.12, centerY + size * 0.1);
        elements.ctx.lineTo(centerX - size * 0.3, centerY + size * 0.2);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.12, centerY + size * 0.1);
        elements.ctx.lineTo(centerX + size * 0.3, centerY + size * 0.2);
        elements.ctx.stroke();
        
        // Legs
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.08, centerY + size * 0.4);
        elements.ctx.lineTo(centerX - size * 0.1, centerY + size * 0.7);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.08, centerY + size * 0.4);
        elements.ctx.lineTo(centerX + size * 0.1, centerY + size * 0.7);
        elements.ctx.stroke();
        
        // Hands and feet
        drawHandsAndFeet(centerX, centerY, size, pose, palette);
    } else if (pose === 'sitting') {
        // Sitting pose limbs
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.15, centerY + size * 0.1);
        elements.ctx.lineTo(centerX - size * 0.3, centerY);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.15, centerY + size * 0.1);
        elements.ctx.lineTo(centerX + size * 0.3, centerY);
        elements.ctx.stroke();
        
        // Bent legs
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.15, centerY + size * 0.3);
        elements.ctx.lineTo(centerX - size * 0.2, centerY + size * 0.5);
        elements.ctx.lineTo(centerX - size * 0.1, centerY + size * 0.5);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.15, centerY + size * 0.3);
        elements.ctx.lineTo(centerX + size * 0.2, centerY + size * 0.5);
        elements.ctx.lineTo(centerX + size * 0.1, centerY + size * 0.5);
        elements.ctx.stroke();
        
        // Hands and feet
        drawHandsAndFeet(centerX, centerY, size, pose, palette);
    } else { // running
        // Running pose limbs
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.1, centerY + size * 0.1);
        elements.ctx.lineTo(centerX - size * 0.3, centerY + size * 0.3);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.1, centerY + size * 0.2);
        elements.ctx.lineTo(centerX + size * 0.3, centerY);
        elements.ctx.stroke();
        
        // Legs in running motion
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.08, centerY + size * 0.3);
        elements.ctx.lineTo(centerX - size * 0.15, centerY + size * 0.6);
        elements.ctx.stroke();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.08, centerY + size * 0.35);
        elements.ctx.lineTo(centerX + size * 0.15, centerY + size * 0.7);
        elements.ctx.stroke();
        
        // Hands and feet
        drawHandsAndFeet(centerX, centerY, size, pose, palette);
    }
}

function drawAdvancedFace(centerX, centerY, size, palette, style) {
    // Draw advanced facial features based on style
    elements.ctx.fillStyle = palette[0];
    
    // Eyes
    if (style === 'anime') {
        // Anime-style eyes
        elements.ctx.fillStyle = '#ffffff';
        elements.ctx.beginPath();
        elements.ctx.ellipse(centerX - size * 0.06, centerY - size * 0.25, size * 0.05, size * 0.07, 0, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.ellipse(centerX + size * 0.06, centerY - size * 0.25, size * 0.05, size * 0.07, 0, 0, Math.PI * 2);
        elements.ctx.fill();
        
        // Irises
        elements.ctx.fillStyle = getRandomEyeColor();
        elements.ctx.beginPath();
        elements.ctx.arc(centerX - size * 0.06, centerY - size * 0.25, size * 0.02, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.arc(centerX + size * 0.06, centerY - size * 0.25, size * 0.02, 0, Math.PI * 2);
        elements.ctx.fill();
        
        // Pupils
        elements.ctx.fillStyle = '#000000';
        elements.ctx.beginPath();
        elements.ctx.arc(centerX - size * 0.06, centerY - size * 0.25, size * 0.01, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.arc(centerX + size * 0.06, centerY - size * 0.25, size * 0.01, 0, Math.PI * 2);
        elements.ctx.fill();
        
        // Highlights
        elements.ctx.fillStyle = '#ffffff';
        elements.ctx.beginPath();
        elements.ctx.arc(centerX - size * 0.065, centerY - size * 0.255, size * 0.005, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.arc(centerX + size * 0.055, centerY - size * 0.255, size * 0.005, 0, Math.PI * 2);
        elements.ctx.fill();
    } else {
        // Default eyes
        elements.ctx.beginPath();
        elements.ctx.arc(centerX - size * 0.05, centerY - size * 0.25, size * 0.03, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.arc(centerX + size * 0.05, centerY - size * 0.25, size * 0.03, 0, Math.PI * 2);
        elements.ctx.fill();
    }
    
    // Mouth - varies based on style and random expression
    const expression = Math.floor(Math.random() * 3); // 0: neutral, 1: smile, 2: surprised
    
    elements.ctx.strokeStyle = palette[0];
    elements.ctx.lineWidth = size * 0.01;
    
    if (expression === 0) {
        // Neutral mouth
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.03, centerY - size * 0.18);
        elements.ctx.lineTo(centerX + size * 0.03, centerY - size * 0.18);
        elements.ctx.stroke();
    } else if (expression === 1) {
        // Smile
        elements.ctx.beginPath();
        elements.ctx.arc(centerX, centerY - size * 0.18, size * 0.03, 0, Math.PI);
        elements.ctx.stroke();
    } else {
        // Surprised mouth
        elements.ctx.beginPath();
        elements.ctx.arc(centerX, centerY - size * 0.18, size * 0.02, 0, Math.PI * 2);
        elements.ctx.fill();
    }
    
    // Nose
    elements.ctx.fillStyle = palette[1];
    elements.ctx.beginPath();
    elements.ctx.arc(centerX, centerY - size * 0.22, size * 0.015, 0, Math.PI * 2);
    elements.ctx.fill();
}

function drawClothing(centerX, centerY, size, pose, style, palette) {
    // Draw clothing based on style and pose
    const clothingColor = getClothingColor(style);
    elements.ctx.fillStyle = clothingColor;
    
    if (pose === 'standing') {
        // Shirt/torso clothing
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.12, centerY + size * 0.05);
        elements.ctx.bezierCurveTo(
            centerX - size * 0.15, centerY,
            centerX - size * 0.1, centerY + size * 0.35,
            centerX - size * 0.08, centerY + size * 0.35
        );
        elements.ctx.bezierCurveTo(
            centerX - size * 0.12, centerY + size * 0.3,
            centerX - size * 0.15, centerY + size * 0.05,
            centerX - size * 0.12, centerY + size * 0.05
        );
        elements.ctx.fill();
        
        // Right side
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.12, centerY + size * 0.05);
        elements.ctx.bezierCurveTo(
            centerX + size * 0.15, centerY,
            centerX + size * 0.1, centerY + size * 0.35,
            centerX + size * 0.08, centerY + size * 0.35
        );
        elements.ctx.bezierCurveTo(
            centerX + size * 0.12, centerY + size * 0.3,
            centerX + size * 0.15, centerY + size * 0.05,
            centerX + size * 0.12, centerY + size * 0.05
        );
        elements.ctx.fill();
        
        // Pants/leg clothing
        elements.ctx.fillStyle = adjustColor(clothingColor, -30);
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX - size * 0.08, centerY + size * 0.35);
        elements.ctx.lineTo(centerX - size * 0.1, centerY + size * 0.7);
        elements.ctx.lineTo(centerX - size * 0.06, centerY + size * 0.7);
        elements.ctx.lineTo(centerX - size * 0.04, centerY + size * 0.35);
        elements.ctx.closePath();
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.moveTo(centerX + size * 0.08, centerY + size * 0.35);
        elements.ctx.lineTo(centerX + size * 0.1, centerY + size * 0.7);
        elements.ctx.lineTo(centerX + size * 0.06, centerY + size * 0.7);
        elements.ctx.lineTo(centerX + size * 0.04, centerY + size * 0.35);
        elements.ctx.closePath();
        elements.ctx.fill();
    }
    // Add other pose implementations...
}

function drawHandsAndFeet(centerX, centerY, size, pose, palette) {
    // Draw hands and feet based on pose
    elements.ctx.fillStyle = palette[1];
    
    if (pose === 'standing') {
        // Hands
        elements.ctx.beginPath();
        elements.ctx.arc(centerX - size * 0.3, centerY + size * 0.2, size * 0.04, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.arc(centerX + size * 0.3, centerY + size * 0.2, size * 0.04, 0, Math.PI * 2);
        elements.ctx.fill();
        
        // Feet
        elements.ctx.beginPath();
        elements.ctx.ellipse(centerX - size * 0.1, centerY + size * 0.7, size * 0.05, size * 0.03, 0, 0, Math.PI * 2);
        elements.ctx.fill();
        
        elements.ctx.beginPath();
        elements.ctx.ellipse(centerX + size * 0.1, centerY + size * 0.7, size * 0.05, size * 0.03, 0, 0, Math.PI * 2);
        elements.ctx.fill();
    }
    // Add other pose implementations...
}

function getAdvancedColorPalette(style) {
    // Return color palette based on style
    const palettes = {
        realistic: ['#8c7b6b', '#d9bfa6', '#a68a64', '#735e4a', '#402e22'],
        cartoon: ['#ffaa5e', '#ffcd9e', '#ff8c3a', '#e67312', '#b35909'],
        anime: ['#ffb8c9', '#ffe0e8', '#ff91af', '#e65c85', '#b33c63'],
        pixel: ['#7bafff', '#a9ceff', '#5c93e6', '#3a6bc2', '#23468c'],
        cyberpunk: ['#ff00ff', '#00ffff', '#ff2a6d', '#05d9e8', '#005678']
    };
    
    return palettes[style] || palettes.cartoon;
}

function getClothingColor(style) {
    // Return clothing color based on style
    const colors = {
        realistic: '#556b8c',
        cartoon: '#ff6b6b',
        anime: '#5e7bff',
        pixel: '#8cff7b',
        cyberpunk: '#ff2a6d'
    };
    
    return colors[style] || '#556b8c';
}

function getRandomEyeColor() {
    // Return random eye color
    const colors = ['#4a7bff', '#36b37e', '#ff5630', '#6554c0', '#00b8d9'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getDetailsLevel() {
    // Return details level based on resolution
    const res = parseInt(elements.resolution.value);
    if (res >= 512) return 2;
    if (res >= 256) return 1;
    return 0;
}

function adjustColor(color, amount) {
    // Adjust color brightness
    let usePound = false;
    
    if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
    }
    
    let num = parseInt(color, 16);
    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;
    
    r = Math.max(Math.min(255, r), 0);
    g = Math.max(Math.min(255, g), 0);
    b = Math.max(Math.min(255, b), 0);
    
    return (usePound ? "#" : "") + (b | (g << 8) | (r << 16)).toString(16).padStart(6, '0');
}

function drawBackground(style) {
    // Draw background based on style
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    
    switch(style) {
        case 'realistic':
            elements.ctx.fillStyle = '#87ceeb';
            elements.ctx.fillRect(0, 0, width, height);
            
            // Draw simple ground
            elements.ctx.fillStyle = '#8b4513';
            elements.ctx.fillRect(0, height * 0.7, width, height * 0.3);
            break;
            
        case 'cartoon':
            elements.ctx.fillStyle = '#a6e3ff';
            elements.ctx.fillRect(0, 0, width, height);
            
            // Draw cartoon clouds
            elements.ctx.fillStyle = '#ffffff';
            elements.ctx.beginPath();
            elements.ctx.arc(width * 0.3, height * 0.3, width * 0.05, 0, Math.PI * 2);
            elements.ctx.arc(width * 0.35, height * 0.25, width * 0.04, 0, Math.PI * 2);
            elements.ctx.arc(width * 0.4, height * 0.3, width * 0.06, 0, Math.PI * 2);
            elements.ctx.fill();
            break;
            
        case 'anime':
            // Gradient background
            const gradient = elements.ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, '#bde0ff');
            gradient.addColorStop(1, '#e6f3ff');
            elements.ctx.fillStyle = gradient;
            elements.ctx.fillRect(0, 0, width, height);
            break;
            
        case 'pixel':
            elements.ctx.fillStyle = '#000000';
            elements.ctx.fillRect(0, 0, width, height);
            
            // Draw pixel stars
            elements.ctx.fillStyle = '#ffffff';
            for (let i = 0; i < 20; i++) {
                const x = Math.floor(Math.random() * width);
                const y = Math.floor(Math.random() * height * 0.7);
                elements.ctx.fillRect(x, y, 2, 2);
            }
            break;
            
        case 'cyberpunk':
            elements.ctx.fillStyle = '#0a0a1a';
            elements.ctx.fillRect(0, 0, width, height);
            
            // Draw neon grid
            elements.ctx.strokeStyle = '#00ffff';
            elements.ctx.lineWidth = 1;
            for (let i = 0; i < width; i += 20) {
                elements.ctx.beginPath();
                elements.ctx.moveTo(i, 0);
                elements.ctx.lineTo(i, height);
                elements.ctx.stroke();
            }
            for (let i = 0; i < height; i += 20) {
                elements.ctx.beginPath();
                elements.ctx.moveTo(0, i);
                elements.ctx.lineTo(width, i);
                elements.ctx.stroke();
            }
            break;
            
        default:
            elements.ctx.fillStyle = '#f0f0f0';
            elements.ctx.fillRect(0, 0, width, height);
    }
}

function addSpecialEffects(style) {
    // Add special effects based on style
    switch(style) {
        case 'cyberpunk':
            addCyberpunkEffects();
            break;
        case 'pixel':
            addPixelEffects();
            break;
        case 'anime':
            addAnimeEffects();
            break;
    }
}

function addCyberpunkEffects() {
    // Add cyberpunk effects like glow and particles
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    
    // Add glow effect
    elements.ctx.shadowBlur = 20;
    elements.ctx.shadowColor = '#00ffff';
    
    // Draw some neon lines
    elements.ctx.strokeStyle = '#ff00ff';
    elements.ctx.lineWidth = 2;
    elements.ctx.beginPath();
    elements.ctx.moveTo(width * 0.2, height * 0.8);
    elements.ctx.lineTo(width * 0.8, height * 0.8);
    elements.ctx.stroke();
    
    elements.ctx.strokeStyle = '#00ffff';
    elements.ctx.beginPath();
    elements.ctx.moveTo(width * 0.8, height * 0.2);
    elements.ctx.lineTo(width * 0.8, height * 0.8);
    elements.ctx.stroke();
    
    // Reset shadow
    elements.ctx.shadowBlur = 0;
}

function addPixelEffects() {
    // Add pixelation effect
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    
    // Get image data
    const imageData = elements.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Apply pixelation
    const pixelSize = 2;
    
    for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
            const index = (y * width + x) * 4;
            
            // Get the average color of the pixel block
            let r = 0, g = 0, b = 0, a = 0;
            let count = 0;
            
            for (let py = 0; py < pixelSize && y + py < height; py++) {
                for (let px = 0; px < pixelSize && x + px < width; px++) {
                    const pIndex = ((y + py) * width + (x + px)) * 4;
                    r += data[pIndex];
                    g += data[pIndex + 1];
                    b += data[pIndex + 2];
                    a += data[pIndex + 3];
                    count++;
                }
            }
            
            r = Math.floor(r / count);
            g = Math.floor(g / count);
            b = Math.floor(b / count);
            a = Math.floor(a / count);
            
            // Fill the pixel block with the average color
            for (let py = 0; py < pixelSize && y + py < height; py++) {
                for (let px = 0; px < pixelSize && x + px < width; px++) {
                    const pIndex = ((y + py) * width + (x + px)) * 4;
                    data[pIndex] = r;
                    data[pIndex + 1] = g;
                    data[pIndex + 2] = b;
                    data[pIndex + 3] = a;
                }
            }
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

function addAnimeEffects() {
    // Add anime-style effects like sparkles
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    
    // Draw some sparkles
    elements.ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height * 0.5;
        const size = Math.random() * 3 + 1;
        
        elements.ctx.beginPath();
        elements.ctx.arc(x, y, size, 0, Math.PI * 2);
        elements.ctx.fill();
    }
}

function startIdleAnimation() {
    // Start idle animation if enabled
    if (!settings.animateIdle) return;
    
    let lastTime = 0;
    const animate = (time) => {
        if (!lastTime) lastTime = time;
        const deltaTime = (time - lastTime) / 1000;
        lastTime = time;
        
        // Clear canvas
        elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
        
        // Redraw character with slight variations for animation
        if (currentCharacter) {
            // Save current image data if not already saved
            if (!imageData) {
                imageData = elements.ctx.getImageData(0, 0, elements.canvas.width, elements.canvas.height);
            }
            
            // Redraw based on character type
            switch(currentCharacter.type) {
                case 'human':
                    generateHumanCharacter(
                        currentCharacter.pose,
                        currentCharacter.size,
                        currentCharacter.style
                    );
                    break;
                case 'creature':
                    generateCreatureCharacter(
                        currentCharacter.pose,
                        currentCharacter.size,
                        currentCharacter.style
                    );
                    break;
                case 'robot':
                    generateRobotCharacter(
                        currentCharacter.pose,
                        currentCharacter.size,
                        currentCharacter.style
                    );
                    break;
                case 'fantasy':
                    generateFantasyCharacter(
                        currentCharacter.pose,
                        currentCharacter.size,
                        currentCharacter.style
                    );
                    break;
                case 'hybrid':
                    generateHybridCharacter(
                        currentCharacter.pose,
                        currentCharacter.size,
                        currentCharacter.style
                    );
                    break;
            }
            
            // Add subtle breathing animation
            const breathOffset = Math.sin(time / 500) * 2;
            elements.ctx.translate(0, breathOffset);
            elements.ctx.drawImage(elements.canvas, 0, 0);
            elements.ctx.translate(0, -breathOffset);
        }
        
        animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
}

function resetView() {
    // Reset canvas and stop any animations
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    particleSystems = [];
    imageData = null;
}

function showGenerationTimer() {
    elements.generationTimer.style.display = 'block';
}

function hideGenerationTimer() {
    elements.generationTimer.style.display = 'none';
}

function saveState() {
    // Save current state for undo/redo functionality
    // Implementation would depend on your state management system
}

// Initialize the character generator
init();

// Placeholder functions for creature, robot, fantasy, and hybrid characters
function drawQuadrupedBody() { /* Implementation */ }
function drawBipedalBody() { /* Implementation */ }
function drawSlimeBody() { /* Implementation */ }
function drawInsectoidBody() { /* Implementation */ }
function drawAquaticBody() { /* Implementation */ }
function drawWings() { /* Implementation */ }
function drawTail() { /* Implementation */ }
function drawHorns() { /* Implementation */ }
function drawCreatureEyes() { /* Implementation */ }
function drawHumanoidRobot() { /* Implementation */ }
function drawMechRobot() { /* Implementation */ }
function drawSpiderRobot() { /* Implementation */ }
function drawOrbRobot() { /* Implementation */ }
function drawAntennas() { /* Implementation */ }
function drawJetpack() { /* Implementation */ }
function drawWeapon() { /* Implementation */ }
function drawRobotLights() { /* Implementation */ }
function drawElfBody() { /* Implementation */ }
function drawDwarfBody() { /* Implementation */ }
function drawOrcBody() { /* Implementation */ }
function drawFairyBody() { /* Implementation */ }
function drawDemonBody() { /* Implementation */ }
function drawMagicEffects() { /* Implementation */ }
function drawFantasyWings() { /* Implementation */ }
function drawCrown() { /* Implementation */ }
function drawFantasyFace() { /* Implementation */ }
function addHumanFeatures() { /* Implementation */ }
function addCreatureFeatures() { /* Implementation */ }
function addRobotFeatures() { /* Implementation */ }
function addFantasyFeatures() { /* Implementation */ }
function drawHybridHead() { /* Implementation */ }

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateCharacter,
        resetView,
        init
    };
}

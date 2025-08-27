// Advanced Character Generator with enhanced features
class AdvancedCharacterGenerator {
    constructor() {
        this.elements = {
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
        
        this.particleSystems = [];
        this.currentCharacter = null;
        this.animationFrameId = null;
        this.init();
    }

    init() {
        // Initialize any event listeners or setup
        console.log("Advanced Character Generator initialized");
    }

    generateCharacter() {
        const res = parseInt(this.elements.resolution.value);
        this.elements.canvas.width = res;
        this.elements.canvas.height = res;
        
        this.resetView();
        this.showGenerationTimer();
        
        const startTime = Date.now();
        
        const generateFrame = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / 1000, 1);
            
            this.elements.progressFill.style.width = `${progress * 100}%`;
            this.elements.timerValue.textContent = `${Math.ceil(8 - progress * 8)}s`;
            
            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(generateFrame);
            } else {
                const type = this.elements.characterType.value;
                const pose = this.elements.characterPose.value;
                const size = this.elements.characterSize.value;
                const style = this.elements.characterStyle.value;
                
                // Generate character based on parameters with advanced features
                this.generateAdvancedCharacter(type, pose, size, style);
                
                this.hideGenerationTimer();
                this.imageData = this.elements.ctx.getImageData(0, 0, this.elements.canvas.width, this.elements.canvas.height);
                this.saveState();
            }
        };
        
        this.animationFrameId = requestAnimationFrame(generateFrame);
    }

    generateAdvancedCharacter(type, pose, size, style) {
        // Clear any existing animations
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        // Clear canvas
        this.elements.ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
        
        // Generate character with advanced features
        switch(type) {
            case 'human':
                this.generateHumanCharacter(pose, size, style);
                break;
            case 'creature':
                this.generateCreatureCharacter(pose, size, style);
                break;
            case 'robot':
                this.generateRobotCharacter(pose, size, style);
                break;
            case 'fantasy':
                this.generateFantasyCharacter(pose, size, style);
                break;
            case 'hybrid':
                this.generateHybridCharacter(pose, size, style);
                break;
        }
        
        // Add special effects based on style
        this.addSpecialEffects(style);
        
        // Start idle animation if enabled
        if (this.settings.animateIdle) {
            this.startIdleAnimation();
        }
    }

    generateHumanCharacter(pose, size, style) {
        const width = this.elements.canvas.width;
        const height = this.elements.canvas.height;
        const palette = this.getAdvancedColorPalette(style);
        const detailsLevel = this.getDetailsLevel();
        
        this.elements.ctx.clearRect(0, 0, width, height);
        
        // Draw background based on style
        this.drawBackground(style);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
        
        // Draw shadow
        this.elements.ctx.beginPath();
        this.elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
        this.elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.elements.ctx.fill();
        
        // Body with advanced features
        this.drawAdvancedBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
        
        // Head with advanced features
        this.drawAdvancedHead(centerX, centerY, characterSize, palette, detailsLevel, style);
        
        // Limbs with advanced features
        this.drawAdvancedLimbs(centerX, centerY, characterSize, pose, palette, detailsLevel);
        
        // Clothing and accessories based on style
        this.drawClothing(centerX, centerY, characterSize, pose, style, palette);
        
        // Facial features with expressions
        this.drawAdvancedFace(centerX, centerY, characterSize, palette, style);
        
        // Store character data for animation
        this.currentCharacter = {
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

    generateCreatureCharacter(pose, size, style) {
        const width = this.elements.canvas.width;
        const height = this.elements.canvas.height;
        const palette = this.getAdvancedColorPalette(style);
        const detailsLevel = this.getDetailsLevel();
        
        this.elements.ctx.clearRect(0, 0, width, height);
        
        // Draw background based on style
        this.drawBackground(style);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
        
        // Draw shadow
        this.elements.ctx.beginPath();
        this.elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
        this.elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.elements.ctx.fill();
        
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
                this.drawQuadrupedBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 1: // Bipedal
                this.drawBipedalBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 2: // Slime/blob
                this.drawSlimeBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 3: // Insectoid
                this.drawInsectoidBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 4: // Aquatic
                this.drawAquaticBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
        }
        
        // Draw creature features
        if (hasWings) this.drawWings(centerX, centerY, characterSize, palette, detailsLevel);
        if (hasTail) this.drawTail(centerX, centerY, characterSize, pose, palette, detailsLevel);
        if (hasHorns) this.drawHorns(centerX, centerY, characterSize, palette, detailsLevel);
        
        // Draw eyes
        this.drawCreatureEyes(centerX, centerY, characterSize, numEyes, palette, detailsLevel);
        
        // Store character data for animation
        this.currentCharacter = {
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

    generateRobotCharacter(pose, size, style) {
        const width = this.elements.canvas.width;
        const height = this.elements.canvas.height;
        const palette = this.getAdvancedColorPalette(style);
        const detailsLevel = this.getDetailsLevel();
        
        this.elements.ctx.clearRect(0, 0, width, height);
        
        // Draw background based on style
        this.drawBackground(style);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
        
        // Draw shadow
        this.elements.ctx.beginPath();
        this.elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
        this.elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.elements.ctx.fill();
        
        // Generate robot features
        const robotType = Math.floor(Math.random() * 4); // 0-3 different robot types
        const hasAntennas = Math.random() > 0.5;
        const hasJetpack = Math.random() > 0.7;
        const hasWeapon = Math.random() > 0.6;
        
        // Draw robot body based on type
        switch(robotType) {
            case 0: // Humanoid
                this.drawHumanoidRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 1: // Mech
                this.drawMechRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 2: // Spider bot
                this.drawSpiderRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 3: // Floating orb
                this.drawOrbRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
        }
        
        // Draw robot features
        if (hasAntennas) this.drawAntennas(centerX, centerY, characterSize, palette, detailsLevel);
        if (hasJetpack) this.drawJetpack(centerX, centerY, characterSize, palette, detailsLevel);
        if (hasWeapon) this.drawWeapon(centerX, centerY, characterSize, pose, palette, detailsLevel);
        
        // Draw lights and screens
        this.drawRobotLights(centerX, centerY, characterSize, palette, detailsLevel);
        
        // Store character data for animation
        this.currentCharacter = {
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

    generateFantasyCharacter(pose, size, style) {
        const width = this.elements.canvas.width;
        const height = this.elements.canvas.height;
        const palette = this.getAdvancedColorPalette(style);
        const detailsLevel = this.getDetailsLevel();
        
        this.elements.ctx.clearRect(0, 0, width, height);
        
        // Draw background based on style
        this.drawBackground(style);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
        
        // Draw shadow
        this.elements.ctx.beginPath();
        this.elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
        this.elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.elements.ctx.fill();
        
        // Generate fantasy race
        const race = Math.floor(Math.random() * 5); // 0-4 different races
        const hasMagic = Math.random() > 0.3;
        const hasWings = Math.random() > 0.6;
        const hasCrown = Math.random() > 0.7;
        
        // Draw fantasy body based on race
        switch(race) {
            case 0: // Elf
                this.drawElfBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 1: // Dwarf
                this.drawDwarfBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 2: // Orc
                this.drawOrcBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 3: // Fairy
                this.drawFairyBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 4: // Demon
                this.drawDemonBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
        }
        
        // Draw fantasy features
        if (hasMagic) this.drawMagicEffects(centerX, centerY, characterSize, palette, detailsLevel);
        if (hasWings) this.drawFantasyWings(centerX, centerY, characterSize, palette, detailsLevel);
        if (hasCrown) this.drawCrown(centerX, centerY, characterSize, palette, detailsLevel);
        
        // Draw facial features with fantasy elements
        this.drawFantasyFace(centerX, centerY, characterSize, race, palette, detailsLevel);
        
        // Store character data for animation
        this.currentCharacter = {
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

    generateHybridCharacter(pose, size, style) {
        // This method creates hybrid characters by combining features from different types
        const width = this.elements.canvas.width;
        const height = this.elements.canvas.height;
        const palette = this.getAdvancedColorPalette(style);
        const detailsLevel = this.getDetailsLevel();
        
        this.elements.ctx.clearRect(0, 0, width, height);
        
        // Draw background based on style
        this.drawBackground(style);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const characterSize = Math.min(width, height) * (size === 'small' ? 0.4 : size === 'large' ? 0.8 : 0.6);
        
        // Draw shadow
        this.elements.ctx.beginPath();
        this.elements.ctx.ellipse(centerX, centerY + characterSize * 0.7, characterSize * 0.3, characterSize * 0.1, 0, 0, Math.PI * 2);
        this.elements.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.elements.ctx.fill();
        
        // Randomly combine features from different character types
        const primaryType = Math.floor(Math.random() * 4); // 0-3 (human, creature, robot, fantasy)
        const secondaryInfluence = Math.random() * 0.4; // How much secondary type influences (0-0.4)
        const secondaryType = Math.floor(Math.random() * 4);
        
        // Draw base body based on primary type
        switch(primaryType) {
            case 0: // Human base
                this.drawAdvancedBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 1: // Creature base
                this.drawBipedalBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 2: // Robot base
                this.drawHumanoidRobot(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
            case 3: // Fantasy base
                this.drawElfBody(centerX, centerY, characterSize, pose, palette, detailsLevel);
                break;
        }
        
        // Add influences from secondary type
        switch(secondaryType) {
            case 0: // Human influence
                if (primaryType !== 0) this.addHumanFeatures(centerX, centerY, characterSize, secondaryInfluence);
                break;
            case 1: // Creature influence
                if (primaryType !== 1) this.addCreatureFeatures(centerX, centerY, characterSize, secondaryInfluence);
                break;
            case 2: // Robot influence
                if (primaryType !== 2) this.addRobotFeatures(centerX, centerY, characterSize, secondaryInfluence);
                break;
            case 3: // Fantasy influence
                if (primaryType !== 3) this.addFantasyFeatures(centerX, centerY, characterSize, secondaryInfluence);
                break;
        }
        
        // Draw hybrid head
        this.drawHybridHead(centerX, centerY, characterSize, primaryType, secondaryType, secondaryInfluence, palette, detailsLevel);
        
        // Store character data for animation
        this.currentCharacter = {
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
    drawAdvancedBody(centerX, centerY, size, pose, palette, detailsLevel) {
        // Implementation for drawing detailed body with musculature, clothing, etc.
        this.elements.ctx.fillStyle = palette[1];
        
        if (pose === 'standing') {
            // Draw torso with more detail
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.12, centerY);
            this.elements.ctx.bezierCurveTo(
                centerX - size * 0.15, centerY - size * 0.05,
                centerX - size * 0.1, centerY + size * 0.4,
                centerX - size * 0.08, centerY + size * 0.4
            );
            this.elements.ctx.bezierCurveTo(
                centerX - size * 0.12, centerY + size * 0.35,
                centerX - size * 0.15, centerY,
                centerX - size * 0.12, centerY
            );
            this.elements.ctx.fill();
            
            // Right side of torso
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.12, centerY);
            this.elements.ctx.bezierCurveTo(
                centerX + size * 0.15, centerY - size * 0.05,
                centerX + size * 0.1, centerY + size * 0.4,
                centerX + size * 0.08, centerY + size * 0.4
            );
            this.elements.ctx.bezierCurveTo(
                centerX + size * 0.12, centerY + size * 0.35,
                centerX + size * 0.15, centerY,
                centerX + size * 0.12, centerY
            );
            this.elements.ctx.fill();
            
            // Add muscle definition if details level is high
            if (detailsLevel > 1) {
                this.elements.ctx.fillStyle = this.adjustColor(palette[1], -20);
                // Draw abdominal muscles
                this.elements.ctx.beginPath();
                this.elements.ctx.moveTo(centerX - size * 0.05, centerY + size * 0.1);
                this.elements.ctx.lineTo(centerX + size * 0.05, centerY + size * 0.1);
                this.elements.ctx.lineTo(centerX + size * 0.04, centerY + size * 0.15);
                this.elements.ctx.lineTo(centerX - size * 0.04, centerY + size * 0.15);
                this.elements.ctx.closePath();
                this.elements.ctx.fill();
                
                // Draw pectoral shading
                this.elements.ctx.beginPath();
                this.elements.ctx.arc(centerX - size * 0.08, centerY + size * 0.05, size * 0.06, Math.PI * 0.5, Math.PI * 1.5);
                this.elements.ctx.fill();
                
                this.elements.ctx.beginPath();
                this.elements.ctx.arc(centerX + size * 0.08, centerY + size * 0.05, size * 0.06, Math.PI * 1.5, Math.PI * 0.5);
                this.elements.ctx.fill();
            }
        } else if (pose === 'sitting') {
            // Implementation for sitting pose
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.15, centerY);
            this.elements.ctx.bezierCurveTo(
                centerX - size * 0.2, centerY - size * 0.05,
                centerX - size * 0.18, centerY + size * 0.3,
                centerX - size * 0.15, centerY + size * 0.3
            );
            this.elements.ctx.bezierCurveTo(
                centerX - size * 0.1, centerY + size * 0.25,
                centerX - size * 0.12, centerY,
                centerX - size * 0.15, centerY
            );
            this.elements.ctx.fill();
            
            // Right side of torso
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.15, centerY);
            this.elements.ctx.bezierCurveTo(
                centerX + size * 0.2, centerY - size * 0.05,
                centerX + size * 0.18, centerY + size * 0.3,
                centerX + size * 0.15, centerY + size * 0.3
            );
            this.elements.ctx.bezierCurveTo(
                centerX + size * 0.1, centerY + size * 0.25,
                centerX + size * 0.12, centerY,
                centerX + size * 0.15, centerY
            );
            this.elements.ctx.fill();
        } else { // running
            // Implementation for running pose
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.1, centerY);
            this.elements.ctx.bezierCurveTo(
                centerX - size * 0.15, centerY - size * 0.1,
                centerX - size * 0.12, centerY + size * 0.3,
                centerX - size * 0.08, centerY + size * 0.3
            );
            this.elements.ctx.bezierCurveTo(
                centerX - size * 0.05, centerY + size * 0.25,
                centerX - size * 0.08, centerY,
                centerX - size * 0.1, centerY
            );
            this.elements.ctx.fill();
            
            // Right side of torso
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.1, centerY);
            this.elements.ctx.bezierCurveTo(
                centerX + size * 0.15, centerY - size * 0.05,
                centerX + size * 0.08, centerY + size * 0.35,
                centerX + size * 0.05, centerY + size * 0.35
            );
            this.elements.ctx.bezierCurveTo(
                centerX + size * 0.02, centerY + size * 0.3,
                centerX + size * 0.05, centerY,
                centerX + size * 0.1, centerY
            );
            this.elements.ctx.fill();
        }
    }

    drawAdvancedHead(centerX, centerY, size, palette, detailsLevel, style) {
        // Draw head with advanced features based on style and details level
        this.elements.ctx.fillStyle = palette[1];
        
        // Head shape varies based on style
        if (style === 'realistic') {
            // Realistic head shape
            this.elements.ctx.beginPath();
            this.elements.ctx.ellipse(centerX, centerY - size * 0.2, size * 0.18, size * 0.22, 0, 0, Math.PI * 2);
            this.elements.ctx.fill();
        } else if (style === 'cartoon') {
            // Cartoon head shape
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX, centerY - size * 0.2, size * 0.2, 0, Math.PI * 2);
            this.elements.ctx.fill();
        } else if (style === 'anime') {
            // Anime head shape
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.15, centerY - size * 0.15);
            this.elements.ctx.quadraticCurveTo(centerX, centerY - size * 0.3, centerX + size * 0.15, centerY - size * 0.15);
            this.elements.ctx.quadraticCurveTo(centerX + size * 0.2, centerY, centerX + size * 0.15, centerY + size * 0.05);
            this.elements.ctx.quadraticCurveTo(centerX, centerY + size * 0.1, centerX - size * 0.15, centerY + size * 0.05);
            this.elements.ctx.quadraticCurveTo(centerX - size * 0.2, centerY, centerX - size * 0.15, centerY - size * 0.15);
            this.elements.ctx.fill();
        } else {
            // Default head shape
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX, centerY - size * 0.2, size * 0.18, 0, Math.PI * 2);
            this.elements.ctx.fill();
        }
        
        // Add details based on details level
        if (detailsLevel > 0) {
            // Basic shading
            this.elements.ctx.fillStyle = this.adjustColor(palette[1], -30);
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX - size * 0.05, centerY - size * 0.25, size * 0.1, Math.PI * 0.5, Math.PI * 1.5);
            this.elements.ctx.fill();
        }
        
        if (detailsLevel > 1) {
            // Highlight
            this.elements.ctx.fillStyle = this.adjustColor(palette[1], 40);
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX + size * 0.06, centerY - size * 0.25, size * 0.05, Math.PI * 1.5, Math.PI * 0.5);
            this.elements.ctx.fill();
        }
    }

    drawAdvancedLimbs(centerX, centerY, size, pose, palette, detailsLevel) {
        // Draw limbs with advanced details based on pose and details level
        this.elements.ctx.strokeStyle = palette[1];
        this.elements.ctx.lineWidth = size * 0.05;
        this.elements.ctx.lineCap = 'round';
        
        if (pose === 'standing') {
            // Arms
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.12, centerY + size * 0.1);
            this.elements.ctx.lineTo(centerX - size * 0.3, centerY + size * 0.2);
            this.elements.ctx.stroke();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.12, centerY + size * 0.1);
            this.elements.ctx.lineTo(centerX + size * 0.3, centerY + size * 0.2);
            this.elements.ctx.stroke();
            
            // Legs
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.08, centerY + size * 0.4);
            this.elements.ctx.lineTo(centerX - size * 0.1, centerY + size * 0.7);
            this.elements.ctx.stroke();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.08, centerY + size * 0.4);
            this.elements.ctx.lineTo(centerX + size * 0.1, centerY + size * 0.7);
            this.elements.ctx.stroke();
            
            // Hands and feet
            this.drawHandsAndFeet(centerX, centerY, size, pose, palette);
        } else if (pose === 'sitting') {
            // Sitting pose limbs
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.15, centerY + size * 0.1);
            this.elements.ctx.lineTo(centerX - size * 0.3, centerY);
            this.elements.ctx.stroke();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.15, centerY + size * 0.1);
            this.elements.ctx.lineTo(centerX + size * 0.3, centerY);
            this.elements.ctx.stroke();
            
            // Bent legs
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.15, centerY + size * 0.3);
            this.elements.ctx.lineTo(centerX - size * 0.2, centerY + size * 0.5);
            this.elements.ctx.lineTo(centerX - size * 0.1, centerY + size * 0.5);
            this.elements.ctx.stroke();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.15, centerY + size * 0.3);
            this.elements.ctx.lineTo(centerX + size * 0.2, centerY + size * 0.5);
            this.elements.ctx.lineTo(centerX + size * 0.1, centerY + size * 0.5);
            this.elements.ctx.stroke();
            
            // Hands and feet
            this.drawHandsAndFeet(centerX, centerY, size, pose, palette);
        } else { // running
            // Running pose limbs
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.1, centerY + size * 0.1);
            this.elements.ctx.lineTo(centerX - size * 0.3, centerY + size * 0.3);
            this.elements.ctx.stroke();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.1, centerY + size * 0.2);
            this.elements.ctx.lineTo(centerX + size * 0.3, centerY);
            this.elements.ctx.stroke();
            
            // Legs in running motion
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.08, centerY + size * 0.3);
            this.elements.ctx.lineTo(centerX - size * 0.15, centerY + size * 0.6);
            this.elements.ctx.stroke();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.08, centerY + size * 0.35);
            this.elements.ctx.lineTo(centerX + size * 0.15, centerY + size * 0.7);
            this.elements.ctx.stroke();
            
            // Hands and feet
            this.drawHandsAndFeet(centerX, centerY, size, pose, palette);
        }
    }

    drawAdvancedFace(centerX, centerY, size, palette, style) {
        // Draw advanced facial features based on style
        this.elements.ctx.fillStyle = palette[0];
        
        // Eyes
        if (style === 'anime') {
            // Anime-style eyes
            this.elements.ctx.fillStyle = '#ffffff';
            this.elements.ctx.beginPath();
            this.elements.ctx.ellipse(centerX - size * 0.06, centerY - size * 0.25, size * 0.05, size * 0.07, 0, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.ellipse(centerX + size * 0.06, centerY - size * 0.25, size * 0.05, size * 0.07, 0, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            // Irises
            this.elements.ctx.fillStyle = this.getRandomEyeColor();
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX - size * 0.06, centerY - size * 0.25, size * 0.02, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX + size * 0.06, centerY - size * 0.25, size * 0.02, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            // Pupils
            this.elements.ctx.fillStyle = '#000000';
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX - size * 0.06, centerY - size * 0.25, size * 0.01, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX + size * 0.06, centerY - size * 0.25, size * 0.01, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            // Highlights
            this.elements.ctx.fillStyle = '#ffffff';
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX - size * 0.065, centerY - size * 0.255, size * 0.005, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX + size * 0.055, centerY - size * 0.255, size * 0.005, 0, Math.PI * 2);
            this.elements.ctx.fill();
        } else {
            // Default eyes
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX - size * 0.05, centerY - size * 0.25, size * 0.03, 0, Math.PI * 2);
            this.elements.ctx.fill();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX + size * 0.05, centerY - size * 0.25, size * 0.03, 0, Math.PI * 2);
            this.elements.ctx.fill();
        }
        
        // Mouth - varies based on style and random expression
        const expression = Math.floor(Math.random() * 3); // 0: neutral, 1: smile, 2: surprised
        
        this.elements.ctx.strokeStyle = palette[0];
        this.elements.ctx.lineWidth = size * 0.01;
        
        if (expression === 0) {
            // Neutral mouth
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.03, centerY - size * 0.18);
            this.elements.ctx.lineTo(centerX + size * 0.03, centerY - size * 0.18);
            this.elements.ctx.stroke();
        } else if (expression === 1) {
            // Smile
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX, centerY - size * 0.18, size * 0.03, 0.2, Math.PI - 0.2);
            this.elements.ctx.stroke();
        } else {
            // Surprised
            this.elements.ctx.beginPath();
            this.elements.ctx.arc(centerX, centerY - size * 0.18, size * 0.02, 0, Math.PI * 2);
            this.elements.ctx.stroke();
        }
        
        // Additional facial features based on style
        if (style === 'realistic') {
            // Nose
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX, centerY - size * 0.22);
            this.elements.ctx.lineTo(centerX, centerY - size * 0.18);
            this.elements.ctx.stroke();
            
            // Eyebrows
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX - size * 0.07, centerY - size * 0.28);
            this.elements.ctx.lineTo(centerX - size * 0.03, centerY - size * 0.27);
            this.elements.ctx.stroke();
            
            this.elements.ctx.beginPath();
            this.elements.ctx.moveTo(centerX + size * 0.07, centerY - size * 0.28);
            this.elements.ctx.lineTo(centerX + size * 0.03, centerY - size * 0.27);
            this.elements.ctx.stroke();
        }
    }

    // Utility methods for advanced features
    getAdvancedColorPalette(style) {
        // Returns a color palette based on the selected style
        const palettes = {
            realistic: ['#2c3e50', '#e74c3c', '#ecf0f1', '#34495e', '#f39c12'],
            cartoon: ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71', '#9b59b6'],
            anime: ['#2c3e50', '#e74c3c', '#ecf0f1', '#3498db', '#f39c12'],
            pixel: ['#000000', '#555555', '#aaaaaa', '#ffffff', '#ff5555'],
            fantasy: ['#8e44ad', '#f1c40f', '#16a085', '#d35400', '#27ae60']
        };
        
        return palettes[style] || palettes.realistic;
    }

    getDetailsLevel() {
        // Returns the level of detail based on resolution
        const res = parseInt(this.elements.resolution.value);
        if (res <= 128) return 0;
        if (res <= 256) return 1;
        if (res <= 512) return 2;
        return 3;
    }

    adjustColor(color, amount) {
        // Adjusts the brightness of a color
        let usePound = false;
        
        if (color[0] === "#") {
            color = color.slice(1);
            usePound = true;
        }
        
        let num = parseInt(color, 16);
        let r = (num >> 16) + amount;
        
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
        
        let b = ((num >> 8) & 0x00FF) + amount;
        
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
        
        let g = (num & 0x0000FF) + amount;
        
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
        
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    getRandomEyeColor() {
        // Returns a random eye color
        const eyeColors = [
            '#4a6cf7', // blue
            '#28a745', // green
            '#6f42c1', // purple
            '#20c997', // teal
            '#fd7e14', // orange
            '#e83e8c'  // pink
        ];
        
        return eyeColors[Math.floor(Math.random() * eyeColors.length)];
    }

    drawBackground(style) {
        // Draws a background based on the style
        const width = this.elements.canvas.width;
        const height = this.elements.canvas.height;
        
        switch(style) {
            case 'realistic':
                // Gradient background
                const gradient = this.elements.ctx.createLinearGradient(0, 0, width, height);
                gradient.addColorStop(0, '#2c3e50');
                gradient.addColorStop(1, '#3498db');
                this.elements.ctx.fillStyle = gradient;
                this.elements.ctx.fillRect(0, 0, width, height);
                break;
                
            case 'cartoon':
                // Solid color background
                this.elements.ctx.fillStyle = '#f1c40f';
                this.elements.ctx.fillRect(0, 0, width, height);
                break;
                
            case 'anime':
                // Anime-style background with gradient
                const animeGradient = this.elements.ctx.createLinearGradient(0, 0, width, height);
                animeGradient.addColorStop(0, '#8e44ad');
                animeGradient.addColorStop(1, '#3498db');
                this.elements.ctx.fillStyle = animeGradient;
                this.elements.ctx.fillRect(0, 0, width, height);
                break;
                
            case 'pixel':
                // Pixel-style background
                this.elements.ctx.fillStyle = '#000000';
                this.elements.ctx.fillRect(0, 0, width, height);
                
                // Add some pixel dots
                this.elements.ctx.fillStyle = '#333333';
                for (let i = 0; i < 100; i++) {
                    const x = Math.floor(Math.random() * width);
                    const y = Math.floor(Math.random() * height);
                    this.elements.ctx.fillRect(x, y, 2, 2);
                }
                break;
                
            case 'fantasy':
                // Fantasy-style background
                const fantasyGradient = this.elements.ctx.createRadialGradient(
                    width/2, height/2, 0,
                    width/2, height/2, Math.max(width, height)/2
                );
                fantasyGradient.addColorStop(0, '#16a085');
                fantasyGradient.addColorStop(1, '#1a237e');
                this.elements.ctx.fillStyle = fantasyGradient;
                this.elements.ctx.fillRect(0, 0, width, height);
                break;
                
            default:
                // Default background
                this.elements.ctx.fillStyle = '#ecf0f1';
                this.elements.ctx.fillRect(0, 0, width, height);
        }
    }

    addSpecialEffects(style) {
        // Adds special effects based on style
        switch(style) {
            case 'fantasy':
                this.addMagicParticles();
                break;
            case 'anime':
                this.addSparkleEffects();
                break;
            case 'pixel':
                this.addPixelEffects();
                break;
        }
    }

    startIdleAnimation() {
        // Starts idle animation for the character
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        const animate = () => {
            this.elements.ctx.clearRect(0, 0, this.elements.canvas.width, this.elements.canvas.height);
            
            // Redraw background
            this.drawBackground(this.currentCharacter.style);
            
            // Redraw character with slight variations for animation
            this.animateCharacter();
            
            // Continue animation
            this.animationFrameId = requestAnimationFrame(animate);
        };
        
        this.animationFrameId = requestAnimationFrame(animate);
    }

    animateCharacter() {
        // Animates the current character based on its type
        if (!this.currentCharacter) return;
        
        const { type, centerX, centerY, characterSize, palette, pose } = this.currentCharacter;
        const time = Date.now() - this.currentCharacter.timestamp;
        
        switch(type) {
            case 'human':
                this.animateHumanCharacter(time, centerX, centerY, characterSize, palette, pose);
                break;
            case 'creature':
                this.animateCreatureCharacter(time, centerX, centerY, characterSize, palette, pose);
                break;
            case 'robot':
                this.animateRobotCharacter(time, centerX, centerY, characterSize, palette, pose);
                break;
            case 'fantasy':
                this.animateFantasyCharacter(time, centerX, centerY, characterSize, palette, pose);
                break;
            case 'hybrid':
                this.animateHybridCharacter(time, centerX, centerY, characterSize, palette, pose);
                break;
        }
    }

    // Additional advanced methods would be implemented here...
    // (drawClothing, drawHandsAndFeet, drawQuadrupedBody, drawBipedalBody, 
    // drawSlimeBody, drawInsectoidBody, drawAquaticBody, drawWings, drawTail, 
    // drawHorns, drawCreatureEyes, drawHumanoidRobot, drawMechRobot, 
    // drawSpiderRobot, drawOrbRobot, drawAntennas, drawJetpack, drawWeapon, 
    // drawRobotLights, drawElfBody, drawDwarfBody, drawOrcBody, drawFairyBody, 
    // drawDemonBody, drawMagicEffects, drawFantasyWings, drawCrown, 
    // drawFantasyFace, addHumanFeatures, addCreatureFeatures, addRobotFeatures, 
    // addFantasyFeatures, drawHybridHead, addMagicParticles, addSparkleEffects, 
    // addPixelEffects, animateHumanCharacter, animateCreatureCharacter, 
    // animateRobotCharacter, animateFantasyCharacter, animateHybridCharacter)

    // UI control methods
    showGenerationTimer() {
        this.elements.generationTimer.style.display = 'block';
    }

    hideGenerationTimer() {
        this.elements.generationTimer.style.display = 'none';
    }

    resetView() {
        // Reset any view settings if needed
    }

    saveState() {
        // Save the current state for undo/redo functionality
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.characterGenerator = new AdvancedCharacterGenerator();
});

export {constructor, init, generateCharacter, generateAdvancedCharacter,generateHumanCharacter, 
    generateCreatureCharacter, generateRobotCharacter, generateFantasyCharacter,generateHybridCharacter, 
    drawAdvancedBody, drawAdvancedHead, drawAdvancedLimbs, drawAdvancedFace,getAdvancedColorPalette,
    getDetailsLevel, adjustColor, getRandomEyeColor, drawBackground, addSpecialEffects,startIdleAnimation,
    animateCharacter, showGenerationTimer, hideGenerationTimer, resetView, saveState,
};
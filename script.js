// At the top of script.js, add:
import {getColorPalette, generateTechLogo, generateFoodLogo, generateFashionLogo, generateHealthLogo, 
    generateAbstractLogo, generateLogo, generateStyledLogo, resetView, showGenerationTimer, hideGenerationTimer,
    saveState, initLogoGenerator,
} from './logo.js';

import {constructor, init, generateAvatar, gnerateStyledAvatar, generateGeometricAvatar, generatePixelArtAvatar,
    generateMinimalistAvatar, generateRealisticAvatar, generateAbstractAvatar, generateCyberpunkAvatar, generateWatercolorAvatar,
    generateLowPolyAvatar, generateCartoonAvatar, drawRealisticEyes, drawRealisticMouth, drawCyberpunkEyes,
    drawCircuitPattern, drawWatercolorEyes, drawWatercolorMouth, drawBackground, applyMoodEffects, applyFeatures,
    applySizeScaling, getColorPalette, lightenColor, darkenColor, adjustTransparency, extractHue, addNoiseTexture,
    hslToRgb, drawShape, getTrianglePoints, showGenerationTimer, hideGenerationTimer, resetView, saveState,
    undo, redo, exportToPNG, exportToJPEG, getImageDataURL, applyFilter, animateTransition, 
} from './avatar.js';

import {constructor, init, generateCharacter, generateAdvancedCharacter,generateHumanCharacter, 
    generateCreatureCharacter, generateRobotCharacter, generateFantasyCharacter,generateHybridCharacter, 
    drawAdvancedBody, drawAdvancedHead, drawAdvancedLimbs, drawAdvancedFace,getAdvancedColorPalette,
    getDetailsLevel, adjustColor, getRandomEyeColor, drawBackground, addSpecialEffects,startIdleAnimation,
    animateCharacter, showGenerationTimer, hideGenerationTimer, resetView, saveState,
} from './character.js';

import {constructor, resizeCanvas, setStyle, setComplexity, setDensity, setPalette, generateArt, generateAbstractArt,
    generateImpressionistArt,generatePointillismArt, generateCubismArt, generatePopArt, generateVanGoghStyle,
    generateRenaissanceStyle,generateJapaneseStyle,generateSurrealism, generatePixelArt,generateFractalArt,
    drawFractal,generateFluidArt,drawFluidDrop, generateGeometricArt, drawGeometricShape, generateCyberpunkArt,
    createGradientBackground,adjustColorAlpha, addParticles, animate, startAnimation, stopAnimation, saveArtwork,
    clearCanvas,
} from './artwork.js';

import {getColorPalette,hexToRgb, clamp,distance, generateVoronoiArt, generatePerlinNoiseArt,
    generateFractalArt, generateCellularAutomata, generateGeneticAlgorithmArt, generateNeuralStyleTransfer,
    generateWaveFunctionCollapse, generateReactionDiffusion, generateLSystemFractal, generateParticleSystem,
    collapseCell, propagateConstraints,startAlgorithm,
} from './algorithms.js';

import {downloadImage, generateGif, shareOnFacebook, shareOnInstagram, shareOnTwitter,
    copyImageLink, saveToGallery, loadGallery, updateGallery, deleteGalleryItem,clearGallery,
} from './share.js';

import {applyTexture,applyLighting,} from './postprocessing.js';

import {
    getColorPalette, showGenerationTimer, hideGenerationTimer, startInfiniteGeneration, startInfiniteCharacters,
    startInfiniteAvatars, startInfiniteLogos, stopInfiniteGeneration, initHistory, saveState, updateHistoryButtons, undo, redo,
    zoom, zoomIn, zoomOut, resetView, updateZoomDisplay, updateCanvasTransform, toggleFullscreen, handleFullscreenChange,
    handleKeydown, hexToRgb, rgbToHex, clamp,
} from './utilities.js';

// Global state object to manage application state
const AppState = {
    currentMode: 'artwork',
    isGenerating: false,
    generationTimerInterval: null,
    infiniteInterval: null,
    imageData: null,
    currentColor: '#FF6B6B',
    selectedColorBox: null,
    history: [],
    historyIndex: -1,
    zoomLevel: 1,
    isDragging: false,
    lastX: 0,
    lastY: 0,
    offsetX: 0,
    offsetY: 0,
    colorHistory: [],
    isFullscreen: false,
    galleryItems: [],
    elements: {},
    // Add hybrid generation settings
    hybridSettings: {
        styleWeight: 0.4,
        algorithmWeight: 0.3,
        characterWeight: 0.2,
        logoWeight: 0.1,
        blendMode: 'overlay'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    AppState.elements = {
        canvas: document.getElementById('previewCanvas'),
        ctx: null,
        generateBtn: document.getElementById('generateBtn'),
        infiniteBtn: document.getElementById('infiniteBtn'),
        stopInfiniteBtn: document.getElementById('stopInfiniteBtn'),
        artStyle: document.getElementById('artStyle'),
        resolution: document.getElementById('resolution'),
        resolutionWarning: document.getElementById('resolutionWarning'),
        colorScheme: document.getElementById('colorScheme'),
        pixelDensity: document.getElementById('pixelDensity'),
        complexity: document.getElementById('complexity'),
        algorithm: document.getElementById('algorithm'),
        symmetry: document.getElementById('symmetry'),
        texture: document.getElementById('texture'),
        lighting: document.getElementById('lighting'),
        brushSize: document.getElementById('brushSize'),
        customPalette: document.getElementById('customPalette'),
        customPaletteContainer: document.getElementById('customPaletteContainer'),
        presetPalette: document.getElementById('presetPalette'),
        sizeInfo: document.getElementById('sizeInfo'),
        generationTimer: document.getElementById('generationTimer'),
        progressFill: document.getElementById('progressFill'),
        timerValue: document.getElementById('timerValue'),
        gallery: document.getElementById('gallery'),
        saveToGalleryBtn: document.getElementById('saveToGallery'),
        clearGalleryBtn: document.getElementById('clearGallery'),
        modeButtons: document.querySelectorAll('.mode-btn'),
        
        // Character controls
        characterControls: document.querySelector('.character-controls'),
        generateCharacterBtn: document.getElementById('generateCharacter'),
        infiniteCharacterBtn: document.getElementById('infiniteCharacter'),
        characterType: document.getElementById('characterType'),
        characterPose: document.getElementById('characterPose'),
        characterSize: document.getElementById('characterSize'),
        characterStyle: document.getElementById('characterStyle'),
        
        // Avatar controls
        avatarControls: document.querySelector('.avatar-controls'),
        generateAvatarBtn: document.getElementById('generateAvatar'),
        infiniteAvatarBtn: document.getElementById('infiniteAvatar'),
        avatarStyle: document.getElementById('avatarStyle'),
        avatarMood: document.getElementById('avatarMood'),
        avatarSize: document.getElementById('avatarSize'),
        avatarFeatures: document.getElementById('avatarFeatures'),
        
        // Logo controls
        logoControls: document.querySelector('.logo-controls'),
        generateLogoBtn: document.getElementById('generateLogo'),
        infiniteLogoBtn: document.getElementById('infiniteLogo'),
        logoText: document.getElementById('logoText'),
        logoIndustry: document.getElementById('logoIndustry'),
        logoStyle: document.getElementById('logoStyle'),
        logoComplexity: document.getElementById('logoComplexity'),
        logoComplexityValue: document.getElementById('logoComplexityValue'),
        
        // Artwork controls
        artworkControls: document.querySelector('.artwork-controls'),
        
        // Download buttons
        downloadPng: document.getElementById('downloadPng'),
        downloadJpg: document.getElementById('downloadJpg'),
        downloadSvg: document.getElementById('downloadSvg'),
        downloadGif: document.getElementById('downloadGif'),
        
        // Share buttons
        shareTwitter: document.getElementById('shareTwitter'),
        shareFacebook: document.getElementById('shareFacebook'),
        shareInstagram: document.getElementById('shareInstagram'),
        copyLink: document.getElementById('copyLink'),
        
        // Output displays
        densityValue: document.getElementById('densityValue'),
        complexityValue: document.getElementById('complexityValue'),
        brushValue: document.getElementById('brushValue'),
        
        // New UI elements
        undoBtn: document.getElementById('undoBtn'),
        redoBtn: document.getElementById('redoBtn'),
        zoomInBtn: document.getElementById('zoomInBtn'),
        zoomOutBtn: document.getElementById('zoomOutBtn'),
        resetViewBtn: document.getElementById('resetViewBtn'),
        fullscreenBtn: document.getElementById('fullscreenBtn'),
        colorPicker: document.getElementById('colorPicker'),
        colorHistory: document.getElementById('colorHistory'),
        canvasContainer: document.getElementById('canvasContainer'),
        zoomLevel: document.getElementById('zoomLevel'),
        
        // Random generation button
        randomGenerateBtn: document.getElementById('randomGenerateBtn')
    };

    // Initialize canvas context
    AppState.elements.ctx = AppState.elements.canvas.getContext('2d', { willReadFrequently: true });

    // Initialize modules
    initLogoGenerator();
    init();
    initHistory();

    // Set up the application
    updateSliderValues();
    initColorPalette();
    updateSizeInfo();
    loadGallery();
    generateRandomImage(); // Start with a random image
    initCanvasInteraction();
    initColorPicker();
    updateZoomDisplay();

    // Event listeners
    AppState.elements.generateBtn.addEventListener('click', generateImage);
    AppState.elements.infiniteBtn.addEventListener('click', startInfiniteGeneration);
    AppState.elements.stopInfiniteBtn.addEventListener('click', stopInfiniteGeneration);
    AppState.elements.downloadPng.addEventListener('click', () => downloadImage('png'));
    AppState.elements.downloadJpg.addEventListener('click', () => downloadImage('jpg'));
    AppState.elements.downloadSvg.addEventListener('click', () => downloadImage('svg'));
    AppState.elements.downloadGif.addEventListener('click', generateGif);
    
    AppState.elements.shareTwitter.addEventListener('click', shareOnTwitter);
    AppState.elements.shareFacebook.addEventListener('click', shareOnFacebook);
    AppState.elements.shareInstagram.addEventListener('click', shareOnInstagram);
    AppState.elements.copyLink.addEventListener('click', copyImageLink);
    
    AppState.elements.pixelDensity.addEventListener('input', updateSliderValues);
    AppState.elements.complexity.addEventListener('input', updateSliderValues);
    AppState.elements.brushSize.addEventListener('input', updateSliderValues);
    AppState.elements.logoComplexity.addEventListener('input', function() {
        AppState.elements.logoComplexityValue.value = this.value;
    });
    
    AppState.elements.colorScheme.addEventListener('change', function() {
        AppState.elements.customPaletteContainer.style.display = this.value === 'custom' ? 'block' : 'none';
    });
    
    AppState.elements.resolution.addEventListener('change', function() {
        AppState.elements.resolutionWarning.style.display = this.value > 512 ? 'block' : 'none';
        updateSizeInfo();
        generateImage();
    });
    
    AppState.elements.saveToGalleryBtn.addEventListener('click', saveToGallery);
    AppState.elements.clearGalleryBtn.addEventListener('click', clearGallery);
    
    // New UI event listeners
    AppState.elements.undoBtn.addEventListener('click', undo);
    AppState.elements.redoBtn.addEventListener('click', redo);
    AppState.elements.zoomInBtn.addEventListener('click', zoomIn);
    AppState.elements.zoomOutBtn.addEventListener('click', zoomOut);
    AppState.elements.resetViewBtn.addEventListener('click', resetView);
    AppState.elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    AppState.elements.colorPicker.addEventListener('input', function() {
        AppState.currentColor = this.value;
        addToColorHistory(this.value);
        updateSelectedColorBox(this.value);
    });

    // Random generation button
    AppState.elements.randomGenerateBtn.addEventListener('click', generateRandomImage);

    // Mode switching
    AppState.elements.modeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            AppState.elements.modeButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            AppState.currentMode = this.dataset.mode;
            
            // Hide all control groups
            AppState.elements.artworkControls.style.display = 'none';
            AppState.elements.characterControls.style.display = 'none';
            AppState.elements.avatarControls.style.display = 'none';
            AppState.elements.logoControls.style.display = 'none';
            
            // Show current mode controls
            document.querySelector(`.${AppState.currentMode}-controls`).style.display = 'block';
            
            // Generate based on mode
            switch(AppState.currentMode) {
                case 'artwork':
                    generateImage();
                    break;
                case 'character':
                    generateCharacter();
                    break;
                case 'avatar':
                    generateAvatar();
                    break;
                case 'logo':
                    generateLogo();
                    break;
            }
        });
    });
    
    // Character generation
    AppState.elements.generateCharacterBtn.addEventListener('click', generateCharacter);
    AppState.elements.infiniteCharacterBtn.addEventListener('click', startInfiniteCharacters);
    
    // Avatar generation
    AppState.elements.generateAvatarBtn.addEventListener('click', generateAvatar);
    AppState.elements.infiniteAvatarBtn.addEventListener('click', startInfiniteAvatars);
    
    // Logo generation
    AppState.elements.generateLogoBtn.addEventListener('click', generateLogo);
    AppState.elements.infiniteLogoBtn.addEventListener('click', startInfiniteLogos);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeydown);

    // Set the initial mode
    document.querySelector('[data-mode="artwork"]').click();

    // Add hybrid generation button
    AppState.elements.hybridGenerateBtn = document.getElementById('hybridGenerateBtn');
    AppState.elements.hybridSettingsBtn = document.getElementById('hybridSettingsBtn');
    AppState.elements.hybridSettingsPanel = document.getElementById('hybridSettingsPanel');
    AppState.elements.styleWeight = document.getElementById('styleWeight');
    AppState.elements.algorithmWeight = document.getElementById('algorithmWeight');
    AppState.elements.characterWeight = document.getElementById('characterWeight');
    AppState.elements.logoWeight = document.getElementById('logoWeight');
    AppState.elements.blendMode = document.getElementById('blendMode');
    AppState.elements.styleWeightValue = document.getElementById('styleWeightValue');
    AppState.elements.algorithmWeightValue = document.getElementById('algorithmWeightValue');
    AppState.elements.characterWeightValue = document.getElementById('characterWeightValue');
    AppState.elements.logoWeightValue = document.getElementById('logoWeightValue');
    
    // Initialize hybrid settings
    initHybridSettings();
    
    // Add event listeners for hybrid generation
    AppState.elements.hybridGenerateBtn.addEventListener('click', generateHybridArt);
    AppState.elements.hybridSettingsBtn.addEventListener('click', toggleHybridSettings);
    
    // Add event listeners for hybrid settings sliders
    AppState.elements.styleWeight.addEventListener('input', updateHybridWeights);
    AppState.elements.algorithmWeight.addEventListener('input', updateHybridWeights);
    AppState.elements.characterWeight.addEventListener('input', updateHybridWeights);
    AppState.elements.logoWeight.addEventListener('input', updateHybridWeights);
    AppState.elements.blendMode.addEventListener('change', updateBlendMode);
});

// Utility functions
function updateSliderValues() {
    AppState.elements.densityValue.value = AppState.elements.pixelDensity.value;
    AppState.elements.complexityValue.value = AppState.elements.complexity.value;
    AppState.elements.brushValue.value = AppState.elements.brushSize.value;
}

function updateSizeInfo() {
    const res = parseInt(AppState.elements.resolution.value);
    AppState.elements.sizeInfo.textContent = `Image size: ${res}x${res} pixels | Total pixels: ${(res * res).toLocaleString()}`;
}

function initColorPalette() {
    const colorBoxes = AppState.elements.presetPalette.querySelectorAll('.color-box');
    if (colorBoxes.length > 0) {
        colorBoxes[0].classList.add('active');
        AppState.selectedColorBox = colorBoxes[0];
        AppState.currentColor = colorBoxes[0].dataset.color;
        
        colorBoxes.forEach(box => {
            box.addEventListener('click', function() {
                if (AppState.selectedColorBox) {
                    AppState.selectedColorBox.classList.remove('active');
                }
                this.classList.add('active');
                AppState.selectedColorBox = this;
                AppState.currentColor = this.dataset.color;
                AppState.elements.colorPicker.value = AppState.currentColor;
                addToColorHistory(AppState.currentColor);
            });
        });
    }
}

function initColorPicker() {
    // Initialize color picker with current color
    AppState.elements.colorPicker.value = AppState.currentColor;
    
    // Load color history from localStorage if available
    const savedColorHistory = localStorage.getItem('colorHistory');
    if (savedColorHistory) {
        AppState.colorHistory = JSON.parse(savedColorHistory);
        updateColorHistoryDisplay();
    }
}

function addToColorHistory(color) {
    // Remove if already exists
    const index = AppState.colorHistory.indexOf(color);
    if (index > -1) {
        AppState.colorHistory.splice(index, 1);
    }
    
    // Add to beginning
    AppState.colorHistory.unshift(color);
    
    // Limit to 12 colors
    if (AppState.colorHistory.length > 12) {
        AppState.colorHistory.pop();
    }
    
    // Save to localStorage
    localStorage.setItem('colorHistory', JSON.stringify(AppState.colorHistory));
    
    // Update display
    updateColorHistoryDisplay();
}

function updateColorHistoryDisplay() {
    AppState.elements.colorHistory.innerHTML = '';
    
    AppState.colorHistory.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;
        colorBox.dataset.color = color;
        colorBox.title = color;
        
        colorBox.addEventListener('click', function() {
            AppState.currentColor = color;
            AppState.elements.colorPicker.value = color;
            updateSelectedColorBox(color);
        });
        
        AppState.elements.colorHistory.appendChild(colorBox);
    });
}

function updateSelectedColorBox(color) {
    // Update selected color box in both palettes
    const allColorBoxes = document.querySelectorAll('.color-box');
    allColorBoxes.forEach(box => {
        box.classList.remove('active');
        if (box.dataset.color === color) {
            box.classList.add('active');
            AppState.selectedColorBox = box;
        }
    });
}

function initCanvasInteraction() {
    let isDrawing = false;
    let isErasing = false;
    
    AppState.elements.canvas.addEventListener('mousedown', (e) => {
        if (AppState.isGenerating) return;
        isDrawing = true;
        isErasing = e.button === 2 || e.ctrlKey;
        drawOnCanvas(e);
        
        // Save state for undo
        saveState();
    });
    
    AppState.elements.canvas.addEventListener('mousemove', (e) => {
        if (AppState.isGenerating) return;
        if (isDrawing) {
            drawOnCanvas(e);
        }
    });
    
    AppState.elements.canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
    
    AppState.elements.canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });
    
    AppState.elements.canvas.addEventListener('contextmenu', (e) => {
        if (AppState.isGenerating) return;
        e.preventDefault();
        // Sample color on right-click
        if (!isDrawing) {
            sampleColor(e);
        }
    });
    
    // Touch support
    AppState.elements.canvas.addEventListener('touchstart', (e) => {
        if (AppState.isGenerating) return;
        e.preventDefault();
        isDrawing = true;
        isErasing = e.touches.length > 1; // Use two fingers for erasing
        drawOnCanvas(e.touches[0]);
        
        // Save state for undo
        saveState();
    });
    
    AppState.elements.canvas.addEventListener('touchmove', (e) => {
        if (AppState.isGenerating) return;
        e.preventDefault();
        if (isDrawing) {
            drawOnCanvas(e.touches[0]);
        }
    });
    
    AppState.elements.canvas.addEventListener('touchend', () => {
        isDrawing = false;
    });
    
    // Canvas panning
    AppState.elements.canvasContainer.addEventListener('mousedown', (e) => {
        if (e.target === AppState.elements.canvas && (e.button === 1 || e.altKey)) {
            AppState.isDragging = true;
            AppState.lastX = e.clientX;
            AppState.lastY = e.clientY;
            e.preventDefault();
        }
    });
    
    AppState.elements.canvasContainer.addEventListener('mousemove', (e) => {
        if (AppState.isDragging) {
            const dx = e.clientX - AppState.lastX;
            const dy = e.clientY - AppState.lastY;
            AppState.lastX = e.clientX;
            AppState.lastY = e.clientY;
            
            AppState.offsetX += dx;
            AppState.offsetY += dy;
            
            updateCanvasTransform();
        }
    });
    
    AppState.elements.canvasContainer.addEventListener('mouseup', () => {
        AppState.isDragging = false;
    });
    
    AppState.elements.canvasContainer.addEventListener('mouseleave', () => {
        AppState.isDragging = false;
    });
    
    // Zoom with mouse wheel
    AppState.elements.canvasContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 1.1 : 0.9;
        zoom(delta, e.offsetX, e.offsetY);
    });
}

function drawOnCanvas(e) {
    const rect = AppState.elements.canvas.getBoundingClientRect();
    const scaleX = AppState.elements.canvas.width / rect.width;
    const scaleY = AppState.elements.canvas.height / rect.height;
    
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const brushSizeValue = parseInt(AppState.elements.brushSize.value);
    
    // Get current image data to modify
    if (!AppState.imageData) {
        AppState.imageData = AppState.elements.ctx.getImageData(0, 0, AppState.elements.canvas.width, AppState.elements.canvas.height);
    }
    
    // Draw with the current brush size
    const halfBrush = Math.floor(brushSizeValue / 2);
    
    for (let dy = -halfBrush; dy <= halfBrush; dy++) {
        for (let dx = -halfBrush; dx <= halfBrush; dx++) {
            if (dx*dx + dy*dy <= halfBrush*halfBrush) { // Circular brush
                const px = x + dx;
                const py = y + dy;
                
                if (px >= 0 && px < AppState.elements.canvas.width && py >= 0 && py < AppState.elements.canvas.height) {
                    const index = (py * AppState.elements.canvas.width + px) * 4;
                    
                    if (isErasing) {
                        // Erase to background color
                        AppState.imageData.data[index] = 34;
                        AppState.imageData.data[index + 1] = 34;
                        AppState.imageData.data[index + 2] = 34;
                        AppState.imageData.data[index + 3] = 255;
                    } else {
                        // Draw with selected color
                        const rgb = hexToRgb(AppState.currentColor);
                        AppState.imageData.data[index] = rgb.r;
                        AppState.imageData.data[index + 1] = rgb.g;
                        AppState.imageData.data[index + 2] = rgb.b;
                    }
                }
            }
        }
    }
    
    AppState.elements.ctx.putImageData(AppState.imageData, 0, 0);
}

function sampleColor(e) {
    const rect = AppState.elements.canvas.getBoundingClientRect();
    const scaleX = AppState.elements.canvas.width / rect.width;
    const scaleY = AppState.elements.canvas.height / rect.height;
    
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    
    const pixel = AppState.elements.ctx.getImageData(x, y, 1, 1).data;
    AppState.currentColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    
    // Update the color picker
    AppState.elements.colorPicker.value = rgbToHex(pixel[0], pixel[1], pixel[2]);
    
    // Add to color history
    addToColorHistory(rgbToHex(pixel[0], pixel[1], pixel[2]));
    
    // Update the selected color in the palette
    updateSelectedColorBox(rgbToHex(pixel[0], pixel[1], pixel[2]));
}

// Enhanced image generation function
function generateImage() {
    if (AppState.isGenerating) return;
    
    const res = parseInt(AppState.elements.resolution.value);
    AppState.elements.canvas.width = res;
    AppState.elements.canvas.height = res;
    
    // Reset view when generating new image
    resetView();
    
    showGenerationTimer();
    
    // Use requestAnimationFrame for smoother animation
    const startTime = Date.now();
    
    function generateFrame() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 1000, 1);
        
        // Update progress bar
        AppState.elements.progressFill.style.width = `${progress * 100}%`;
        AppState.elements.timerValue.textContent = `${Math.ceil(10 - progress * 10)}s`;
        
        if (progress < 1) {
            requestAnimationFrame(generateFrame);
        } else {
            const style = AppState.elements.artStyle.value;
            const complexityValue = parseInt(AppState.elements.complexity.value);
            const densityValue = parseInt(AppState.elements.pixelDensity.value);
            const algorithm = AppState.elements.algorithm.value;
            
            // Generate based on selected algorithm
            switch(algorithm) {
                case 'voronoi':
                    generateVoronoiArt(complexityValue, densityValue);
                    break;
                case 'perlin':
                    generatePerlinNoiseArt(complexityValue, densityValue);
                    break;
                case 'fractal':
                    generateFractalArt(complexityValue, densityValue);
                    break;
                case 'cellular':
                    generateCellularAutomata(complexityValue, densityValue);
                    break;
                case 'genetic':
                    generateGeneticAlgorithmArt(complexityValue, densityValue);
                    break;
                case 'neural':
                    generateNeuralStyleTransfer(complexityValue, densityValue);
                    break;
                case 'wave':
                    generateWaveFunctionCollapse(complexityValue, densityValue);
                    break;
                default:
                    // Generate based on selected style
                    switch(style) {
                        case 'abstract':
                            generateAbstractArt(complexityValue, densityValue);
                            break;
                        case 'impressionist':
                            generateImpressionistArt(complexityValue, densityValue);
                            break;
                        case 'pointillism':
                            generatePointillismArt(complexityValue, densityValue);
                            break;
                        case 'cubism':
                            generateCubismArt(complexityValue, densityValue);
                            break;
                        case 'popart':
                            generatePopArt(complexityValue, densityValue);
                            break;
                        case 'vangogh':
                            generateVanGoghStyle(complexityValue, densityValue);
                            break;
                        case 'renaissance':
                            generateRenaissanceStyle(complexityValue, densityValue);
                            break;
                        case 'japanese':
                            generateJapaneseStyle(complexityValue, densityValue);
                            break;
                        case 'surreal':
                            generateSurrealism(complexityValue, densityValue);
                            break;
                        case 'digital':
                        default:
                            generatePixelArt(complexityValue, densityValue);
                            break;
                    }
                    break;
            }
            
            // Apply texture if selected
            applyTexture();
            
            // Apply lighting if selected
            applyLighting();
            
            hideGenerationTimer();
            AppState.imageData = AppState.elements.ctx.getImageData(0, 0, AppState.elements.canvas.width, AppState.elements.canvas.height);
            
            // Save state for undo
            saveState();
        }
    }
    
    requestAnimationFrame(generateFrame);
}

// Random generation function
function generateRandomImage() {
    // Randomly select a mode
    const modes = ['artwork', 'character', 'avatar', 'logo'];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    
    // Update UI to reflect the selected mode
    AppState.elements.modeButtons.forEach(btn => {
        if (btn.dataset.mode === randomMode) {
            btn.click();
        }
    });
    
    // Set random parameters based on the selected mode
    switch (randomMode) {
        case 'artwork':
            // Random artwork parameters
            AppState.elements.artStyle.value = ['abstract', 'impressionist', 'pointillism', 'cubism', 
                'popart', 'vangogh', 'renaissance', 'japanese', 'surreal', 'digital'][Math.floor(Math.random() * 10)];
            AppState.elements.algorithm.value = ['voronoi', 'perlin', 'fractal', 'cellular', 
                'genetic', 'neural', 'wave'][Math.floor(Math.random() * 7)];
            AppState.elements.complexity.value = Math.floor(Math.random() * 100);
            AppState.elements.pixelDensity.value = Math.floor(Math.random() * 100);
            updateSliderValues();
            generateImage();
            break;
            
        case 'character':
            // Random character parameters
            AppState.elements.characterType.value = ['human', 'creature', 'robot', 'fantasy', 'hybrid'][Math.floor(Math.random() * 5)];
            AppState.elements.characterPose.value = ['standing', 'sitting', 'running', 'jumping', 'dancing'][Math.floor(Math.random() * 5)];
            AppState.elements.characterSize.value = Math.floor(Math.random() * 100);
            AppState.elements.characterStyle.value = ['realistic', 'cartoon', 'abstract', 'pixel', 'lowpoly'][Math.floor(Math.random() * 5)];
            generateCharacter();
            break;
            
        case 'avatar':
            // Random avatar parameters
            AppState.elements.avatarStyle.value = ['realistic', 'geometric', 'pixel', 'minimalist', 'abstract', 
                'cyberpunk', 'watercolor', 'lowpoly', 'cartoon'][Math.floor(Math.random() * 9)];
            AppState.elements.avatarMood.value = ['happy', 'sad', 'angry', 'surprised', 'neutral'][Math.floor(Math.random() * 5)];
            AppState.elements.avatarSize.value = Math.floor(Math.random() * 100);
            AppState.elements.avatarFeatures.value = ['default', 'detailed', 'simple', 'exaggerated'][Math.floor(Math.random() * 4)];
            generateAvatar();
            break;
            
        case 'logo':
            // Random logo parameters
            AppState.elements.logoIndustry.value = ['tech', 'food', 'fashion', 'health', 'abstract'][Math.floor(Math.random() * 5)];
            AppState.elements.logoStyle.value = ['minimal', 'classic', 'modern', 'vintage', 'futuristic'][Math.floor(Math.random() * 5)];
            AppState.elements.logoComplexity.value = Math.floor(Math.random() * 100);
            AppState.elements.logoComplexityValue.value = AppState.elements.logoComplexity.value;
            AppState.elements.logoText.value = ['TechCorp', 'Foodies', 'FashionHub', 'HealthPlus', 'Innovate'][Math.floor(Math.random() * 5)];
            generateLogo();
            break;
    }
}

// Enhanced generation functions that combine multiple techniques
function generateHybridArt() {
    // Create a hybrid artwork combining multiple generation techniques
    const width = AppState.elements.canvas.width;
    const height = AppState.elements.canvas.height;
    
    // Start with a base algorithm
    const baseAlgorithm = ['voronoi', 'perlin', 'fractal', 'cellular'][Math.floor(Math.random() * 4)];
    const complexity = 50 + Math.floor(Math.random() * 50);
    const density = 30 + Math.floor(Math.random() * 70);
    
    // Generate base image
    startAlgorithm(baseAlgorithm, complexity, density);
    
    // Get the base image data
    const baseImageData = AppState.elements.ctx.getImageData(0, 0, width, height);
    
    // Apply additional effects based on random selection
    const effectType = Math.floor(Math.random() * 3);
    
    switch (effectType) {
        case 0:
            // Overlay with character elements
            generateCharacterSilhouette(baseImageData);
            break;
        case 1:
            // Overlay with avatar elements
            generateAvatarFeatures(baseImageData);
            break;
        case 2:
            // Overlay with logo elements
            generateLogoSymbols(baseImageData);
            break;
    }
    
    // Apply final processing
    applyTexture();
    applyLighting();
    
    // Update the state
    AppState.imageData = AppState.elements.ctx.getImageData(0, 0, width, height);
    saveState();
}

function generateCharacterSilhouette(baseImageData) {
    // Generate character silhouette and blend with base image
    const width = AppState.elements.canvas.width;
    const height = AppState.elements.canvas.height;
    
    // Create a temporary canvas for the character
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Generate a character
    generateCharacter();
    const characterData = tempCtx.getImageData(0, 0, width, height);
    
    // Blend the character with the base image
    const finalImageData = AppState.elements.ctx.createImageData(width, height);
    
    for (let i = 0; i < baseImageData.data.length; i += 4) {
        const baseR = baseImageData.data[i];
        const baseG = baseImageData.data[i + 1];
        const baseB = baseImageData.data[i + 2];
        
        const charR = characterData.data[i];
        const charG = characterData.data[i + 1];
        const charB = characterData.data[i + 2];
        
        // Use character as a mask or blend based on alpha
        if (charR + charG + charB > 100) { // If not background
            // Blend with base image
            finalImageData.data[i] = (baseR + charR) / 2;
            finalImageData.data[i + 1] = (baseG + charG) / 2;
            finalImageData.data[i + 2] = (baseB + charB) / 2;
        } else {
            // Use base image
            finalImageData.data[i] = baseR;
            finalImageData.data[i + 1] = baseG;
            finalImageData.data[i + 2] = baseB;
        }
        finalImageData.data[i + 3] = 255;
    }
    
    AppState.elements.ctx.putImageData(finalImageData, 0, 0);
}

function generateAvatarFeatures(baseImageData) {
    // Similar to generateCharacterSilhouette but for avatar features
    const width = AppState.elements.canvas.width;
    const height = AppState.elements.canvas.height;
    
    // Create a temporary canvas for the avatar
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Generate an avatar
    generateAvatar();
    const avatarData = tempCtx.getImageData(0, 0, width, height);
    
    // Blend techniques similar to generateCharacterSilhouette
    // (Implementation would be similar to the character function)
}

function generateLogoSymbols(baseImageData) {
    // Similar to generateCharacterSilhouette but for logo elements
    const width = AppState.elements.canvas.width;
    const height = AppState.elements.canvas.height;
    
    // Create a temporary canvas for the logo
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Generate a logo
    generateLogo();
    const logoData = tempCtx.getImageData(0, 0, width, height);
    
    // Blend techniques similar to generateCharacterSilhouette
    // (Implementation would be similar to the character function)
}

function initHybridSettings() {
    AppState.elements.styleWeight.value = AppState.hybridSettings.styleWeight * 100;
    AppState.elements.algorithmWeight.value = AppState.hybridSettings.algorithmWeight * 100;
    AppState.elements.characterWeight.value = AppState.hybridSettings.characterWeight * 100;
    AppState.elements.logoWeight.value = AppState.hybridSettings.logoWeight * 100;
    AppState.elements.blendMode.value = AppState.hybridSettings.blendMode;
    
    updateHybridWeightValues();
}

function updateHybridWeights() {
    // Normalize weights to sum to 1
    const total = parseInt(AppState.elements.styleWeight.value) + 
                 parseInt(AppState.elements.algorithmWeight.value) + 
                 parseInt(AppState.elements.characterWeight.value) + 
                 parseInt(AppState.elements.logoWeight.value);
    
    if (total === 0) return; // Prevent division by zero
    
    AppState.hybridSettings.styleWeight = parseInt(AppState.elements.styleWeight.value) / total;
    AppState.hybridSettings.algorithmWeight = parseInt(AppState.elements.algorithmWeight.value) / total;
    AppState.hybridSettings.characterWeight = parseInt(AppState.elements.characterWeight.value) / total;
    AppState.hybridSettings.logoWeight = parseInt(AppState.elements.logoWeight.value) / total;
    
    updateHybridWeightValues();
}

function updateHybridWeightValues() {
    AppState.elements.styleWeightValue.textContent = Math.round(AppState.hybridSettings.styleWeight * 100) + '%';
    AppState.elements.algorithmWeightValue.textContent = Math.round(AppState.hybridSettings.algorithmWeight * 100) + '%';
    AppState.elements.characterWeightValue.textContent = Math.round(AppState.hybridSettings.characterWeight * 100) + '%';
    AppState.elements.logoWeightValue.textContent = Math.round(AppState.hybridSettings.logoWeight * 100) + '%';
}

function updateBlendMode() {
    AppState.hybridSettings.blendMode = AppState.elements.blendMode.value;
}

function toggleHybridSettings() {
    const panel = AppState.elements.hybridSettingsPanel;
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

// Enhanced hybrid generation functions
function generateHybridArt() {
    if (AppState.isGenerating) return;
    
    const res = parseInt(AppState.elements.resolution.value);
    AppState.elements.canvas.width = res;
    AppState.elements.canvas.height = res;
    
    // Reset view when generating new image
    resetView();
    
    showGenerationTimer();
    
    // Use requestAnimationFrame for smoother animation
    const startTime = Date.now();
    
    function generateFrame() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 2000, 1); // 2 seconds for hybrid generation
        
        // Update progress bar
        AppState.elements.progressFill.style.width = `${progress * 100}%`;
        AppState.elements.timerValue.textContent = `${Math.ceil(2 - progress * 2)}s`;
        
        if (progress < 1) {
            requestAnimationFrame(generateFrame);
        } else {
            // Determine which hybrid generation function to call based on some condition
            // You'll need to define what determines which function to call
            if (AppState.currentMode === 'styleAlgorithmCharacterLogo') {
                generateStyleAlgorithmCharacterLogoCombo();
            } else if (AppState.currentMode === 'styleAlgorithm') {
                generateStyleAlgorithmCombo();
            } else if (AppState.currentMode === 'characterLogo') {
                generateCharacterLogoCombo();
            } else {
                // Default case - choose one or add error handling
                generateStyleAlgorithmCharacterLogoCombo();
            }
            
            hideGenerationTimer();
            AppState.imageData = AppState.elements.ctx.getImageData(0, 0, AppState.elements.canvas.width, AppState.elements.canvas.height);
            
            // Save state for undo
            saveState();
        }
    }
    
    requestAnimationFrame(generateFrame);
}

// Main hybrid generation method
function generateStyleAlgorithmCharacterLogoCombo() {
    const width = AppState.elements.canvas.width;
    const height = AppState.elements.canvas.height;
    
    // Create temporary canvases for each component
    const styleCanvas = document.createElement('canvas');
    styleCanvas.width = width;
    styleCanvas.height = height;
    const styleCtx = styleCanvas.getContext('2d');
    
    const algorithmCanvas = document.createElement('canvas');
    algorithmCanvas.width = width;
    algorithmCanvas.height = height;
    const algorithmCtx = algorithmCanvas.getContext('2d');
    
    const characterCanvas = document.createElement('canvas');
    characterCanvas.width = width;
    characterCanvas.height = height;
    const characterCtx = characterCanvas.getContext('2d');
    
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = width;
    logoCanvas.height = height;
    const logoCtx = logoCanvas.getContext('2d');
    
    // Generate each component
    generateArtComponent(styleCtx, 'style');
    generateArtComponent(algorithmCtx, 'algorithm');
    generateArtComponent(characterCtx, 'character');
    generateArtComponent(logoCtx, 'logo');
    
    // Get image data for each component
    const styleData = styleCtx.getImageData(0, 0, width, height);
    const algorithmData = algorithmCtx.getImageData(0, 0, width, height);
    const characterData = characterCtx.getImageData(0, 0, width, height);
    const logoData = logoCtx.getImageData(0, 0, width, height);
    
    // Create final image by blending components
    const finalImageData = AppState.elements.ctx.createImageData(width, height);
    
    for (let i = 0; i < finalImageData.data.length; i += 4) {
        const styleR = styleData.data[i];
        const styleG = styleData.data[i + 1];
        const styleB = styleData.data[i + 2];
        
        const algorithmR = algorithmData.data[i];
        const algorithmG = algorithmData.data[i + 1];
        const algorithmB = algorithmData.data[i + 2];
        
        const characterR = characterData.data[i];
        const characterG = characterData.data[i + 1];
        const characterB = characterData.data[i + 2];
        
        const logoR = logoData.data[i];
        const logoG = logoData.data[i + 1];
        const logoB = logoData.data[i + 2];
        
        // Blend based on weights and blend mode
        let r, g, b;
        
        switch (AppState.hybridSettings.blendMode) {
            case 'overlay':
                // Weighted average
                r = Math.round(
                    styleR * AppState.hybridSettings.styleWeight +
                    algorithmR * AppState.hybridSettings.algorithmWeight +
                    characterR * AppState.hybridSettings.characterWeight +
                    logoR * AppState.hybridSettings.logoWeight
                );
                g = Math.round(
                    styleG * AppState.hybridSettings.styleWeight +
                    algorithmG * AppState.hybridSettings.algorithmWeight +
                    characterG * AppState.hybridSettings.characterWeight +
                    logoG * AppState.hybridSettings.logoWeight
                );
                b = Math.round(
                    styleB * AppState.hybridSettings.styleWeight +
                    algorithmB * AppState.hybridSettings.algorithmWeight +
                    characterB * AppState.hybridSettings.characterWeight +
                    logoB * AppState.hybridSettings.logoWeight
                );
                break;
                
            case 'multiply':
                // Multiply blend mode
                r = Math.round(
                    (styleR / 255 * algorithmR / 255 * characterR / 255 * logoR / 255) * 255 *
                    (AppState.hybridSettings.styleWeight + 
                     AppState.hybridSettings.algorithmWeight + 
                     AppState.hybridSettings.characterWeight + 
                     AppState.hybridSettings.logoWeight)
                );
                g = Math.round(
                    (styleG / 255 * algorithmG / 255 * characterG / 255 * logoG / 255) * 255 *
                    (AppState.hybridSettings.styleWeight + 
                     AppState.hybridSettings.algorithmWeight + 
                     AppState.hybridSettings.characterWeight + 
                     AppState.hybridSettings.logoWeight)
                );
                b = Math.round(
                    (styleB / 255 * algorithmB / 255 * characterB / 255 * logoB / 255) * 255 *
                    (AppState.hybridSettings.styleWeight + 
                     AppState.hybridSettings.algorithmWeight + 
                     AppState.hybridSettings.characterWeight + 
                     AppState.hybridSettings.logoWeight)
                );
                break;
                
            case 'screen':
                // Screen blend mode
                r = Math.round(
                    (1 - (1 - styleR / 255) * (1 - algorithmR / 255) * (1 - characterR / 255) * (1 - logoR / 255)) * 255 *
                    (AppState.hybridSettings.styleWeight + 
                     AppState.hybridSettings.algorithmWeight + 
                     AppState.hybridSettings.characterWeight + 
                     AppState.hybridSettings.logoWeight)
                );
                g = Math.round(
                    (1 - (1 - styleG / 255) * (1 - algorithmG / 255) * (1 - characterG / 255) * (1 - logoG / 255)) * 255 *
                    (AppState.hybridSettings.styleWeight + 
                     AppState.hybridSettings.algorithmWeight + 
                     AppState.hybridSettings.characterWeight + 
                     AppState.hybridSettings.logoWeight)
                );
                b = Math.round(
                    (1 - (1 - styleB / 255) * (1 - algorithmB / 255) * (1 - characterB / 255) * (1 - logoB / 255)) * 255 *
                    (AppState.hybridSettings.styleWeight + 
                     AppState.hybridSettings.algorithmWeight + 
                     AppState.hybridSettings.characterWeight + 
                     AppState.hybridSettings.logoWeight)
                );
                break;
                
            default: // overlay
                r = Math.round(
                    styleR * AppState.hybridSettings.styleWeight +
                    algorithmR * AppState.hybridSettings.algorithmWeight +
                    characterR * AppState.hybridSettings.characterWeight +
                    logoR * AppState.hybridSettings.logoWeight
                );
                g = Math.round(
                    styleG * AppState.hybridSettings.styleWeight +
                    algorithmG * AppState.hybridSettings.algorithmWeight +
                    characterG * AppState.hybridSettings.characterWeight +
                    logoG * AppState.hybridSettings.logoWeight
                );
                b = Math.round(
                    styleB * AppState.hybridSettings.styleWeight +
                    algorithmB * AppState.hybridSettings.algorithmWeight +
                    characterB * AppState.hybridSettings.characterWeight +
                    logoB * AppState.hybridSettings.logoWeight
                );
        }
        
        // Apply bounds checking
        r = clamp(r, 0, 255);
        g = clamp(g, 0, 255);
        b = clamp(b, 0, 255);
        
        // Set final pixel
        finalImageData.data[i] = r;
        finalImageData.data[i + 1] = g;
        finalImageData.data[i + 2] = b;
        finalImageData.data[i + 3] = 255;
    }
    
    // Apply the final image
    AppState.elements.ctx.putImageData(finalImageData, 0, 0);
    
    // Apply texture if selected
    applyTexture();
    
    // Apply lighting if selected
    applyLighting();
}

function generateArtComponent(ctx, type) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const complexityValue = parseInt(AppState.elements.complexity.value);
    const densityValue = parseInt(AppState.elements.pixelDensity.value);
    
    switch (type) {
        case 'style':
            const style = AppState.elements.artStyle.value;
            switch(style) {
                case 'abstract':
                    generateAbstractArt(complexityValue, densityValue, ctx);
                    break;
                case 'impressionist':
                    generateImpressionistArt(complexityValue, densityValue, ctx);
                    break;
                case 'pointillism':
                    generatePointillismArt(complexityValue, densityValue, ctx);
                    break;
                case 'cubism':
                    generateCubismArt(complexityValue, densityValue, ctx);
                    break;
                case 'popart':
                    generatePopArt(complexityValue, densityValue, ctx);
                    break;
                case 'vangogh':
                    generateVanGoghStyle(complexityValue, densityValue, ctx);
                    break;
                case 'renaissance':
                    generateRenaissanceStyle(complexityValue, densityValue, ctx);
                    break;
                case 'japanese':
                    generateJapaneseStyle(complexityValue, densityValue, ctx);
                    break;
                case 'surreal':
                    generateSurrealism(complexityValue, densityValue, ctx);
                    break;
                case 'digital':
                default:
                    generatePixelArt(complexityValue, densityValue, ctx);
                    break;
            }
            break;
            
        case 'algorithm':
            const algorithm = AppState.elements.algorithm.value;
            switch(algorithm) {
                case 'voronoi':
                    generateVoronoiArt(complexityValue, densityValue, ctx);
                    break;
                case 'perlin':
                    generatePerlinNoiseArt(complexityValue, densityValue, ctx);
                    break;
                case 'fractal':
                    generateFractalArt(complexityValue, densityValue, ctx);
                    break;
                case 'cellular':
                    generateCellularAutomata(complexityValue, densityValue, ctx);
                    break;
                case 'genetic':
                    generateGeneticAlgorithmArt(complexityValue, densityValue, ctx);
                    break;
                case 'neural':
                    generateNeuralStyleTransfer(complexityValue, densityValue, ctx);
                    break;
                case 'wave':
                    generateWaveFunctionCollapse(complexityValue, densityValue, ctx);
                    break;
                default:
                    generateVoronoiArt(complexityValue, densityValue, ctx);
                    break;
            }
            break;
            
        case 'character':
            // Generate a character with random parameters
            const charType = ['human', 'creature', 'robot', 'fantasy', 'hybrid'][Math.floor(Math.random() * 5)];
            const charPose = ['standing', 'sitting', 'running', 'jumping', 'dancing'][Math.floor(Math.random() * 5)];
            const charSize = Math.floor(Math.random() * 100);
            const charStyle = ['realistic', 'cartoon', 'abstract', 'pixel', 'lowpoly'][Math.floor(Math.random() * 5)];
            
            // Set a neutral background for character
            ctx.fillStyle = '#222';
            ctx.fillRect(0, 0, width, height);
            
            // Generate character (this would need to be adapted to use the passed ctx)
            generateCharacter(charType, charPose, charSize, charStyle, ctx);
            break;
            
        case 'logo':
            // Generate a logo with random parameters
            const logoIndustry = ['tech', 'food', 'fashion', 'health', 'abstract'][Math.floor(Math.random() * 5)];
            const logoStyle = ['minimal', 'classic', 'modern', 'vintage', 'futuristic'][Math.floor(Math.random() * 5)];
            const logoComplexity = Math.floor(Math.random() * 100);
            const logoText = ['TechCorp', 'Foodies', 'FashionHub', 'HealthPlus', 'Innovate'][Math.floor(Math.random() * 5)];
            
            // Set a neutral background for logo
            ctx.fillStyle = '#222';
            ctx.fillRect(0, 0, width, height);
            
            // Generate logo (this would need to be adapted to use the passed ctx)
            generateLogo(logoIndustry, logoStyle, logoComplexity, logoText, ctx);
            break;
    }
}

// Additional hybrid generation methods
function generateStyleAlgorithmCombo() {
    // Direct combination of style and algorithm without character/logo elements
    const width = AppState.elements.canvas.width;
    const height = AppState.elements.canvas.height;
    
    // Create temporary canvases
    const styleCanvas = document.createElement('canvas');
    styleCanvas.width = width;
    styleCanvas.height = height;
    const styleCtx = styleCanvas.getContext('2d');
    
    const algorithmCanvas = document.createElement('canvas');
    algorithmCanvas.width = width;
    algorithmCanvas.height = height;
    const algorithmCtx = algorithmCanvas.getContext('2d');
    
    // Generate components
    generateArtComponent(styleCtx, 'style');
    generateArtComponent(algorithmCtx, 'algorithm');
    
    // Get image data
    const styleData = styleCtx.getImageData(0, 0, width, height);
    const algorithmData = algorithmCtx.getImageData(0, 0, width, height);
    
    // Blend with equal weights
    const finalImageData = AppState.elements.ctx.createImageData(width, height);
    
    for (let i = 0; i < finalImageData.data.length; i += 4) {
        const r = Math.round((styleData.data[i] + algorithmData.data[i]) / 2);
        const g = Math.round((styleData.data[i + 1] + algorithmData.data[i + 1]) / 2);
        const b = Math.round((styleData.data[i + 2] + algorithmData.data[i + 2]) / 2);
        
        finalImageData.data[i] = r;
        finalImageData.data[i + 1] = g;
        finalImageData.data[i + 2] = b;
        finalImageData.data[i + 3] = 255;
    }
    
    AppState.elements.ctx.putImageData(finalImageData, 0, 0);
    
    // Apply post-processing
    applyTexture();
    applyLighting();
}

function generateCharacterLogoCombo() {
    // Combination of character and logo elements
    const width = AppState.elements.canvas.width;
    const height = AppState.elements.canvas.height;
    
    // Create temporary canvases
    const characterCanvas = document.createElement('canvas');
    characterCanvas.width = width;
    characterCanvas.height = height;
    const characterCtx = characterCanvas.getContext('2d');
    
    const logoCanvas = document.createElement('canvas');
    logoCanvas.width = width;
    logoCanvas.height = height;
    const logoCtx = logoCanvas.getContext('2d');
    
    // Generate components
    generateArtComponent(characterCtx, 'character');
    generateArtComponent(logoCtx, 'logo');
    
    // Get image data
    const characterData = characterCtx.getImageData(0, 0, width, height);
    const logoData = logoCtx.getImageData(0, 0, width, height);
    
    // Use character as base, overlay logo elements
    const finalImageData = AppState.elements.ctx.createImageData(width, height);
    
    for (let i = 0; i < finalImageData.data.length; i += 4) {
        // Use character as base
        finalImageData.data[i] = characterData.data[i];
        finalImageData.data[i + 1] = characterData.data[i + 1];
        finalImageData.data[i + 2] = characterData.data[i + 2];
        finalImageData.data[i + 3] = characterData.data[i + 3];
        
        // Overlay logo where it has significant color (not background)
        if (logoData.data[i] + logoData.data[i + 1] + logoData.data[i + 2] > 100) {
            // Blend with character
            finalImageData.data[i] = Math.round((characterData.data[i] + logoData.data[i]) / 2);
            finalImageData.data[i + 1] = Math.round((characterData.data[i + 1] + logoData.data[i + 1]) / 2);
            finalImageData.data[i + 2] = Math.round((characterData.data[i + 2] + logoData.data[i + 2]) / 2);
        }
    }
    
    AppState.elements.ctx.putImageData(finalImageData, 0, 0);
    
    // Apply post-processing
    applyTexture();
    applyLighting();
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        hexToRgb,
        rgbToHex,
        clamp,
        generateImage,
        generateRandomImage,
        generateHybridArt
    };
}
function getColorPalette() {
    const scheme = elements.colorScheme.value;
    
    if (scheme === 'custom') {
        // Get colors from custom palette inputs
        const colorInputs = elements.customPalette.querySelectorAll('input[type="color"]');
        const colors = [];
        
        colorInputs.forEach(input => {
            if (input.value) colors.push(input.value);
        });
        
        return colors.length > 0 ? colors : ['#FF6B6B', '#4ECDC4', '#556270', '#C7F464', '#FFE66D'];
    }
    
    // Predefined palettes
    const palettes = {
        vibrant: ['#FF6B6B', '#4ECDC4', '#556270', '#C7F464', '#FFE66D'],
        pastel: ['#FFD6E7', '#FFEFCF', '#D4F0F0', '#8FCACA', '#CCE2CB'],
        monochrome: ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7', '#ECF0F1'],
        earth: ['#8B4513', '#A0522D', '#CD853F', '#DAA520', '#F5DEB3'],
        ocean: ['#014F6B', '#0A7E8C', '#1BAED0', '#87CEEB', '#E1F5FE'],
        sunset: ['#FF7E5F', '#FEB47B', '#FFE66D', '#9CEC5B', '#6AECD2'],
        jewel: ['#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4']
    };
    
    return palettes[scheme] || palettes.vibrant;
}

function showGenerationTimer() {
    isGenerating = true;
    elements.generationTimer.style.display = 'block';
    elements.progressFill.style.width = '0%';
    elements.timerValue.textContent = '10s';
    
    // Start timer animation
    const startTime = Date.now();
    
    generationTimerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / 10000, 1);
        
        elements.progressFill.style.width = `${progress * 100}%`;
        elements.timerValue.textContent = `${Math.ceil(10 - progress * 10)}s`;
        
        if (progress >= 1) {
            clearInterval(generationTimerInterval);
        }
    }, 100);
}

function hideGenerationTimer() {
    isGenerating = false;
    elements.generationTimer.style.display = 'none';
    clearInterval(generationTimerInterval);
}

function startInfiniteGeneration() {
    if (infiniteInterval) {
        clearInterval(infiniteInterval);
    }
    
    infiniteInterval = setInterval(() => {
        generateImage();
    }, 11000); // Slightly longer than the generation timer
    
    elements.infiniteBtn.style.display = 'none';
    elements.stopInfiniteBtn.style.display = 'inline-block';
}

function startInfiniteCharacters() {
    if (infiniteInterval) {
        clearInterval(infiniteInterval);
    }
    
    infiniteInterval = setInterval(() => {
        generateCharacter();
    }, 9000);
    
    elements.infiniteCharacterBtn.style.display = 'none';
    // Would need to add a stop button for characters
}

function startInfiniteAvatars() {
    if (infiniteInterval) {
        clearInterval(infiniteInterval);
    }
    
    infiniteInterval = setInterval(() => {
        generateAvatar();
    }, 7000);
    
    elements.infiniteAvatarBtn.style.display = 'none';
    // Would need to add a stop button for avatars
}

function startInfiniteLogos() {
    if (infiniteInterval) {
        clearInterval(infiniteInterval);
    }
    
    infiniteInterval = setInterval(() => {
        generateLogo();
    }, 6000);
    
    elements.infiniteLogoBtn.style.display = 'none';
    // Would need to add a stop button for logos
}

function stopInfiniteGeneration() {
    if (infiniteInterval) {
        clearInterval(infiniteInterval);
        infiniteInterval = null;
    }
    
    elements.infiniteBtn.style.display = 'inline-block';
    elements.stopInfiniteBtn.style.display = 'none';
    
    // Also stop character/avatar/logo infinite generation
    // Would need to add similar logic for those modes
}



// HISTORY FUNCTIONS

function initHistory() {
    // Save initial state
    saveState();
}

function saveState() {
    // Remove any states after the current index
    if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
    }
    
    // Save current canvas state
    const state = elements.ctx.getImageData(0, 0, elements.canvas.width, elements.canvas.height);
    history.push(state);
    historyIndex = history.length - 1;
    
    updateHistoryButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        const state = history[historyIndex];
        elements.ctx.putImageData(state, 0, 0);
        imageData = state;
        updateHistoryButtons();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        const state = history[historyIndex];
        elements.ctx.putImageData(state, 0, 0);
        imageData = state;
        updateHistoryButtons();
    }
}

function updateHistoryButtons() {
    elements.undoBtn.disabled = historyIndex <= 0;
    elements.redoBtn.disabled = historyIndex >= history.length - 1;
}

// ZOOM AND PAN FUNCTIONS

function zoom(factor, centerX, centerY) {
    // Calculate new zoom level
    const newZoom = zoomLevel * factor;
    
    // Limit zoom level
    if (newZoom < 0.1 || newZoom > 10) return;
    
    // Calculate mouse position in canvas coordinates
    const rect = elements.canvas.getBoundingClientRect();
    const x = (centerX - rect.left - offsetX) / zoomLevel;
    const y = (centerY - rect.top - offsetY) / zoomLevel;
    
    // Adjust offset so the point under mouse stays fixed
    offsetX = centerX - rect.left - x * newZoom;
    offsetY = centerY - rect.top - y * newZoom;
    
    zoomLevel = newZoom;
    updateCanvasTransform();
    updateZoomDisplay();
}

function zoomIn() {
    const rect = elements.canvasContainer.getBoundingClientRect();
    zoom(1.2, rect.width / 2, rect.height / 2);
}

function zoomOut() {
    const rect = elements.canvasContainer.getBoundingClientRect();
    zoom(0.8, rect.width / 2, rect.height / 2);
}

function resetView() {
    zoomLevel = 1;
    offsetX = 0;
    offsetY = 0;
    updateCanvasTransform();
    updateZoomDisplay();
}

function updateCanvasTransform() {
    elements.canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${zoomLevel})`;
}

function updateZoomDisplay() {
    elements.zoomLevel.textContent = `${Math.round(zoomLevel * 100)}%`;
}

function toggleFullscreen() {
    if (!isFullscreen) {
        if (elements.canvasContainer.requestFullscreen) {
            elements.canvasContainer.requestFullscreen();
        } else if (elements.canvasContainer.webkitRequestFullscreen) {
            elements.canvasContainer.webkitRequestFullscreen();
        } else if (elements.canvasContainer.msRequestFullscreen) {
            elements.canvasContainer.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Handle fullscreen change events
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    elements.fullscreenBtn.textContent = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen';
}

// KEYBOARD SHORTCUTS

function handleKeydown(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'z':
                if (e.shiftKey) {
                    redo();
                } else {
                    undo();
                }
                e.preventDefault();
                break;
            case 'y':
                redo();
                e.preventDefault();
                break;
            case 's':
                downloadImage('png');
                e.preventDefault();
                break;
            case 'g':
                generateImage();
                e.preventDefault();
                break;
        }
    } else {
        switch(e.key) {
            case '+':
            case '=':
                zoomIn();
                e.preventDefault();
                break;
            case '-':
            case '_':
                zoomOut();
                e.preventDefault();
                break;
            case '0':
                resetView();
                e.preventDefault();
                break;
            case 'Escape':
                if (isFullscreen) {
                    toggleFullscreen();
                }
                break;
        }
    }
}

// UTILITY FUNCTIONS

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : {r: 0, g: 0, b: 0};
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export {
    getColorPalette, showGenerationTimer, hideGenerationTimer, startInfiniteGeneration, startInfiniteCharacters,
    startInfiniteAvatars, startInfiniteLogos, stopInfiniteGeneration, initHistory, saveState, updateHistoryButtons, undo, redo,
    zoom, zoomIn, zoomOut, resetView, updateZoomDisplay, updateCanvasTransform, toggleFullscreen, handleFullscreenChange,
    handleKeydown, hexToRgb, rgbToHex, clamp,
};
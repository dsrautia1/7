function applyTexture() {
    const texture = elements.texture.value;
    if (texture === 'none') return;
    
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const imageData = elements.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 30 - 15;
        
        switch(texture) {
            case 'canvas':
                // Add canvas-like texture
                if ((i/4) % width % 5 === 0) {
                    data[i] = clamp(data[i] + noise, 0, 255);
                    data[i+1] = clamp(data[i+1] + noise, 0, 255);
                    data[i+2] = clamp(data[i+2] + noise, 0, 255);
                }
                break;
            case 'paper':
                // Add paper-like texture
                if (Math.random() > 0.7) {
                    const paperNoise = Math.random() * 40 - 20;
                    data[i] = clamp(data[i] + paperNoise, 0, 255);
                    data[i+1] = clamp(data[i+1] + paperNoise, 0, 255);
                    data[i+2] = clamp(data[i+2] + paperNoise, 0, 255);
                }
                break;
            case 'metal':
                // Add metallic sheen
                if ((i/4) % width % 3 === 0) {
                    data[i] = clamp(data[i] + 20, 0, 255);
                    data[i+1] = clamp(data[i+1] + 20, 0, 255);
                    data[i+2] = clamp(data[i+2] + 20, 0, 255);
                }
                break;
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

function applyLighting() {
    const lighting = elements.lighting.value;
    if (lighting === 'none') return;
    
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const imageData = elements.ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const x = (i/4) % width;
        const y = Math.floor((i/4) / width);
        
        let intensity = 0;
        
        switch(lighting) {
            case 'ambient':
                // Simple ambient light
                intensity = 1.1;
                break;
            case 'directional':
                // Directional light from top-left
                const dx = x / width;
                const dy = y / height;
                intensity = 0.8 + 0.4 * (1 - Math.sqrt(dx*dx + dy*dy));
                break;
            case 'point':
                // Point light at center
                const centerX = width / 2;
                const centerY = height / 2;
                const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                intensity = 1.0 + 0.5 * Math.cos(distance / (width/2) * Math.PI);
                break;
            case 'rim':
                // Rim lighting
                const edgeDistance = Math.min(x, width-x, y, height-y);
                intensity = 0.7 + 0.6 * (edgeDistance / (width/2));
                break;
        }
        
        data[i] = clamp(data[i] * intensity, 0, 255);
        data[i+1] = clamp(data[i+1] * intensity, 0, 255);
        data[i+2] = clamp(data[i+2] * intensity, 0, 255);
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

export {applyTexture,applyLighting};
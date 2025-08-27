// ENHANCED GENERATIVE ART ALGORITHMS

// Utility functions
function getColorPalette() {
    // Returns a curated color palette for more harmonious results
    const palettes = [
        ['#1a1a2e', '#16213e', '#0f3460', '#e94560'], // Dark blue with red accent
        ['#f8b400', '#00a8cc', '#2c786c', '#004445'], // Earth tones with teal
        ['#ffaec0', '#ff7575', '#c06c84', '#6c5b7b'], // Pink/purple gradient
        ['#f0e4d7', '#f5c0c0', '#ff7171', '#9fd8df'], // Pastel colors
        ['#2d4059', '#ea5455', '#f07b3f', '#ffd460']  // Bold complementary
    ];
    return palettes[Math.floor(Math.random() * palettes.length)];
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// 1. ENHANCED Voronoi Diagram Art with Lloyd's Relaxation
function generateVoronoiArt(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    const numPoints = Math.max(10, complexity * 8);
    
    // Generate initial random points with Lloyd's relaxation for better distribution
    let points = [];
    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * width,
            y: Math.random() * height,
            color: palette[i % palette.length],
            regionPixels: []
        });
    }
    
    // Apply Lloyd's relaxation for better point distribution
    for (let iter = 0; iter < 3; iter++) {
        // Assign pixels to regions
        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x += 2) {
                let minDist = Infinity;
                let closestIdx = 0;
                
                for (let i = 0; i < points.length; i++) {
                    const dist = distance(x, y, points[i].x, points[i].y);
                    if (dist < minDist) {
                        minDist = dist;
                        closestIdx = i;
                    }
                }
                
                points[closestIdx].regionPixels.push({x, y});
            }
        }
        
        // Move points to centroid of their region
        for (let i = 0; i < points.length; i++) {
            if (points[i].regionPixels.length > 0) {
                let sumX = 0;
                let sumY = 0;
                
                for (const pixel of points[i].regionPixels) {
                    sumX += pixel.x;
                    sumY += pixel.y;
                }
                
                points[i].x = sumX / points[i].regionPixels.length;
                points[i].y = sumY / points[i].regionPixels.length;
                points[i].regionPixels = [];
            }
        }
    }
    
    // Create Voronoi diagram with distance-based coloring
    const imageData = elements.ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let minDist = Infinity;
            let secondMinDist = Infinity;
            let closestPoint = null;
            
            // Find closest and second closest points
            for (const point of points) {
                const dist = distance(x, y, point.x, point.y);
                
                if (dist < minDist) {
                    secondMinDist = minDist;
                    minDist = dist;
                    closestPoint = point;
                } else if (dist < secondMinDist) {
                    secondMinDist = dist;
                }
            }
            
            // Create edge effect based on distance ratio
            const edgeFactor = Math.min(1, minDist / (secondMinDist + 1));
            const rgb = hexToRgb(closestPoint.color);
            
            // Apply edge darkening
            const darken = 1 - (edgeFactor * 0.7);
            
            const index = (y * width + x) * 4;
            data[index] = rgb.r * darken;
            data[index + 1] = rgb.g * darken;
            data[index + 2] = rgb.b * darken;
            data[index + 3] = 255;
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

// 2. ENHANCED Perlin Noise Art with multiple octaves and color mapping
function generatePerlinNoiseArt(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    // Initialize Perlin noise
    const noise = new EnhancedPerlinNoise();
    const scale = complexity * 0.005;
    const turbulence = density * 0.1;
    
    const imageData = elements.ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Generate multiple octaves of noise with different properties
            let value = 0;
            let amplitude = 1;
            let frequency = scale;
            let maxAmplitude = 0;
            
            for (let o = 0; o < 6; o++) {
                // Add turbulence for more interesting patterns
                const nx = x * frequency + turbulence * noise.perlin2(x * 0.01, y * 0.01);
                const ny = y * frequency + turbulence * noise.perlin2(x * 0.01 + 100, y * 0.01 + 100);
                
                value += noise.perlin2(nx, ny) * amplitude;
                maxAmplitude += amplitude;
                amplitude *= 0.5;
                frequency *= 2;
            }
            
            // Normalize value to 0-1 range
            value = (value / maxAmplitude + 1) / 2;
            
            // Apply sigmoid function for more contrast
            value = 1 / (1 + Math.exp(-10 * (value - 0.5)));
            
            // Map noise value to color with smooth gradient
            const colorPos = value * (palette.length - 1);
            const colorIndex1 = Math.floor(colorPos);
            const colorIndex2 = Math.min(palette.length - 1, colorIndex1 + 1);
            const blend = colorPos - colorIndex1;
            
            const rgb1 = hexToRgb(palette[colorIndex1]);
            const rgb2 = hexToRgb(palette[colorIndex2]);
            
            const r = rgb1.r * (1 - blend) + rgb2.r * blend;
            const g = rgb1.g * (1 - blend) + rgb2.g * blend;
            const b = rgb1.b * (1 - blend) + rgb2.b * blend;
            
            const index = (y * width + x) * 4;
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255;
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

// 3. ENHANCED Fractal Art with multiple fractal types
function generateFractalArt(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    const imageData = elements.ctx.createImageData(width, height);
    const data = imageData.data;
    
    const maxIterations = 50 + complexity * 8;
    const zoom = 200 + complexity * 100;
    const moveX = -0.5 + (density - 0.5) * 0.5;
    const moveY = (density - 0.5) * 0.3;
    
    // Choose fractal type based on complexity
    const fractalType = Math.floor(complexity * 3) % 3;
    
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let zx, zy, cx, cy;
            
            if (fractalType === 0) {
                // Mandelbrot
                zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
                zy = (y - height / 2) / (0.5 * zoom * height) + moveY;
                cx = zx;
                cy = zy;
            } else if (fractalType === 1) {
                // Julia set with dynamic parameters
                cx = 0.7 * Math.cos(complexity * 2 * Math.PI);
                cy = 0.7 * Math.sin(complexity * 2 * Math.PI);
                zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
                zy = (y - height / 2) / (0.5 * zoom * height) + moveY;
            } else {
                // Burning Ship fractal
                zx = 0;
                zy = 0;
                cx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX - 0.5;
                cy = (y - height / 2) / (0.5 * zoom * height) + moveY;
            }
            
            let iter = maxIterations;
            
            while (zx * zx + zy * zy < 4 && iter > 0) {
                if (fractalType === 2) {
                    // Burning Ship formula
                    const tmp = zx * zx - zy * zy + cx;
                    zy = Math.abs(2 * zx * zy) + cy;
                    zx = Math.abs(tmp);
                } else {
                    // Standard Mandelbrot/Julia formula
                    const tmp = zx * zx - zy * zy + cx;
                    zy = 2 * zx * zy + cy;
                    zx = tmp;
                }
                iter--;
            }
            
            // Smooth coloring algorithm
            let smoothIter = iter;
            if (iter < maxIterations) {
                const log_zn = Math.log(zx * zx + zy * zy) / 2;
                const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
                smoothIter = iter + 1 - nu;
            }
            
            // Color based on smooth iterations
            const colorVal = smoothIter / maxIterations;
            const colorIndex = Math.floor(colorVal * (palette.length - 1));
            const nextColorIndex = Math.min(palette.length - 1, colorIndex + 1);
            const blend = colorVal * (palette.length - 1) - colorIndex;
            
            const rgb1 = hexToRgb(palette[colorIndex]);
            const rgb2 = hexToRgb(palette[nextColorIndex]);
            
            const r = rgb1.r * (1 - blend) + rgb2.r * blend;
            const g = rgb1.g * (1 - blend) + rgb2.g * blend;
            const b = rgb1.b * (1 - blend) + rgb2.b * blend;
            
            const index = (y * width + x) * 4;
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255;
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

// 4. ENHANCED Cellular Automata with multiple rule sets
function generateCellularAutomata(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    // Initialize grid with probabilistic states based on density
    let grid = [];
    for (let y = 0; y < height; y++) {
        grid[y] = [];
        for (let x = 0; x < width; x++) {
            grid[y][x] = Math.random() > (1 - density) ? 1 : 0;
        }
    }
    
    // Choose rule set based on complexity
    const ruleSet = Math.floor(complexity * 5) % 5;
    
    // Run cellular automata for several generations
    for (let gen = 0; gen < complexity + 5; gen++) {
        const newGrid = [];
        
        for (let y = 0; y < height; y++) {
            newGrid[y] = [];
            for (let x = 0; x < width; x++) {
                // Count live neighbors (using extended neighborhood)
                let liveCount = 0;
                for (let dy = -2; dy <= 2; dy++) {
                    for (let dx = -2; dx <= 2; dx++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const ny = (y + dy + height) % height;
                        const nx = (x + dx + width) % width;
                        
                        if (grid[ny][nx] === 1) {
                            // Weight by distance
                            const dist = Math.sqrt(dx*dx + dy*dy);
                            liveCount += 1 / dist;
                        }
                    }
                }
                
                // Apply different rule sets
                if (ruleSet === 0) {
                    // Conway's Game of Life
                    newGrid[y][x] = (grid[y][x] === 1) ? 
                        (liveCount >= 2.2 && liveCount <= 3.2) ? 1 : 0 :
                        (liveCount >= 2.8 && liveCount <= 3.2) ? 1 : 0;
                } else if (ruleSet === 1) {
                    // Highlife variant
                    newGrid[y][x] = (grid[y][x] === 1) ? 
                        (liveCount >= 1.5 && liveCount <= 3.5) ? 1 : 0 :
                        (liveCount >= 3.2 && liveCount <= 3.5) ? 1 : 0;
                } else if (ruleSet === 2) {
                    // Maze-like growth
                    newGrid[y][x] = (liveCount >= 2.5 && liveCount <= 4.5) ? 1 : 0;
                } else if (ruleSet === 3) {
                    // Coral growth
                    newGrid[y][x] = (grid[y][x] === 1) ? 
                        (liveCount >= 3.5 && liveCount <= 5.5) ? 1 : 0 :
                        (liveCount >= 4.2 && liveCount <= 4.8) ? 1 : 0;
                } else {
                    // Custom rule set
                    newGrid[y][x] = (grid[y][x] === 1) ? 
                        (liveCount >= 1.8) ? 1 : 0 :
                        (liveCount >= 2.8 && liveCount <= 3.8) ? 1 : 0;
                }
            }
        }
        
        grid = newGrid;
    }
    
    // Draw the final state with gradient coloring
    const imageData = elements.ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Calculate local density for gradient effect
            let localDensity = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const ny = (y + dy + height) % height;
                    const nx = (x + dx + width) % width;
                    localDensity += grid[ny][nx];
                }
            }
            localDensity /= 9;
            
            const colorValue = grid[y][x] * 0.8 + localDensity * 0.2;
            const colorIndex = Math.floor(colorValue * (palette.length - 1));
            const rgb = hexToRgb(palette[colorIndex]);
            
            const index = (y * width + x) * 4;
            data[index] = rgb.r;
            data[index + 1] = rgb.g;
            data[index + 2] = rgb.b;
            data[index + 3] = 255;
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

// 5. ENHANCED Genetic Algorithm Art with crossover and mutation
function generateGeneticAlgorithmArt(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    // Create initial population of shapes with varied properties
    const population = [];
    const populationSize = 20 + complexity * 8;
    
    for (let i = 0; i < populationSize; i++) {
        const shapeType = Math.floor(Math.random() * 3); // 0: circle, 1: rectangle, 2: triangle
        
        population.push({
            type: shapeType,
            x: Math.random() * width,
            y: Math.random() * height,
            size: 10 + Math.random() * 70,
            width: 10 + Math.random() * 70,
            height: 10 + Math.random() * 70,
            rotation: Math.random() * Math.PI * 2,
            color: palette[Math.floor(Math.random() * palette.length)],
            alpha: 0.1 + Math.random() * 0.9
        });
    }
    
    // Apply "genetic operations" based on complexity
    for (let gen = 0; gen < complexity; gen++) {
        // Selection: keep the better half
        population.sort(() => Math.random() - 0.5); // Random selection for artistic purposes
        
        // Crossover: create new shapes by combining properties of two parents
        for (let i = 0; i < populationSize / 2; i++) {
            const parent1 = population[i];
            const parent2 = population[populationSize - i - 1];
            
            const child = {
                type: Math.random() > 0.5 ? parent1.type : parent2.type,
                x: (parent1.x + parent2.x) / 2,
                y: (parent1.y + parent2.y) / 2,
                size: (parent1.size + parent2.size) / 2,
                width: (parent1.width + parent2.width) / 2,
                height: (parent1.height + parent2.height) / 2,
                rotation: (parent1.rotation + parent2.rotation) / 2,
                color: Math.random() > 0.5 ? parent1.color : parent2.color,
                alpha: (parent1.alpha + parent2.alpha) / 2
            };
            
            // Mutation: randomly change some properties
            if (Math.random() < 0.3) {
                child.x += (Math.random() - 0.5) * width * 0.2;
                child.y += (Math.random() - 0.5) * height * 0.2;
            }
            
            if (Math.random() < 0.2) {
                child.color = palette[Math.floor(Math.random() * palette.length)];
            }
            
            population.push(child);
        }
    }
    
    // Draw shapes with composition rules
    elements.ctx.clearRect(0, 0, width, height);
    
    // Sort by alpha for proper blending
    population.sort((a, b) => a.alpha - b.alpha);
    
    for (const shape of population) {
        elements.ctx.save();
        elements.ctx.globalAlpha = shape.alpha;
        elements.ctx.fillStyle = shape.color;
        elements.ctx.translate(shape.x, shape.y);
        elements.ctx.rotate(shape.rotation);
        
        if (shape.type === 0) {
            // Circle
            elements.ctx.beginPath();
            elements.ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
            elements.ctx.fill();
        } else if (shape.type === 1) {
            // Rectangle
            elements.ctx.fillRect(-shape.width / 2, -shape.height / 2, shape.width, shape.height);
        } else {
            // Triangle
            elements.ctx.beginPath();
            elements.ctx.moveTo(0, -shape.size);
            elements.ctx.lineTo(-shape.size, shape.size);
            elements.ctx.lineTo(shape.size, shape.size);
            elements.ctx.closePath();
            elements.ctx.fill();
        }
        
        elements.ctx.restore();
    }
    
    elements.ctx.globalAlpha = 1;
}

// 6. ENHANCED Neural Style Transfer simulation
function generateNeuralStyleTransfer(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    // Generate a base content image with multiple techniques
    const technique = Math.floor(Math.random() * 3);
    
    if (technique === 0) {
        generateVoronoiArt(complexity * 0.7, density);
    } else if (technique === 1) {
        generatePerlinNoiseArt(complexity * 0.7, density);
    } else {
        generateCellularAutomata(complexity * 0.7, density);
    }
    
    // Get the content image data
    const contentData = elements.ctx.getImageData(0, 0, width, height);
    
    // Create style data with more sophisticated transformation
    const styleData = elements.ctx.createImageData(width, height);
    const noise = new EnhancedPerlinNoise();
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            
            // Extract content color
            const r = contentData.data[index];
            const g = contentData.data[index + 1];
            const b = contentData.data[index + 2];
            
            // Calculate perceptual brightness
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // Generate style noise patterns
            const noiseValue = noise.perlin2(x * 0.02, y * 0.02);
            const normalizedNoise = (noiseValue + 1) / 2;
            
            // Select style color based on noise and content
            const colorIndex = Math.floor(normalizedNoise * (palette.length - 1));
            const styleRgb = hexToRgb(palette[colorIndex]);
            
            // Edge detection (simplified)
            let edge = 0;
            if (x > 0 && y > 0 && x < width - 1 && y < height - 1) {
                const left = contentData.data[index - 4];
                const right = contentData.data[index + 4];
                const up = contentData.data[index - width * 4];
                const down = contentData.data[index + width * 4];
                
                edge = Math.abs(left - right) + Math.abs(up - down);
                edge = Math.min(255, edge * 2);
            }
            
            // Blend content with style based on complexity
            const contentWeight = 0.6 - complexity * 0.2;
            const styleWeight = 0.3 + complexity * 0.1;
            const edgeWeight = 0.1;
            
            // Enhance edges with style color
            const edgeInfluence = edge / 255 * edgeWeight;
            
            const finalR = r * contentWeight + styleRgb.r * styleWeight + styleRgb.r * edgeInfluence;
            const finalG = g * contentWeight + styleRgb.g * styleWeight + styleRgb.g * edgeInfluence;
            const finalB = b * contentWeight + styleRgb.b * styleWeight + styleRgb.b * edgeInfluence;
            
            // Add subtle noise for texture
            const textureNoise = (Math.random() - 0.5) * 20 * complexity;
            
            styleData.data[index] = clamp(finalR + textureNoise, 0, 255);
            styleData.data[index + 1] = clamp(finalG + textureNoise, 0, 255);
            styleData.data[index + 2] = clamp(finalB + textureNoise, 0, 255);
            styleData.data[index + 3] = 255;
        }
    }
    
    elements.ctx.putImageData(styleData, 0, 0);
}

// 7. ENHANCED Wave Function Collapse with proper tile adjacency
function generateWaveFunctionCollapse(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    // Define tile types with adjacency rules
    const tileTypes = palette.map((color, index) => {
        return {
            color: color,
            // Rules: which tiles can be adjacent (right, down, left, up)
            adjacency: [
                [(index + 1) % palette.length, index, (index + palette.length - 1) % palette.length], // Right
                [index, (index + 1) % palette.length, (index + palette.length - 1) % palette.length], // Down
                [(index + palette.length - 1) % palette.length, index, (index + 1) % palette.length], // Left
                [(index + palette.length - 1) % palette.length, (index + 1) % palette.length, index]  // Up
            ]
        };
    });
    
    // Initialize grid with all possibilities
    const grid = [];
    for (let y = 0; y < height; y++) {
        grid[y] = [];
        for (let x = 0; x < width; x++) {
            grid[y][x] = {
                possibilities: [...tileTypes.keys()], // All tile indices are possible initially
                collapsed: false
            };
        }
    }
    
    // Collapse the wave function step by step
    const imageData = elements.ctx.createImageData(width, height);
    const data = imageData.data;
    
    // Start from a random point
    const startX = Math.floor(Math.random() * width);
    const startY = Math.floor(Math.random() * height);
    
    // Collapse the starting cell
    collapseCell(grid, startX, startY, tileTypes);
    propagateConstraints(grid, startX, startY, width, height, tileTypes);
    
    // Continue collapsing until all cells are resolved
    let collapsedCells = 1;
    const totalCells = width * height;
    
    while (collapsedCells < totalCells) {
        // Find the cell with the minimum entropy (fewest possibilities)
        let minEntropy = Infinity;
        let targetX = -1;
        let targetY = -1;
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (!grid[y][x].collapsed && grid[y][x].possibilities.length > 0) {
                    if (grid[y][x].possibilities.length < minEntropy) {
                        minEntropy = grid[y][x].possibilities.length;
                        targetX = x;
                        targetY = y;
                    }
                }
            }
        }
        
        if (targetX === -1) break; // No valid cells left to collapse
        
        // Collapse the selected cell
        collapseCell(grid, targetX, targetY, tileTypes);
        propagateConstraints(grid, targetX, targetY, width, height, tileTypes);
        collapsedCells++;
    }
    
    // Draw the result
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = grid[y][x];
            let color;
            
            if (cell.collapsed && cell.possibilities.length > 0) {
                const tileIndex = cell.possibilities[0];
                color = tileTypes[tileIndex].color;
            } else {
                // Fallback color for unresolved cells
                color = palette[0];
            }
            
            const rgb = hexToRgb(color);
            const index = (y * width + x) * 4;
            data[index] = rgb.r;
            data[index + 1] = rgb.g;
            data[index + 2] = rgb.b;
            data[index + 3] = 255;
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

function collapseCell(grid, x, y, tileTypes) {
    const cell = grid[y][x];
    
    if (cell.possibilities.length === 0) {
        // No possibilities left - this shouldn't happen in a valid propagation
        cell.collapsed = true;
        return;
    }
    
    // Weighted random selection based on color luminance
    const weights = cell.possibilities.map(index => {
        const color = tileTypes[index].color;
        const rgb = hexToRgb(color);
        // Calculate perceived luminance
        return 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
    });
    
    // Normalize weights
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const normalizedWeights = weights.map(weight => weight / totalWeight);
    
    // Select a tile based on weights
    let randomValue = Math.random();
    let selectedIndex = 0;
    
    for (let i = 0; i < normalizedWeights.length; i++) {
        randomValue -= normalizedWeights[i];
        if (randomValue <= 0) {
            selectedIndex = i;
            break;
        }
    }
    
    const selectedTile = cell.possibilities[selectedIndex];
    cell.possibilities = [selectedTile];
    cell.collapsed = true;
}

function propagateConstraints(grid, x, y, width, height, tileTypes) {
    const stack = [{x, y}];
    
    while (stack.length > 0) {
        const {x: currentX, y: currentY} = stack.pop();
        const currentCell = grid[currentY][currentX];
        
        if (!currentCell.collapsed || currentCell.possibilities.length === 0) {
            continue;
        }
        
        const currentTileIndex = currentCell.possibilities[0];
        const currentTile = tileTypes[currentTileIndex];
        
        // Check all four directions
        const directions = [
            {dx: 1, dy: 0, dir: 0},  // Right
            {dx: 0, dy: 1, dir: 1},  // Down
            {dx: -1, dy: 0, dir: 2}, // Left
            {dx: 0, dy: -1, dir: 3}  // Up
        ];
        
        for (const {dx, dy, dir} of directions) {
            const nx = currentX + dx;
            const ny = currentY + dy;
            
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const neighborCell = grid[ny][nx];
                
                if (neighborCell.collapsed) {
                    continue;
                }
                
                // Get allowed adjacent tiles from current tile
                const allowedAdjacents = currentTile.adjacency[dir];
                
                // Filter neighbor's possibilities based on allowed adjacents
                const newPossibilities = neighborCell.possibilities.filter(
                    index => allowedAdjacents.includes(index)
                );
                
                if (newPossibilities.length === 0) {
                    // No valid possibilities - this shouldn't happen with proper rules
                    continue;
                }
                
                // Check if possibilities changed
                if (newPossibilities.length !== neighborCell.possibilities.length) {
                    neighborCell.possibilities = newPossibilities;
                    
                    // If only one possibility remains, collapse this cell
                    if (newPossibilities.length === 1) {
                        neighborCell.collapsed = true;
                    }
                    
                    // Add to stack for further propagation
                    stack.push({x: nx, y: ny});
                }
            }
        }
    }
}

// 8. NEW: Reaction-Diffusion System (Simulation of Turing Patterns)
function generateReactionDiffusion(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    // Initialize two chemical concentrations
    let gridA = [];
    let gridB = [];
    
    for (let y = 0; y < height; y++) {
        gridA[y] = [];
        gridB[y] = [];
        for (let x = 0; x < width; x++) {
            // Initialize with small random variations
            gridA[y][x] = 1 + (Math.random() - 0.5) * 0.1;
            gridB[y][x] = 0 + (Math.random() - 0.5) * 0.1;
        }
    }
    
    // Add initial disturbances
    for (let i = 0; i < 5 + complexity * 3; i++) {
        const centerX = Math.floor(Math.random() * width);
        const centerY = Math.floor(Math.random() * height);
        const radius = 5 + Math.random() * 15;
        
        for (let y = Math.max(0, centerY - radius); y < Math.min(height, centerY + radius); y++) {
            for (let x = Math.max(0, centerX - radius); x < Math.min(width, centerX + radius); x++) {
                const dist = distance(x, y, centerX, centerY);
                if (dist < radius) {
                    gridB[y][x] = 0.5 + (Math.random() * 0.5);
                }
            }
        }
    }
    
    // Reaction-diffusion parameters
    const dA = 1.0;    // Diffusion rate of A
    const dB = 0.5;    // Diffusion rate of B
    const feed = 0.055 + complexity * 0.005; // Feed rate
    const kill = 0.062; // Kill rate
    const dt = 1.0;    // Time step
    
    // Number of iterations based on complexity
    const iterations = 10 + complexity * 5;
    
    // Run reaction-diffusion simulation
    for (let iter = 0; iter < iterations; iter++) {
        const nextA = [];
        const nextB = [];
        
        for (let y = 0; y < height; y++) {
            nextA[y] = [];
            nextB[y] = [];
            for (let x = 0; x < width; x++) {
                // Laplace convolution for diffusion
                let laplaceA = 0;
                let laplaceB = 0;
                
                // Using a 3x3 kernel
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const ny = (y + dy + height) % height;
                        const nx = (x + dx + width) % width;
                        
                        let weight = 0.05; // Corners
                        if (dx === 0 && dy === 0) {
                            weight = -1; // Center
                        } else if (dx === 0 || dy === 0) {
                            weight = 0.2; // Edges
                        }
                        
                        laplaceA += gridA[ny][nx] * weight;
                        laplaceB += gridB[ny][nx] * weight;
                    }
                }
                
                // Gray-Scott model equations
                const reaction = gridA[y][x] * gridB[y][x] * gridB[y][x];
                const nextAVal = gridA[y][x] + (dA * laplaceA - reaction + feed * (1 - gridA[y][x])) * dt;
                const nextBVal = gridB[y][x] + (dB * laplaceB + reaction - (kill + feed) * gridB[y][x]) * dt;
                
                nextA[y][x] = Math.max(0, nextAVal);
                nextB[y][x] = Math.max(0, nextBVal);
            }
        }
        
        gridA = nextA;
        gridB = nextB;
    }
    
    // Render the result
    const imageData = elements.ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Use concentration B to determine color
            const value = Math.min(1, gridB[y][x] * 5);
            const colorIndex = Math.floor(value * (palette.length - 1));
            const rgb = hexToRgb(palette[colorIndex]);
            
            const index = (y * width + x) * 4;
            data[index] = rgb.r;
            data[index + 1] = rgb.g;
            data[index + 2] = rgb.b;
            data[index + 3] = 255;
        }
    }
    
    elements.ctx.putImageData(imageData, 0, 0);
}

// 9. NEW: L-System Fractals
function generateLSystemFractal(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Define L-system parameters
    const axiom = "F";
    const rules = {
        "F": "F[+F]F[-F]F"  // Simple tree-like structure
    };
    
    // Generate the L-system string
    let systemString = axiom;
    const iterations = 3 + Math.floor(complexity * 2);
    
    for (let i = 0; i < iterations; i++) {
        let newString = "";
        for (const char of systemString) {
            newString += rules[char] || char;
        }
        systemString = newString;
    }
    
    // Set drawing parameters
    const startX = width / 2;
    const startY = height * 0.9;
    let x = startX;
    let y = startY;
    let angle = -Math.PI / 2; // Start pointing up
    const angleChange = Math.PI / 6 * density;
    const stepLength = 8 / (iterations * 0.7);
    
    const stack = [];
    let depth = 0;
    
    // Draw the L-system
    elements.ctx.lineWidth = 2;
    elements.ctx.beginPath();
    elements.ctx.moveTo(x, y);
    
    for (const char of systemString) {
        if (char === "F") {
            // Draw forward
            x += Math.cos(angle) * stepLength;
            y += Math.sin(angle) * stepLength;
            elements.ctx.lineTo(x, y);
            
            // Color based on depth
            const colorIndex = depth % palette.length;
            elements.ctx.strokeStyle = palette[colorIndex];
            elements.ctx.stroke();
            elements.ctx.beginPath();
            elements.ctx.moveTo(x, y);
        } else if (char === "+") {
            // Turn right
            angle += angleChange;
        } else if (char === "-") {
            // Turn left
            angle -= angleChange;
        } else if (char === "[") {
            // Push current state
            stack.push({x, y, angle, depth});
            depth++;
        } else if (char === "]") {
            // Pop previous state
            if (stack.length > 0) {
                const state = stack.pop();
                x = state.x;
                y = state.y;
                angle = state.angle;
                depth = state.depth;
                elements.ctx.beginPath();
                elements.ctx.moveTo(x, y);
            }
        }
    }
    
    elements.ctx.stroke();
}

// 10. NEW: Particle System with Emergent Behavior
function generateParticleSystem(complexity, density) {
    const width = elements.canvas.width;
    const height = elements.canvas.height;
    const palette = getColorPalette();
    
    elements.ctx.clearRect(0, 0, width, height);
    
    // Create particles
    const numParticles = 50 + complexity * 30;
    const particles = [];
    
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 1 + Math.random() * 3,
            color: palette[i % palette.length],
            connections: []
        });
    }
    
    // Update particles for several frames
    const frames = 100 + complexity * 20;
    const connectionDistance = 100 + density * 50;
    
    for (let frame = 0; frame < frames; frame++) {
        // Clear with fade effect for motion trails
        elements.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        elements.ctx.fillRect(0, 0, width, height);
        
        // Update and draw particles
        for (const particle of particles) {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
            
            // Keep within bounds
            particle.x = clamp(particle.x, 0, width);
            particle.y = clamp(particle.y, 0, height);
            
            // Draw particle
            elements.ctx.beginPath();
            elements.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            elements.ctx.fillStyle = particle.color;
            elements.ctx.fill();
        }
        
        // Draw connections between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dist = distance(p1.x, p1.y, p2.x, p2.y);
                
                if (dist < connectionDistance) {
                    const alpha = 1 - dist / connectionDistance;
                    elements.ctx.beginPath();
                    elements.ctx.moveTo(p1.x, p1.y);
                    elements.ctx.lineTo(p2.x, p2.y);
                    elements.ctx.strokeStyle = `rgba(100, 100, 100, ${alpha * 0.3})`;
                    elements.ctx.stroke();
                }
            }
        }
    }
}

// Enhanced Perlin Noise Implementation
class EnhancedPerlinNoise {
    constructor() {
        this.gradients = {};
        this.memory = {};
        this.permutation = this.buildPermutationTable();
    }
    
    buildPermutationTable() {
        const table = [];
        for (let i = 0; i < 256; i++) {
            table[i] = i;
        }
        
        // Shuffle the table
        for (let i = 0; i < 256; i++) {
            const randomIndex = Math.floor(Math.random() * (256 - i)) + i;
            const temp = table[i];
            table[i] = table[randomIndex];
            table[randomIndex] = temp;
        }
        
        // Duplicate the permutation table
        for (let i = 0; i < 256; i++) {
            table[256 + i] = table[i];
        }
        
        return table;
    }
    
    getGradient(x, y) {
        const key = `${x},${y}`;
        
        if (this.gradients[key]) {
            return this.gradients[key];
        }
        
        // Use permutation table for consistent gradients
        const index = this.permutation[(this.permutation[x & 255] + y) & 255];
        const theta = (index / 255) * Math.PI * 2;
        
        this.gradients[key] = {x: Math.cos(theta), y: Math.sin(theta)};
        return this.gradients[key];
    }
    
    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }
    
    lerp(a, b, t) {
        return a + t * (b - a);
    }
    
    perlin2(x, y) {
        const key = `${x},${y}`;
        if (this.memory[key]) {
            return this.memory[key];
        }
        
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        
        x -= Math.floor(x);
        y -= Math.floor(y);
        
        const u = this.fade(x);
        const v = this.fade(y);
        
        const n00 = this.getGradient(X, Y).x * x + this.getGradient(X, Y).y * y;
        const n01 = this.getGradient(X, Y+1).x * x + this.getGradient(X, Y+1).y * (y-1);
        const n10 = this.getGradient(X+1, Y).x * (x-1) + this.getGradient(X+1, Y).y * y;
        const n11 = this.getGradient(X+1, Y+1).x * (x-1) + this.getGradient(X+1, Y+1).y * (y-1);
        
        const nx0 = this.lerp(n00, n10, u);
        const nx1 = this.lerp(n01, n11, u);
        const value = this.lerp(nx0, nx1, v);
        
        this.memory[key] = value;
        return value;
    }
}

// Main function to switch between all algorithms
function startAlgorithm(algorithmType, complexity, density) {
    // Ensure parameters are within valid ranges
    complexity = clamp(complexity, 0.1, 1);
    density = clamp(density, 0.1, 1);
    
    // Clear canvas before starting
    elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    
    // Switch between different algorithms
    switch(algorithmType) {
        case 'voronoi':
            generateVoronoiArt(complexity, density);
            break;
            
        case 'perlin':
            generatePerlinNoiseArt(complexity, density);
            break;
            
        case 'fractal':
            generateFractalArt(complexity, density);
            break;
            
        case 'cellular':
            generateCellularAutomata(complexity, density);
            break;
            
        case 'genetic':
            generateGeneticAlgorithmArt(complexity, density);
            break;
            
        case 'neural':
            generateNeuralStyleTransfer(complexity, density);
            break;
            
        case 'wave':
            generateWaveFunctionCollapse(complexity, density);
            break;
            
        case 'reaction':
            generateReactionDiffusion(complexity, density);
            break;
            
        case 'lsystem':
            generateLSystemFractal(complexity, density);
            break;
            
        case 'particle':
            generateParticleSystem(complexity, density);
            break;
            
        default:
            console.error('Unknown algorithm type:', algorithmType);
            // Default to Voronoi if unknown type
            generateVoronoiArt(complexity, density);
    }
    
    console.log('Generated', algorithmType, 'art with complexity:', complexity, 'density:', density);
}

export {getColorPalette,hexToRgb, clamp,distance, generateVoronoiArt, generatePerlinNoiseArt,
    generateFractalArt, generateCellularAutomata, generateGeneticAlgorithmArt, generateNeuralStyleTransfer,
    generateWaveFunctionCollapse, generateReactionDiffusion, generateLSystemFractal, generateParticleSystem,
    collapseCell, propagateConstraints,startAlgorithm,
};
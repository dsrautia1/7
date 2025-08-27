function downloadImage(format) {
    if (!imageData) return;
        
    const link = document.createElement('a');
    let mimeType, extension;
        
    switch(format) {
        case 'png':
            mimeType = 'image/png';
            extension = '.png';
            break;
        case 'jpg':
            mimeType = 'image/jpeg';
            extension = '.jpg';
            break;
        case 'svg':
            // For SVG, we'd need to convert the canvas to SVG
            // This is a simplified approach
            const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${elements.canvas.width}" height="${elements.canvas.height}">
                <foreignObject width="100%" height="100%">
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <img src="${elements.canvas.toDataURL('image/png')}" width="100%" height="100%"/>
                    </div>
                </foreignObject>
            </svg>`;
                
            const blob = new Blob([svgContent], {type: 'image/svg+xml'});
            link.href = URL.createObjectURL(blob);
            link.download = `pixel-art${extension}`;
            link.click();
            return;
    }
        
    link.href = elements.canvas.toDataURL(mimeType);
    link.download = `pixel-art${extension}`;
    link.click();
}
    
function generateGif() {
    // This would require a more complex implementation using a GIF library
    // For now, we'll just download a single frame as a GIF
    downloadImage('gif');
}
    
function shareOnTwitter() {
    if (!imageData) return;
        
    const imageUrl = elements.canvas.toDataURL('image/png');
    const text = 'Check out this AI-generated art!';
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(imageUrl)}`;
        
    window.open(url, '_blank');
}
    
function shareOnFacebook() {
    if (!imageData) return;
        
    const imageUrl = elements.canvas.toDataURL('image/png');
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imageUrl)}`;
        
    window.open(url, '_blank');
}
    
function shareOnInstagram() {
    // Instagram doesn't have a direct sharing API
    // We'll download the image and prompt the user to upload it
    downloadImage('png');
    alert('Image downloaded. Please upload it to Instagram manually.');
}
    
function copyImageLink() {
    if (!imageData) return;
        
    const imageUrl = elements.canvas.toDataURL('image/png');
        
    navigator.clipboard.writeText(imageUrl).then(() => {
        alert('Image link copied to clipboard!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}
    
function saveToGallery() {
    if (!imageData) return;
        
    const imageUrl = elements.canvas.toDataURL('image/png');
    const timestamp = new Date().toISOString();
        
    galleryItems.push({
        id: timestamp,
        url: imageUrl,
        timestamp: timestamp
    });
        
    // Save to localStorage
    localStorage.setItem('artGallery', JSON.stringify(galleryItems));
        
    // Update gallery display
    updateGallery();
        
    alert('Artwork saved to gallery!');
}
    
function loadGallery() {
    const savedGallery = localStorage.getItem('artGallery');
    if (savedGallery) {
        galleryItems = JSON.parse(savedGallery);
        updateGallery();
    }
}
    
function updateGallery() {
    elements.gallery.innerHTML = '';
        
    galleryItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
            
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = 'Gallery artwork';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteGalleryItem(item.id);
        });
            
        galleryItem.appendChild(img);
        galleryItem.appendChild(deleteBtn);
        
        galleryItem.addEventListener('click', () => {
            // Load this image into the canvas
            const newImage = new Image();
            newImage.onload = () => {
                elements.canvas.width = newImage.width;
                elements.canvas.height = newImage.height;
                elements.ctx.drawImage(newImage, 0, 0);
                imageData = elements.ctx.getImageData(0, 0, elements.canvas.width, elements.canvas.height);
                saveState();
                resetView();
            };
            newImage.src = item.url;
        });
            
        elements.gallery.appendChild(galleryItem);
    });
}
    
function deleteGalleryItem(id) {
    galleryItems = galleryItems.filter(item => item.id !== id);
    localStorage.setItem('artGallery', JSON.stringify(galleryItems));
    updateGallery();
}

function clearGallery() {
    if (confirm('Are you sure you want to clear your entire gallery?')) {
        galleryItems = [];
        localStorage.removeItem('artGallery');
        elements.gallery.innerHTML = '';
    }
}

export {
    downloadImage, generateGif, shareOnFacebook, shareOnInstagram, shareOnTwitter,
    copyImageLink, saveToGallery, loadGallery, updateGallery, deleteGalleryItem,clearGallery,
};
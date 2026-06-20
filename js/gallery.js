document.addEventListener('DOMContentLoaded', async () => {
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  // Show premium minimal loading indicator
  galleryGrid.innerHTML = `
    <div id="galleryLoader" style="grid-column: 1/-1; text-align: center; padding: 6rem 2rem; color: var(--text-secondary); font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; font-size: 0.75rem; animation: pulse 1.5s infinite ease-in-out;">
      Scanning gallery...
    </div>
  `;

  // Inject CSS pulse animation dynamically if not present
  if (!document.getElementById('pulse-style')) {
    const style = document.createElement('style');
    style.id = 'pulse-style';
    style.innerHTML = `@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`;
    document.head.appendChild(style);
  }

  // Load and discover moments images
  if (typeof loadMomentsImages !== 'undefined') {
    await loadMomentsImages();
  }

  // Clear loader
  galleryGrid.innerHTML = '';

  // Flatten all discovered images across all moments
  const allImages = [];
  momentsData.forEach(moment => {
    if (moment.images && moment.images.length > 0) {
      moment.images.forEach(imageName => {
        allImages.push({
          name: imageName,
          description: moment.description
        });
      });
    }
  });

  if (allImages.length === 0) {
    galleryGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
        <p style="font-weight: 300; margin-bottom: 1rem;">No images found in assets/gallery/</p>
        <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.6; color: var(--text-secondary);">
          Please upload images matching the pattern:<br>
          <strong style="color: var(--text-primary);">1_1.jpg</strong> or <strong style="color: var(--text-primary);">2_1.png</strong>
        </p>
      </div>
    `;
    return;
  }

  // Populate gallery items
  allImages.forEach(imgData => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = `assets/gallery/${imgData.name}`;
    img.alt = imgData.description;
    img.loading = 'lazy';

    item.appendChild(img);
    galleryGrid.appendChild(item);

    // Lightbox click handler
    item.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxCaption.textContent = imgData.description;
      lightbox.classList.add('active');
    });
  });

  // Lightbox Close Handlers
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxClose) {
      closeLightbox();
    }
  });

  // Close lightbox on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightboxImg.src = '';
      lightboxCaption.textContent = '';
    }, 300);
  }
});

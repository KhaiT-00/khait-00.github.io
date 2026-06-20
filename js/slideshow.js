document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('slideshowContainer');
  const nav = document.getElementById('slideshowNav');

  // Show premium loading indicator
  container.innerHTML = `
    <div id="slideshowLoader" style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; color: var(--text-secondary); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; animation: pulse 1.5s infinite ease-in-out;">
      Loading memories...
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

  // Filter only moments that have at least 1 image discovered OR are text-only speech slides
  const activeMoments = momentsData.filter(moment => (moment.images && moment.images.length > 0) || moment.isTextOnly);

  if (activeMoments.length === 0) {
    container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%; text-align: center; padding: 2rem; color: var(--text-secondary);">
        <p style="font-weight: 300; margin-bottom: 1rem;">No moments could be loaded.</p>
        <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; line-height: 1.6;">
          Please upload images matching the pattern:<br>
          <strong style="color: var(--text-primary);">1_1.jpg</strong> or <strong style="color: var(--text-primary);">2_1.png</strong><br>
          into <strong style="color: var(--text-primary);">assets/gallery/</strong>
        </p>
      </div>
    `;
    return;
  }

  // Clear loader
  container.innerHTML = '';
  nav.innerHTML = '';

  const totalMoments = activeMoments.length;

  // Render slides and dots
  activeMoments.forEach((moment, idx) => {
    // 1. Create Slide
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.dataset.index = idx;

    if (moment.isTextOnly) {
      // Text-only Speech Layout
      slide.classList.add('slide-text-only');
      
      const speechContainer = document.createElement('div');
      speechContainer.className = 'slide-speech-container';
      
      const speechText = document.createElement('div');
      speechText.className = 'slide-speech-text';
      speechText.innerText = moment.description;
      
      speechContainer.appendChild(speechText);
      slide.appendChild(speechContainer);
    } else {
      // Create Image Container
      const imgContainer = document.createElement('div');
      imgContainer.className = 'slide-images-container';

      if (moment.images.length === 1) {
        // Single Image Layout (Canvas with blur background and contain front image)
        const canvas = document.createElement('div');
        canvas.className = 'slide-image-canvas';

        const blurBg = document.createElement('img');
        blurBg.className = 'slide-image-blur-bg';
        blurBg.src = `assets/gallery/${moment.images[0]}`;
        blurBg.alt = '';
        
        const frontImg = document.createElement('img');
        frontImg.className = 'slide-image-front';
        frontImg.src = `assets/gallery/${moment.images[0]}`;
        frontImg.alt = moment.description;

        canvas.appendChild(blurBg);
        canvas.appendChild(frontImg);
        imgContainer.appendChild(canvas);
      } else if (moment.images.length > 1) {
        // Multiple Images Layout (Horizontal Scrollable Strip inside the moment)
        const scrollDiv = document.createElement('div');
        scrollDiv.className = 'slide-images-scroll';

        moment.images.forEach((imgName, imgIdx) => {
          const canvas = document.createElement('div');
          canvas.className = 'slide-image-canvas';

          const blurBg = document.createElement('img');
          blurBg.className = 'slide-image-blur-bg';
          blurBg.src = `assets/gallery/${imgName}`;
          blurBg.alt = '';
          
          const frontImg = document.createElement('img');
          frontImg.className = 'slide-image-front';
          frontImg.src = `assets/gallery/${imgName}`;
          frontImg.alt = moment.description;

          canvas.appendChild(blurBg);
          canvas.appendChild(frontImg);
          
          // Wrap in a div to hold layout and scroll-snap alignment
          const itemWrapper = document.createElement('div');
          itemWrapper.style.flex = '0 0 85%';
          itemWrapper.style.height = '100%';
          itemWrapper.style.scrollSnapAlign = 'center';
          itemWrapper.style.position = 'relative';
          itemWrapper.style.cursor = 'pointer';

          // Tap-to-cycle to the next image in the moment
          itemWrapper.addEventListener('click', () => {
            const nextIdx = (imgIdx + 1) % moment.images.length;
            const nextImgWrapper = scrollDiv.children[nextIdx];
            scrollDiv.scrollTo({
              left: nextImgWrapper.offsetLeft,
              behavior: 'smooth'
            });
          });

          itemWrapper.appendChild(canvas);
          scrollDiv.appendChild(itemWrapper);
        });

        // Add a subtle hint overlay
        const multiHint = document.createElement('div');
        multiHint.className = 'slide-image-hint';
        multiHint.innerText = 'Tap image to see other photos';
        imgContainer.appendChild(multiHint);

        imgContainer.appendChild(scrollDiv);
      }

      // Info Container (Description text)
      const infoContainer = document.createElement('div');
      infoContainer.className = 'slide-info';

      const desc = document.createElement('p');
      desc.className = 'slide-description';
      desc.innerText = moment.description;

      infoContainer.appendChild(desc);

      slide.appendChild(imgContainer);
      slide.appendChild(infoContainer);
    }

    container.appendChild(slide);

    // 2. Create Navigation Dot
    const dot = document.createElement('button');
    dot.className = `nav-dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
    dot.addEventListener('click', () => {
      // Scroll outer container to the clicked slide
      container.scrollTo({
        left: slide.offsetLeft,
        behavior: 'smooth'
      });
    });
    nav.appendChild(dot);
  });

  // Track scroll position to update dots
  const dots = document.querySelectorAll('.nav-dot');
  
  const observerOptions = {
    root: container,
    threshold: 0.6 // Slide is "active" if 60% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeIdx = parseInt(entry.target.dataset.index);
        dots.forEach((dot, dotIdx) => {
          if (dotIdx === activeIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  // Observe all slides
  document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
  });
});

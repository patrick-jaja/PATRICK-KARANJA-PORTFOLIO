/**
 * ═══════════════════════════════════════════════════════════════
 * RESPONSIVE FIXES & RESOLUTION CORRECTIONS
 * ═══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', function() {
  /**
   * 1. FIX IFRAME ASPECT RATIOS
   * Ensures all embedded content maintains proper aspect ratio
   */
  function fixIframeAspectRatios() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
      const container = iframe.parentElement;
      
      // Skip if already has a proper container
      if (container.classList.contains('video-container') || 
          container.classList.contains('drive-preview')) {
        return;
      }
      
      // Create wrapper with proper aspect ratio
      const wrapper = document.createElement('div');
      wrapper.className = 'video-container';
      wrapper.style.paddingBottom = '56.25%'; // 16:9 default
      
      iframe.parentNode.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });
  }

  /**
   * 2. OPTIMIZE IMAGE LOADING
   * Add loading="lazy" and proper dimensions
   */
  function optimizeImages() {
    const images = document.querySelectorAll('img:not([loading])');
    
    images.forEach(img => {
      // Add lazy loading
      img.loading = 'lazy';
      
      // Ensure images have alt text for accessibility
      if (!img.alt) {
        img.alt = 'Portfolio image';
      }
      
      // Add error handling
      img.addEventListener('error', function() {
        console.warn('Image failed to load:', this.src);
        this.style.backgroundColor = '#f0f0f0';
        this.style.minHeight = '200px';
      });
    });
  }

  /**
   * 3. FIX GALLERY GRID RESPONSIVENESS
   * Adjust columns based on viewport width
   */
  function fixGalleryGrid() {
    const galleryGrids = document.querySelectorAll('.masonry-grid');
    
    function adjustGridColumns() {
      galleryGrids.forEach(grid => {
        const width = window.innerWidth;
        
        if (width < 640) {
          grid.style.columnCount = '1';
          grid.style.columnGap = '12px';
        } else if (width < 1024) {
          grid.style.columnCount = '2';
          grid.style.columnGap = '16px';
        } else {
          grid.style.columnCount = '3';
          grid.style.columnGap = '20px';
        }
      });
    }
    
    adjustGridColumns();
    window.addEventListener('resize', adjustGridColumns);
  }

  /**
   * 4. ENSURE PROPER CONTAINER SIZING
   * Prevent overflow on all screen sizes
   */
  function fixContainerSizing() {
    const containers = document.querySelectorAll(
      '[class*="max-w"], .container, .gallery-container, .project-gallery'
    );
    
    containers.forEach(container => {
      // Ensure no horizontal overflow
      container.style.boxSizing = 'border-box';
      
      // Add responsive padding
      const applyResponsivePadding = () => {
        const width = window.innerWidth;
        if (width < 640) {
          container.style.paddingLeft = '16px';
          container.style.paddingRight = '16px';
        } else if (width < 1024) {
          container.style.paddingLeft = '24px';
          container.style.paddingRight = '24px';
        } else {
          container.style.paddingLeft = '32px';
          container.style.paddingRight = '32px';
        }
      };
      
      applyResponsivePadding();
      window.addEventListener('resize', applyResponsivePadding);
    });
  }

  /**
   * 5. FIX VIDEO EMBEDS FROM GOOGLE DRIVE
   * Add proper error handling and loading states
   */
  function fixGoogleDriveEmbeds() {
    const drives = document.querySelectorAll(
      'iframe[src*="drive.google.com"]'
    );
    
    drives.forEach(iframe => {
      const src = iframe.src;
      
      // Ensure proper export format for Google Drive previews
      if (!src.includes('preview') && !src.includes('export')) {
        // Add preview parameter if missing
        if (!src.includes('?')) {
          iframe.src = src + '?usp=preview';
        }
      }
      
      // Add loading animation
      const loader = document.createElement('div');
      loader.className = 'embed-loader';
      loader.innerHTML = '<div class="spinner"></div>';
      iframe.parentNode.insertBefore(loader, iframe);
      
      iframe.addEventListener('load', () => {
        if (loader) loader.remove();
      });
    });
  }

  /**
   * 6. ENSURE PROPER TEXT WRAPPING
   * Prevent text overflow in cards and titles
   */
  function fixTextOverflow() {
    const textElements = document.querySelectorAll(
      'h1, h2, h3, p, span, li'
    );
    
    textElements.forEach(el => {
      // Ensure word breaking works properly
      el.style.overflowWrap = 'break-word';
      el.style.wordBreak = 'break-word';
      el.style.hyphens = 'auto';
    });
  }

  /**
   * 7. CHECK & FIX IMAGE DIMENSIONS
   * Set proper width and height attributes
   */
  function setImageDimensions() {
    const images = document.querySelectorAll('img[src*="assets"]');
    
    images.forEach(img => {
      const src = img.src;
      
      // Set reasonable defaults if not specified
      if (!img.width || !img.height) {
        // For hero images
        if (src.includes('hero') || src.includes('banner')) {
          img.width = '1200';
          img.height = '600';
        }
        // For gallery items
        else if (src.includes('gallery') || src.includes('portfolio')) {
          img.width = '400';
          img.height = '300';
        }
        // For thumbnails
        else if (src.includes('thumb')) {
          img.width = '200';
          img.height = '200';
        }
        // Default fallback
        else {
          img.width = '800';
          img.height = '600';
        }
      }
    });
  }

  /**
   * 8. FIX PROJECT CARD LAYOUTS
   * Ensure consistent heights and proper spacing
   */
  function fixProjectCards() {
    const projectCards = document.querySelectorAll(
      '.project-card, [class*="project"]'
    );
    
    projectCards.forEach(card => {
      // Ensure card doesn't overflow
      card.style.overflow = 'hidden';
      
      // Set proper display
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
    });
  }

  /**
   * 9. ADD VIEWPORT META FIXES
   * Ensure viewport is properly configured
   */
  function ensureViewportMeta() {
    let viewport = document.querySelector('meta[name="viewport"]');
    
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      document.head.appendChild(viewport);
    } else {
      // Ensure proper viewport settings
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
    }
  }

  /**
   * 10. MONITOR RESIZE & RECALCULATE LAYOUTS
   */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      fixIframeAspectRatios();
      fixContainerSizing();
      fixGalleryGrid();
    }, 250); // Debounce to every 250ms
  });

  /**
   * INITIALIZE ALL FIXES
   */
  function initializeAllFixes() {
    ensureViewportMeta();
    fixIframeAspectRatios();
    optimizeImages();
    fixGalleryGrid();
    fixContainerSizing();
    fixGoogleDriveEmbeds();
    fixTextOverflow();
    setImageDimensions();
    fixProjectCards();
  }

  // Run all fixes when DOM is ready
  initializeAllFixes();

  /**
   * UTILITY: Check if elements are visible
   * Re-run fixes when elements become visible
   */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.tagName === 'IFRAME') {
          // Iframe is now visible, ensure it's properly sized
          const container = entry.target.parentElement;
          if (container && !container.classList.contains('video-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'video-container';
            entry.target.parentNode.insertBefore(wrapper, entry.target);
            wrapper.appendChild(entry.target);
          }
        }
      });
    });

    document.querySelectorAll('iframe').forEach(iframe => {
      observer.observe(iframe);
    });
  }

  /**
   * CONSOLE LOGGING FOR DEBUGGING
   */
  console.log('✅ Portfolio responsive fixes initialized');
  console.log('📱 Current viewport width:', window.innerWidth);
  console.log('🖥️ Current viewport height:', window.innerHeight);
  console.log('📐 Device pixel ratio:', window.devicePixelRatio);
});

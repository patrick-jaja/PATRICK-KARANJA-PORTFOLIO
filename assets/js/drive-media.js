document.querySelectorAll('video source[data-drive-id]').forEach(source => {
  const video = source.closest('video');
  if (!video) return;

  if (video.id === 'hero-bg-vid') {
    video.remove();
    return;
  }

  const frame = document.createElement('iframe');
  frame.src = `https://drive.google.com/file/d/${source.dataset.driveId}/preview`;
  frame.title = source.dataset.driveTitle || 'Video preview';
  frame.loading = 'lazy';
  frame.allow = 'autoplay; encrypted-media; picture-in-picture';
  frame.allowFullscreen = true;
  if (video.className) frame.className = video.className;
  frame.style.cssText = 'display:block;width:100%;border:0';

  const interlude = video.closest('.video-interlude');
  if (interlude) {
    frame.style.cssText += ';position:absolute;inset:0;height:100%';
    interlude.querySelector('.vi-sound-btn')?.remove();
    interlude.querySelector('.vi-progress')?.remove();
  } else if (getComputedStyle(video.parentElement).aspectRatio !== 'auto') {
    frame.style.height = '100%';
  } else {
    frame.style.aspectRatio = source.dataset.aspect || '16 / 9';
    frame.style.height = 'auto';
  }

  video.replaceWith(frame);
});
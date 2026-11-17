const thumbnails = {
  '1wCbBazfkEsp495GOZnwZVaS-0sfABS7x': new URL('../video-thumbnails/1wCbBazfkEsp495GOZnwZVaS-0sfABS7x.jpg', import.meta.url).href,
  '1pEM1JVei1QqiwUTtPPtY6rfO2ZjyPcV4': new URL('../video-thumbnails/1pEM1JVei1QqiwUTtPPtY6rfO2ZjyPcV4.jpg', import.meta.url).href,
  '1_ylXMGyPZDB_38dnSFEBEkMKWKONI-3b': new URL('../video-thumbnails/1_ylXMGyPZDB_38dnSFEBEkMKWKONI-3b.jpg', import.meta.url).href,
  '1z2IN8aQ8gBOrSo52yKW_OHg69Wt5X5og': new URL('../video-thumbnails/1z2IN8aQ8gBOrSo52yKW_OHg69Wt5X5og.jpg', import.meta.url).href,
  '1yCnA4MXfxHof4TigPL1XE8jLFOdG1wtx': new URL('../video-thumbnails/1yCnA4MXfxHof4TigPL1XE8jLFOdG1wtx.jpg', import.meta.url).href,
  '1V1UUnqBW7XvQEgRNFIZ-cvKaVISdcYlu': new URL('../video-thumbnails/1V1UUnqBW7XvQEgRNFIZ-cvKaVISdcYlu.jpg', import.meta.url).href,
  '1vHSCDPBUxGLRPTYBI9iGHcGV3QgOjKdZ': new URL('../video-thumbnails/1vHSCDPBUxGLRPTYBI9iGHcGV3QgOjKdZ.jpg', import.meta.url).href,
  '1Uzu1QG-rAvZ07mYFs0UVbeYlSFhgYnBg': new URL('../video-thumbnails/1Uzu1QG-rAvZ07mYFs0UVbeYlSFhgYnBg.jpg', import.meta.url).href,
  '1w0HUtUbrzqv2kCR0QbYw58iNEOP3HfR6': new URL('../video-thumbnails/1w0HUtUbrzqv2kCR0QbYw58iNEOP3HfR6.jpg', import.meta.url).href,
  '1FOHCGO-JszwiElOqGcUxutsYVxAEzzqe': new URL('../video-thumbnails/1FOHCGO-JszwiElOqGcUxutsYVxAEzzqe.jpg', import.meta.url).href,
  '1OF9lnKy2eDwEcjBG0iQ6wXBtyIetb3Oh': new URL('../video-thumbnails/1OF9lnKy2eDwEcjBG0iQ6wXBtyIetb3Oh.jpg', import.meta.url).href,
  '1G-GnhqtVU7XXzMIWRW9cX2WGMLnjV26Q': new URL('../video-thumbnails/1G-GnhqtVU7XXzMIWRW9cX2WGMLnjV26Q.jpg', import.meta.url).href,
  '1miWSStTFrBCdneUNbMK4kza1tLHXSiYd': new URL('../video-thumbnails/1miWSStTFrBCdneUNbMK4kza1tLHXSiYd.jpg', import.meta.url).href,
  '1qtDGh9OCOVEBmBuJfMO-Ri87dSaS-WYo': new URL('../video-thumbnails/1qtDGh9OCOVEBmBuJfMO-Ri87dSaS-WYo.jpg', import.meta.url).href,
  '1wy0AEAXjnu6xieRUpniwwp49ne6uPIov': new URL('../video-thumbnails/1wy0AEAXjnu6xieRUpniwwp49ne6uPIov.jpg', import.meta.url).href,
  '1EHqag9-WwfhEZfPEftQDQQaydPxC2cly': new URL('../video-thumbnails/1EHqag9-WwfhEZfPEftQDQQaydPxC2cly.jpg', import.meta.url).href,
  'eaEWOt1A5NI': new URL('../video-thumbnails/youtube-eaEWOt1A5NI.jpg', import.meta.url).href,
};

const style = document.createElement('style');
style.textContent = `
  .video-preview-control {
    position: absolute;
    inset: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    overflow: hidden;
    border: 0;
    background: #111827;
    color: #fff;
    cursor: pointer;
    text-align: left;
  }
  .video-preview-control img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .45s ease;
  }
  .video-preview-control::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgb(0 0 0 / 48%) 100%);
    content: "";
  }
  .video-preview-control:hover img,
  .video-preview-control:focus-visible img {
    transform: scale(1.035);
  }
  .video-preview-control:focus-visible {
    outline: 3px solid #84cc16;
    outline-offset: -3px;
  }
  .video-preview-play {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    display: grid;
    width: 3.75rem;
    height: 3.75rem;
    place-items: center;
    border: 1px solid rgb(255 255 255 / 70%);
    border-radius: 9999px;
    background: rgb(17 24 39 / 65%);
    box-shadow: 0 6px 24px rgb(0 0 0 / 28%);
    transform: translate(-50%, -50%);
    backdrop-filter: blur(8px);
  }
  .video-preview-play::before {
    width: 0;
    height: 0;
    margin-left: .2rem;
    border-top: .5rem solid transparent;
    border-bottom: .5rem solid transparent;
    border-left: .75rem solid #fff;
    content: "";
  }
  .video-preview-label {
    position: absolute;
    right: 1.25rem;
    bottom: 1.1rem;
    left: 1.25rem;
    z-index: 1;
    overflow: hidden;
    font: 700 .7rem/1.4 Inter, sans-serif;
    letter-spacing: .12em;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .video-interlude .vi-overlay { z-index: 1; pointer-events: none; }
  .video-interlude .video-preview-control { z-index: 2; }
  .video-interlude .vi-inner { z-index: 3; pointer-events: none; }
  .video-interlude.video-playing .vi-overlay,
  .video-interlude.video-playing .vi-inner { display: none; }
  .video-interlude.video-playing iframe { z-index: 4; }
  @media (prefers-reduced-motion: reduce) {
    .video-preview-control img { transition: none; }
  }
`;
document.head.append(style);

function installPreview({ host, media, id, provider, title, poster }) {
  if (!host || !id || host.dataset.videoPreviewReady === 'true') return;

  host.dataset.videoPreviewReady = 'true';
  host.style.position = 'relative';
  host.style.overflow = 'hidden';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'video-preview-control';
  button.setAttribute('aria-label', `Play ${title}`);

  const image = document.createElement('img');
  const imageUrl = poster || thumbnails[id] || '';
  if (imageUrl) image.src = imageUrl;
  else image.remove();
  image.alt = '';
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => image.remove(), { once: true });

  const playIcon = document.createElement('span');
  playIcon.className = 'video-preview-play';
  playIcon.setAttribute('aria-hidden', 'true');

  const label = document.createElement('span');
  label.className = 'video-preview-label';
  label.textContent = 'Play film';

  button.append(image, playIcon, label);
  if (media) media.replaceWith(button);
  else host.append(button);

  button.addEventListener('click', () => {
    const frame = document.createElement('iframe');
    frame.title = title;
    frame.loading = 'eager';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0';
    frame.src = provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`
      : `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview?autoplay=1`;
    if (host.classList.contains('video-interlude')) host.classList.add('video-playing');
    button.replaceWith(frame);
  });
}

document.querySelectorAll('video source[data-drive-id]').forEach((source) => {
  const video = source.closest('video');
  if (!video) return;

  const host = video.closest('.video-interlude') || video.parentElement;
  installPreview({
    host,
    media: video,
    id: source.dataset.driveId,
    provider: 'drive',
    title: source.dataset.driveTitle || 'Video',
    poster: source.dataset.poster || video.getAttribute('poster'),
  });
});

document.querySelectorAll('[data-drive-video], [data-youtube-id]').forEach((host) => {
  const provider = host.hasAttribute('data-youtube-id') ? 'youtube' : 'drive';
  installPreview({
    host,
    id: host.dataset.youtubeId || host.dataset.driveVideo,
    provider,
    title: host.dataset.videoTitle || 'Video',
    poster: host.dataset.poster,
  });
});

document.querySelectorAll('iframe').forEach((frame) => {
  const source = frame.getAttribute('src') || '';
  const driveId = source.match(/drive\.google\.com\/file\/d\/([^/]+)/)?.[1];
  const youtubeId = source.match(/(?:youtube(?:-nocookie)?\.com\/embed\/|youtu\.be\/)([^?&/]+)/)?.[1];
  const id = driveId || youtubeId;
  if (!id) return;

  installPreview({
    host: frame.parentElement,
    media: frame,
    id,
    provider: driveId ? 'drive' : 'youtube',
    title: frame.title || 'Video',
  });
});

// video-showcase.js
// This script imports projectData from assets/projectData.js,
// renders the video grid, sets up filters, lazy-loading and a fullscreen modal
// player using Google Drive previews.

import { projectData as importedProjectData } from '../projectData.js';

function $qs(sel, ctx=document){ return ctx.querySelector(sel); }
function $qa(sel, ctx=document){ return Array.from(ctx.querySelectorAll(sel)); }

// Build UI
function renderShowcase(data){
  const container = document.getElementById('video-showcase-root');
  if(!container) return;

  // Featured reel (first item is treated as featured)
  const featured = data[0];
  const featuredWrap = document.createElement('div');
  featuredWrap.className = 'featured-reel';
  featuredWrap.innerHTML = `
    <div class="featured-video">
      <iframe class="w-full aspect-video border-0" src="${featured.video}" title="${escapeHtml(featured.title)}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="featured-meta mt-3">
      <h3 class="font-display font-bold text-lg">${escapeHtml(featured.title)}</h3>
      <p class="text-sm text-gray-600">${escapeHtml(featured.client)} · ${escapeHtml(featured.category)}</p>
    </div>
  `;
  container.appendChild(featuredWrap);

  // Filter bar
  const categories = ['All', 'Corporate Events','Branding','Campaigns','Documentaries','Motion Graphics'];
  const filterBar = document.createElement('div');
  filterBar.className = 'filter-bar';
  categories.forEach(cat=>{
    const btn = document.createElement('button');
    btn.className = 'filter-btn'+(cat==='All'? ' active':'');
    btn.textContent = cat;
    btn.setAttribute('data-cat', cat);
    btn.addEventListener('click', ()=>{
      $qa('.filter-btn', filterBar).forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(cat);
    });
    filterBar.appendChild(btn);
  });
  container.appendChild(filterBar);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'video-grid';
  container.appendChild(grid);

  data.forEach((p, idx)=>{
    // skip featured in grid if it's the first
    if(idx===0) return;
    const card = document.createElement('article');
    card.className = 'video-card rounded-xl';
    card.setAttribute('data-category', p.category||'');
    card.innerHTML = `
      <div style="position:relative">
        <img class="video-poster" src="${p.thumbnail}" alt="${escapeHtml(p.title)} thumbnail" loading="lazy" />
        <button class="play-btn" aria-label="Play ${escapeHtml(p.title)}">
          <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M5 3v18l15-9z"></path></svg>
        </button>
      </div>
      <div class="meta bg-white p-3 text-black">
        <h4 class="font-semibold text-sm mb-1">${escapeHtml(p.title)}</h4>
        <p class="text-xs text-gray-600 mb-1">${escapeHtml(p.client)} · ${escapeHtml(p.category)}</p>
        <p class="text-xs text-gray-500">${escapeHtml(p.description||'')}</p>
      </div>
    `;
    // attach data for lazy loader and modal
    card.dataset.video = p.video;
    card.dataset.poster = p.thumbnail;
    card.dataset.title = p.title;
    grid.appendChild(card);

    // click handler: open modal and play
    card.querySelector('.play-btn').addEventListener('click', ()=> openModal(p));
    card.querySelector('.video-poster').addEventListener('click', ()=> openModal(p));
  });

  // set up intersection observer to lazy load featured and thumbnails to video sources
  setupLazyLoading();
}

function applyFilter(category){
  const items = $qa('.video-card');
  items.forEach(it=>{
    const cat = it.getAttribute('data-category') || '';
    if(category==='All' || category===cat) it.style.display='block';
    else it.style.display='none';
  });
}

// Modal
let modalOverlay;
let modalFrame;
function buildModal(){
  modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.setAttribute('role','dialog');
  modalOverlay.setAttribute('aria-modal','true');
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title text-white"></div>
        <div>
          <button class="modal-close" aria-label="Close video">✕</button>
        </div>
      </div>
      <div class="modal-body bg-black">
        <iframe id="modal-video-player" title="Video preview" class="w-full aspect-video border-0" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);
  modalOverlay.querySelector('.modal-close').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e)=>{ if(e.target===modalOverlay) closeModal(); });
  modalFrame = document.getElementById('modal-video-player');
  // keyboard
  window.addEventListener('keydown', (e)=>{
    if(e.key==='Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

function openModal(project){
  if(!modalOverlay) buildModal();
  modalOverlay.classList.add('active');
  modalOverlay.querySelector('.modal-title').textContent = project.title;
  modalFrame.src = project.video;
}

function closeModal(){
  if(!modalOverlay) return;
  modalOverlay.classList.remove('active');
  if(modalFrame) modalFrame.src = 'about:blank';
}

// Lazy loading: set video src when the poster/featured video enters viewport
function setupLazyLoading(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        // cards: when in view, replace poster img with a small preview video element (but do NOT autoplay)
        if(el.classList && el.classList.contains('video-card')){
          // nothing heavy to load; thumbnails are already images. We could optionally set up a preview small video.
          io.unobserve(el);
        }
      }
    });
  }, {rootMargin:'200px 0px'});

  // Observe cards (for potential future progressive loading)
  $qa('.video-card').forEach(c=> io.observe(c));
}

function escapeHtml(s){ if(!s) return ''; return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// init
function init(){
  const data = importedProjectData || window.projectData || [];
  if(!data || !data.length){
    const root = document.getElementById('video-showcase-root');
    if(root) root.innerHTML = '<p class="text-sm text-gray-600">No videos found. Add entries to assets/projectData.js</p>';
    return;
  }
  renderShowcase(data);
}

// Wait for DOM
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
else init();

// === SCRIPT.JS — Louis Niango Portfolio ===

// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

if (cursor && trail) {
  let mx = -100, my = -100, tx = -100, ty = -100;
  let started = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!started) {
      started = true;
      cursor.classList.add('active');
      trail.classList.add('active');
    }
  });

  function animateCursors() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';
    requestAnimationFrame(animateCursors);
  }
  animateCursors();

  document.querySelectorAll('a, button, .project-card, .cert-card, .research-card, .stack-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      trail.style.transform  = 'translate(-50%,-50%) scale(1.5)';
      trail.style.opacity    = '.2';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.transform  = 'translate(-50%,-50%) scale(1)';
      trail.style.opacity    = '.5';
    });
  });
}

// ─── DARK MODE ───
function initDarkMode() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateToggleIcon(saved);
}
function updateToggleIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.querySelector('.toggle-icon').textContent = theme === 'dark' ? '○' : '◐';
}
document.getElementById('themeToggle')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon(next);
});

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 40);
  const btn = document.getElementById('topBtn');
  if (btn) { btn.style.display = window.scrollY > 500 ? 'flex' : 'none'; }
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.querySelector('#navbar')?.offsetHeight || 80;
    window.scrollTo({ top: target.offsetTop - offset - 20, behavior: 'smooth' });
  });
});

// ─── ACTIVE NAV LINK ───
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  links.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === `#${current}`); });
});

// ─── BACK TO TOP ───
document.getElementById('topBtn')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── FILTER PROJECTS ───
function filterProjects(type, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    const show = type === 'all' || card.dataset.type === type;
    card.style.display = show ? 'block' : 'none';
  });
}

// ─── PROJECT DATA ───
const projectData = {
  cifar10: {
    title: "Classification CIFAR-10",
    desc: "CNN (Convolutional Neural Network) network for image classification implemented and trained (CPU) from scratch on the CIFAR-10 dataset, with augmentation techniques and TensorBoard monitoring.",
    metrics: { accuracy: "70.02%", dataset: "60 000 images", epochs: "50" },
    tech: "PyTorch, CNN, DataLoader, TensorBoard",
    link: "https://gitlab.com/cednian/classification_cifar10.git",
    tags: ["Deep Learning", "Computer Vision", "PyTorch"]
  },
  gravite: {
    title: "Gravitational Potential Network",
    desc: "Development of a MLP (Multi-Layer Perceptron) to approximate the multi-body gravitational potential in N dimensions.",
    tech: "PyTorch, Python, Deep Learning, PCA, scikit-learn",
    imgs: ["images/gravit.png"],
    link: "https://github.com/lniango/Deeplanet.git",
    tags: ["Physics", "Neural Networks", "PyTorch"]
  },
  series_forecasting: {
    title: "Time-Series Forecasting",
    desc: "Implementation of a simple LSTM model to solve a many-to-one time-series prediction problem on a simulated sine wave.",
    tech: "TensorFlow/Keras, Pandas, Python, scikit-learn, RNN",
    imgs: ["images/pred_temp.png"],
    tags: ["Time Series", "LSTM", "TensorFlow"]
  },
  gru_classif: {
    title: "Classification with GRU",
    desc: "Implementation of a text classification model to predict the topic of a Reuters newswire among 46 categories (finance, politics, economics, etc.).",
    tech: "TensorFlow/Keras, Python, RNN",
    tags: ["NLP", "GRU", "Text Classification"]
  },
  denoising: {
    title: "Image Denoising",
    desc: "Implementation and training of a convolutional autoencoder for denoising images — an application of inverse problem solving with deep priors.",
    tech: "TensorFlow/Keras, Python, CNN, Autoencoder",
    imgs: ["images/output.png", "images/output1.png"],
    link: "https://github.com/lniango/Anomaly-detection-Image-denoising.git",
    tags: ["Inverse Problems", "Autoencoders", "Image Processing"]
  },
  med: {
    title: "Pneumonia Computer-Aided Diagnosis",
    desc: "Medical image classification model to assist with computer-aided diagnosis. Training on the Kaggle Chest X-Ray Images (Pneumonia) dataset.",
    metrics: { accuracy: "84.93%", model: "ResNet18" },
    tech: "PyTorch, Python, CNN, ResNet18",
    imgs: ["images/normal.png", "images/pneumonia3.png"],
    link: "https://github.com/lniango/Computer-assisted-diagnosis.git",
    tags: ["Medical AI", "Computer Vision", "Classification"]
  },
  unet: {
    title: "Cell Segmentation & Tracking with U-Net",
    desc: "Implementation of a U-Net architecture for pixel-level semantic segmentation on medical imaging datasets. Designed for precise delineation of anatomical structures and pathologies.",
    tech: "PyTorch, Python, U-Net, CNN, Segmentation",
    link: "https://github.com/lniango/Segmentation_tracking",
    tags: ["Medical AI", "Segmentation", "U-Net", "Computer Vision"]
  },
  multiview: {
    title: "Multi-view 3D Reconstruction",
    desc: "Pipeline combining geometry-based (camera calibration, epipolar geometry) and learning-based methods to recover dense 3D structure from multiple 2D image observations.",
    tech: "Python, PyTorch, Open3D, OpenCV, Multi-view Geometry",
    link: "https://github.com/lniango/3D_reconstruction",
    tags: ["3D Reconstruction", "Multi-view Geometry", "Computer Vision"]
  },
  opengl: {
    title: "OpenGL Renderer",
    desc: "Rendering of triangles and more complex 3D models with OpenGL and Blender. Includes Voronoi-based procedural geometry and Assimp for model loading.",
    tech: "OpenGL, C++, Cura, Blender, Assimp",
    imgs: ["images/openGL_renderer.png"],
    video: "images/voronoi.mp4",
    tags: ["3D Graphics", "OpenGL", "C++"]
  },
  indus: {
    title: "3D Reverse Engineering from GCode",
    desc: "3D reconstruction of models from GCode, design and implementation of methods to compare reconstructed and original models geometrically.",
    tech: "OpenGL, C++, Cura, Blender, Assimp",
    tags: ["3D Printing", "Reverse Engineering", "C++"]
  },
  cisro: {
    title: "Image2Biomass — CSIRO",
    desc: "Design and implementation of a multimodal deep learning model combining aerial imagery and tabular metadata to estimate biomass through supervised regression. Uses DINOv2 as the vision backbone.",
    tech: "Python, PyTorch, DINOv2, EfficientNet, Albumentations, NumPy, Pandas, Kaggle",
    link: "https://www.kaggle.com/code/cedricniango/dino-predictor",
    tags: ["Deep Learning", "Computer Vision", "Multimodal", "Regression"]
  }
};

// ─── OPEN PROJECT MODAL ───
function openProject(key) {
  const p = projectData[key];
  if (!p) return;
  const modal = document.getElementById('project-modal');

  document.getElementById('modal-tags').innerHTML = (p.tags || []).map(t => `<span>${t}</span>`).join('');
  document.getElementById('modal-title').textContent = p.title;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-tech').textContent = p.tech || '';

  const metricsEl = document.getElementById('modal-metrics');
  if (p.metrics) {
    metricsEl.innerHTML = `<div class="metrics-grid">` +
      Object.entries(p.metrics).map(([k, v]) =>
        `<div class="metric-item"><span class="metric-val">${v}</span><span class="metric-key">${k}</span></div>`
      ).join('') + `</div>`;
  } else { metricsEl.innerHTML = ''; }

  const imgContainer = document.getElementById('modal-img-container');
  imgContainer.innerHTML = '';
  if (p.imgs?.length) {
    p.imgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src; img.loading = 'lazy';
      imgContainer.appendChild(img);
    });
  }

  const vid = document.getElementById('modal-video');
  if (p.video) { vid.src = p.video; vid.style.display = 'block'; vid.play(); }
  else { vid.style.display = 'none'; vid.src = ''; }

  const linkEl = document.getElementById('modal-link');
  linkEl.innerHTML = p.link
    ? `<a href="${p.link}" target="_blank"><i class="bi bi-box-arrow-up-right"></i> View Repository</a>`
    : '';

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// ─── OPEN CERT ───
function openCert(path, title) {
  // Open directly in new tab — works for both PDF and images on all browsers/mobile
  window.open(path, '_blank');
}

// ─── CLOSE MODAL ───
function closeModal() {
  document.getElementById('project-modal').style.display = 'none';
  document.body.style.overflow = '';
  const vid = document.getElementById('modal-video');
  vid.pause(); vid.src = '';
}
window.addEventListener('click', e => { if (e.target.id === 'project-modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── INTERSECTION OBSERVER ───
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
  });
}, { threshold: 0.1 });

const styleTag = document.createElement('style');
styleTag.textContent = `.visible { opacity:1 !important; transform:none !important; }`;
document.head.appendChild(styleTag);

document.querySelectorAll('.skill-block, .tl-card, .project-card, .stat-card, .cert-card, .research-card, .stack-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});

// ─── CONTACT FORM ───
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const status = document.getElementById('form-status');
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        status.style.color = '#22c55e';
        status.textContent = "✓ Message sent! I'll get back to you soon.";
        form.reset();
      } else throw new Error();
    } catch {
      status.style.color = '#ef4444';
      status.textContent = '✗ Something went wrong. Please email me directly.';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
    }
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  document.querySelector('.filter-btn')?.classList.add('active');
});

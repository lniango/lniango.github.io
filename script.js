// === SCRIPT.JS — Louis Niango Portfolio ===
//console.log("SCRIPT LOADED");
// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');

if (cursor && trail) {
  let mx = -100, my = -100, tx = -100, ty = -100;
  let started = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
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

  document.querySelectorAll('a, button, .project-card, .cert-card').forEach(el => {
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

  // Back to top button
  const btn = document.getElementById('topBtn');
  if (btn) btn.style.display = window.scrollY > 500 ? 'flex' : 'none';
  if (btn) btn.style.alignItems = 'center';
  if (btn) btn.style.justifyContent = 'center';
});

// ─── SMOOTH SCROLL + ACTIVE LINK ───
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.querySelector('#navbar')?.offsetHeight || 80;
    window.scrollTo({ top: target.offsetTop - offset - 20, behavior: 'smooth' });
  });
});

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
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
    if (show) card.style.animation = 'modal-in .4s ease forwards';
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
    desc: "Implementation and training of an autoencoder for denoising images.",
    tech: "TensorFlow/Keras, Python, CNN, MLP",
    imgs: ["images/output.png", "images/output1.png"],
    link: "https://github.com/lniango/Anomaly-detection-Image-denoising.git",
    tags: ["Computer Vision", "Autoencoders", "Image Processing"]
  },
  med: {
    title: "Pneumonia CAD",
    desc: "Medical image classification model to assist with computer-aided diagnosis. Training on the Kaggle dataset: Chest X-Ray Images (Pneumonia).",
    metrics: { accuracy: "84.93%", model: "ResNet18" },
    tech: "PyTorch, Python, CNN, ResNet18",
    imgs: ["images/normal.png", "images/pneumonia3.png"],
    link: "https://github.com/lniango/Computer-assisted-diagnosis.git",
    tags: ["Medical AI", "Computer Vision", "Classification"]
  },
  opengl: {
    title: "OpenGL Renderer",
    desc: "Rendering of triangles and more complex 3D models with OpenGL and Blender.",
    tech: "OpenGL, C++, Cura, Blender, Assimp",
    imgs: ["images/openGL_renderer.png"],
    video: "images/voronoi.mp4",
    tags: ["3D Graphics", "OpenGL", "C++"]
  },
  indus: {
    title: "3D Reverse Engineering",
    desc: "3D reconstruction of models from Gcode, design and implementation of methods to compare reconstructed and original models.",
    tech: "OpenGL, C++, Cura, Blender, Assimp",
    tags: ["3D Printing", "Reverse Engineering", "C++"]
  },
  cisro: {
    title: "Image2Biomass — CSIRO",
    desc: "Design and implementation of a multimodal deep learning model combining aerial imagery and tabular metadata to estimate biomass through supervised regression.",
    tech: "Python, PyTorch, DINOv2, EfficientNet, Albumentations, NumPy, Pandas, Kaggle",
    link: "https://www.kaggle.com/code/cedricniango/dino-predictor",
    tags: ["Deep Learning", "Computer Vision", "Multimodal", "Regression"]
  },
  celltrack: {
  title: "Cell Segmentation & Tracking",
  desc: "Comparative study of segmentation methods applied to temporal tracking of HeLa cells (DIC-C2DH-HeLa dataset, Cell Tracking Challenge). The goal is to segment cells frame-by-frame and track their evolution over time.\n\nClassical methods (thresholding, Canny, watershed) are compared against a deep learning approach (U-Net). The pipeline evaluates robustness under low-contrast microscopy conditions typical of DIC imaging.",
  tech: "OpenCV, Scikit-image, SciPy, PyTorch, U-Net",
  link: "https://github.com/lniango/Segmentation_tracking",
  tags: ["Medical Imaging", "Segmentation", "Tracking", "Deep Learning"]
},
reconstruction3d: {
  title: "3D Object Reconstruction",
  desc: "Pipeline for 3D reconstruction of objects from multi-view images. The project explores classical computer vision techniques (Structure-from-Motion, multi-view geometry) and modern learning-based approaches for depth estimation and reconstruction.\n\nThe goal is to generate consistent 3D representations (point clouds / meshes) from image sequences, bridging geometric methods and deep learning approaches.",
  tech: "OpenCV, COLMAP, Multi-view Geometry, NeRF (concepts), Python",
  link: "https://github.com/lniango/3D_reconstruction",
  tags: ["3D Vision", "Reconstruction", "Geometry", "Deep Learning"]
}
};

// ─── OPEN PROJECT MODAL ───
function openProject(key) {
  const p = projectData[key];
  if (!p) return;
  const modal = document.getElementById('project-modal');

  // Tags
  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = (p.tags || []).map(t => `<span>${t}</span>`).join('');

  document.getElementById('modal-title').textContent = p.title;

  // Description
  const descEl = document.getElementById('modal-desc');
  descEl.textContent = p.desc;

  // Metrics
  const metricsEl = document.getElementById('modal-metrics');
  if (p.metrics) {
    metricsEl.innerHTML = `<div class="metrics-grid">` +
      Object.entries(p.metrics).map(([k, v]) =>
        `<div class="metric-item"><div class="metric-val">${v}</div><div class="metric-key">${k}</div></div>`
      ).join('') + `</div>`;
  } else {
    metricsEl.innerHTML = '';
  }

  document.getElementById('modal-tech').textContent = p.tech || '';

  // Images
  const imgContainer = document.getElementById('modal-img-container');
  imgContainer.innerHTML = '';
  if (p.imgs?.length) {
    p.imgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.loading = 'lazy';
      imgContainer.appendChild(img);
    });
  }

  // Video
  const vid = document.getElementById('modal-video');
  if (p.video) {
    vid.src = p.video;
    vid.style.display = 'block';
    vid.play();
  } else {
    vid.style.display = 'none';
    vid.src = '';
  }

  // Link
  const linkEl = document.getElementById('modal-link');
  if (p.link) {
    linkEl.innerHTML = `<a href="${p.link}" target="_blank"><i class="bi bi-box-arrow-up-right"></i> View Repository</a>`;
  } else {
    linkEl.innerHTML = '';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// ─── OPEN CERT MODAL ───
/*function openCert(pdfPath, title) {
  const modal = document.getElementById('project-modal');
  document.getElementById('modal-tags').innerHTML = '';
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = '';
  document.getElementById('modal-metrics').innerHTML = '';
  document.getElementById('modal-tech').textContent = '';
  document.getElementById('modal-link').innerHTML = '';
  document.getElementById('modal-img-container').innerHTML =
    `<iframe src="${pdfPath}" height="500px"></iframe>`;
  const vid = document.getElementById('modal-video');
  vid.style.display = 'none'; vid.src = '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}*/
function openCert(path, title) {
  const modal = document.getElementById('project-modal');
  document.getElementById('modal-tags').innerHTML = '';
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = '';
  document.getElementById('modal-metrics').innerHTML = '';
  document.getElementById('modal-tech').textContent = '';
  document.getElementById('modal-link').innerHTML = '';

  const imgContainer = document.getElementById('modal-img-container');
  
  // Détecte si c'est une image ou un PDF
  if (path.match(/\.(png|jpg|jpeg|webp)$/i)) {
    imgContainer.innerHTML = `<img src="${path}" style="width:100%; border-radius: 1rem 1rem 0 0; object-fit: contain; max-height: 500px;">`;
  } else {
    imgContainer.innerHTML = `<iframe src="${path}" height="500px"></iframe>`;
  }

  const vid = document.getElementById('modal-video');
  vid.style.display = 'none'; vid.src = '';
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// ─── CLOSE MODAL ───
function closeModal() {
  document.getElementById('project-modal').style.display = 'none';
  document.body.style.overflow = '';
  const vid = document.getElementById('modal-video');
  vid.pause(); vid.src = '';
}

window.addEventListener('click', e => {
  if (e.target.id === 'project-modal') closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ─── INTERSECTION OBSERVER (sections + skill bars) ───
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-block, .tl-card, .project-card, .stat-card, .cert-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});

// Add visible class handler
const styleTag = document.createElement('style');
styleTag.textContent = `.visible { opacity: 1 !important; transform: none !important; }`;
document.head.appendChild(styleTag);

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
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.style.color = '#22c55e';
        status.textContent = "✓ Message sent! I'll get back to you soon.";
        form.reset();
      } else {
        throw new Error();
      }
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
  const firstFilter = document.querySelector('.filter-btn');
  if (firstFilter) firstFilter.classList.add('active');
});

// === SCRIPT.JS - VERSION AMÉLIORÉE ===

// === DARK MODE ===
function initDarkMode() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'theme-toggle';
  toggleBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  
  const navContainer = document.querySelector('nav .container');
  navContainer.appendChild(toggleBtn);
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
  });
}

// === FILTER PROJECTS ===
function filterProjects(type) {
  const projects = document.querySelectorAll(".project");
  const buttons = document.querySelectorAll(".filters button");
  
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  projects.forEach(project => {
    if (type === "all" || project.dataset.type === type) {
      project.style.display = "block";
      project.style.animation = "fadeInUp 0.5s ease forwards";
    } else {
      project.style.display = "none";
    }
  });
}

// === SMOOTH SCROLL ===
const links = document.querySelectorAll("nav a");
links.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
      
      // Update active nav link
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// === PROJECT DATA ===
const projectData = {
  cifar10: {
    title: "Classification CIFAR-10",
    desc: "CNN (Convolutional Neural Network) network for image classification implemented and trained (CPU) from scratch on the CIFAR-10 dataset, with augmentation techniques and TensorBoard monitoring.",
    metrics: { accuracy: "70.02%", dataset: "60,000 images", epochs: "50" },
    tech: "PyTorch, CNN, DataLoader, TensorBoard",
    link: "https://gitlab.com/cednian/classification_cifar10.git",
    tags: ["Deep Learning", "Computer Vision", "PyTorch"]
  },
  gravite: {
    title: "Gravitational potential network",
    desc: "Development of a MLP (Multi-Layer Perceptron) to approximate the multi-body gravitational potential in N dimensions.",
    tech: "PyTorch, Python, Deep Learning, PCA, scikit-learn",
    imgs: ["images/gravit.png"],
    link: "https://github.com/lniango/Deeplanet.git",
    tags: ["Physics", "Neural Networks", "PyTorch"]
  },
  series_forecasting: {
    title: "Time-series forecasting",
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
    title: "Image denoising",
    desc: "Implementation and training of an autoencoder for denoising images.",
    tech: "TensorFlow/Keras, Python, CNN, MLP",
    imgs: ["images/output.png", "images/output1.png"],
    link: "https://github.com/lniango/Anomaly-detection-Image-denoising.git",
    tags: ["Computer Vision", "Autoencoders", "Image Processing"]
  },
  med: {
    title: "Pneumonia computer-assisted diagnosis",
    desc: "Medical image classification model to assist with computer-aided diagnosis. Training on popular Kaggle dataset: Chest X-Ray Images (Pneumonia).",
    metrics: { accuracy: "84.93%", model: "ResNet18" },
    tech: "PyTorch, Python, CNN, ResNet18",
    imgs: ["images/normal.png", "images/pneumonia3.png"],
    link: "https://github.com/lniango/Computer-assisted-diagnosis.git",
    tags: ["Medical AI", "Computer Vision", "Classification"]
  },
  opengl: {
    title: "Rendering with OpenGL",
    desc: "Rendering of triangles and more complex 3D models with OpenGL and Blender.",
    tech: "OpenGL, C++, Cura, Blender, Assimp",
    imgs: ["images/openGL_renderer.png"],
    video: "images/voronoi.mp4",
    tags: ["3D Graphics", "OpenGL", "C++"]
  },
  indus: {
    title: "Reverse engineering for 3D printing",
    desc: "3D reconstruction of models from Gcode, design and implementation of methods to compare reconstructed and original models.",
    tech: "OpenGL, C++, Cura, Blender, Assimp",
    tags: ["3D Printing", "Reverse Engineering", "C++"]
  },
  cisro:{
    title: "Multimodal Biomass Estimation from Aerial Images",
    desc: "Design and implementation of a multimodal deep learning model combining aerial imagery and tabular metadata to estimate biomass through supervised regression.",
    tech: "Python, PyTorch, DINOv2, EfficientNet, Albumentations, NumPy, Pandas, Kaggle",
    link: "https://www.kaggle.com/code/cedricniango/dino-predictor",
    tags: ["Deep Learning", "Computer Vision", "Multimodal Learning", "Regression"]
  }
};

// === OPEN PROJECT MODAL ===
function openCert(pdfPath, title) {
  const modal = document.getElementById("project-modal");
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-desc").innerText = "";
  document.getElementById("modal-tech").innerText = "";
  document.getElementById("modal-link").innerHTML = "";
  document.getElementById("modal-img-container").innerHTML = `
    <iframe src="${pdfPath}" width="100%" height="500px"
      style="border-radius: 0.75rem; border: none; margin-top: 1rem;">
    </iframe>
  `;
  const vidEl = document.getElementById("modal-video");
  vidEl.style.display = "none";
  vidEl.src = "";
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function openProject(key) {
  const modal = document.getElementById("project-modal");
  const project = projectData[key];
  
  document.getElementById("modal-title").innerText = project.title;
  document.getElementById("modal-desc").innerText = project.desc;
  document.getElementById("modal-tech").innerText = project.tech;
  
  // Display metrics if available
  const modalDesc = document.getElementById("modal-desc");
  if (project.metrics) {
    let metricsHTML = '<div class="metrics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; margin: 1rem 0;">';
    for (const [key, value] of Object.entries(project.metrics)) {
      metricsHTML += `
        <div style="text-align: center; padding: 1rem; background: var(--bg); border-radius: 0.5rem;">
          <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">${value}</div>
          <div style="font-size: 0.9rem; color: var(--muted); text-transform: capitalize;">${key}</div>
        </div>
      `;
    }
    metricsHTML += '</div>';
    modalDesc.innerHTML = project.desc + metricsHTML;
  }
  
  // Display images
  const imgContainer = document.getElementById("modal-img-container");
  imgContainer.innerHTML = "";
  if (project.imgs && project.imgs.length > 0) {
    project.imgs.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "modal-img mb-2";
      img.loading = "lazy"; // Lazy loading
      img.style.maxWidth = project.imgs.length === 1 ? "100%" : "48%";
      img.style.borderRadius = "0.75rem";
      imgContainer.appendChild(img);
    });
  }
  
  // Display link
  const linkEl = document.getElementById("modal-link");
  if (project.link) {
    linkEl.innerHTML = `
      <a href="${project.link}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1rem;">
        <i class="bi bi-box-arrow-up-right"></i> View repository
      </a>
    `;
  } else {
    linkEl.innerHTML = "";
  }
  
  // Display video
  const vidEl = document.getElementById("modal-video");
  if (project.video) {
    vidEl.src = project.video;
    vidEl.style.display = "block";
    vidEl.muted = true;
    vidEl.play();
  } else {
    vidEl.style.display = "none";
    vidEl.pause();
    vidEl.src = "";
  }
  
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

// === CLOSE MODAL ===
function closeModal() {
  const modal = document.getElementById("project-modal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Close modal on outside click
window.onclick = function(event) {
  const modal = document.getElementById("project-modal");
  if (event.target === modal) {
    closeModal();
  }
};

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// === CONTACT FORM ===
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        status.innerHTML = '<div style="color: #10b981; padding: 1rem; background: #d1fae5; border-radius: 0.5rem; margin-top: 1rem;">✓ Message sent successfully!</div>';
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(err => {
      status.innerHTML = '<div style="color: #ef4444; padding: 1rem; background: #fee2e2; border-radius: 0.5rem; margin-top: 1rem;">✗ An error occurred. Please try again.</div>';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send";
    });
  });
}

// === SCROLL TO TOP BUTTON ===
const topBtn = document.getElementById("topBtn");
window.onscroll = () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
};

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// === INTERSECTION OBSERVER FOR ANIMATIONS ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach(sec => observer.observe(sec));

// === ACTIVE NAV LINK ON SCROLL ===
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  
  // Set first filter button as active
  const firstFilterBtn = document.querySelector('.filters button');
  if (firstFilterBtn) firstFilterBtn.classList.add('active');
});
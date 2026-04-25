// typewriter.js
document.addEventListener('DOMContentLoaded', () => {
  const phrases = [
    "Computer Vision & Deep Learning Engineer.",
    "Bridging mathematical theory and scalable implementation.",
    "Exploring diffusion models & inverse problems.",
    "Seeking PhD / Full-time opportunities.",
    "PyTorch · CUDA · Neural Video Compression."
  ];

  const target = document.getElementById('typewriter');
  if (!target) return;

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      target.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) { deleting = true; setTimeout(tick, 2400); return; }
      setTimeout(tick, 55);
    } else {
      target.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; setTimeout(tick, 400); return; }
      setTimeout(tick, 28);
    }
  }

  tick();
});

// typewriter.js — multi-phrase cycling typewriter
document.addEventListener('DOMContentLoaded', () => {
  const phrases = [
    "Digital Imaging Engineer · ESIR, Université de Rennes.",
    "Computer Vision & Deep Learning enthusiast.",
    "Seeking PhD / Full-time opportunities.",
    "PyTorch · C++ · Neural Video Compression."
  ];

  const target = document.getElementById('typewriter');
  if (!target) return;

  let phraseIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      target.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2200); // pause at end
        return;
      }
      setTimeout(tick, 60);
    } else {
      target.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 30);
    }
  }

  tick();
});

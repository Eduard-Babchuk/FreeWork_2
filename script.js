const scoreDisplay = document.getElementById('score');
const clickCountDisplay = document.getElementById('clickCount');
let score = 100;
let clickCount = 0;
let gameRunning = true;
let speed = 5000; 
let shapes = [];

function getRandomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 100));
  const y = Math.floor(Math.random() * (window.innerHeight - 100));
  return { x, y };
}

function getRandomSize() {
  return Math.floor(Math.random() * 301) + 50; 
}

function createShape() {
  const shape = document.createElement('div');
  shape.classList.add('shape');
  const colors = ['blue', 'red', 'green', 'yellow'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  shape.classList.add('circle');
  shape.classList.add(randomColor);

  const position = getRandomPosition();
  shape.style.left = position.x + 'px';
  shape.style.top = position.y + 'px';

  const size = getRandomSize();
  shape.style.width = size + 'px';
  shape.style.height = size + 'px';

  const timeout = setTimeout(() => {
    if (gameRunning) {
      score -= 5;
      score = score < 0 ? 0 : score;
      scoreDisplay.textContent = `Score: ${score}`;
      shape.remove();
      createShape();
    }
  }, speed);

  shape.addEventListener('click', () => {
    if (gameRunning) {
      clearTimeout(timeout);
      score += 10; 
      scoreDisplay.textContent = `Score: ${score}`;
      shape.remove();
      speed *= 0.9;
      createShape();
      clickCount++;
      clickCountDisplay.textContent = `Accurate clicks: ${clickCount}`;
    }
  });

  document.body.appendChild(shape);
  shapes.push(shape);
}

createShape();

setInterval(() => {
  if (score <= 0) {
    gameRunning = false;
    showModal();
  }
}, 1000);

function showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.innerHTML = `<div style="background-color: #fff; padding: 20px; border-radius: 10px; text-align: center;">
                          <h2>Game OVER</h2>
                          <p>Accurate clicks: ${clickCount}</p>
                          <button onclick="window.location.reload()">Play again</button>
                       </div>`;
    document.body.appendChild(modal);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  modal.remove();
}
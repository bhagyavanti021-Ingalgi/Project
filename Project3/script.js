const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 0;

function formatTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);

  const pad = (num, size = 2) => String(num).padStart(size, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function updateDisplay() {
  const currentTime = elapsedTime + (timerInterval ? Date.now() - startTime : 0);
  display.textContent = formatTime(currentTime);
}

function start() {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
  resetBtn.disabled = false;
}

function pause() {
  elapsedTime += Date.now() - startTime;
  clearInterval(timerInterval);
  timerInterval = null;

  startBtn.disabled = false;
  startBtn.textContent = 'Resume';
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  lapCount = 0;
  display.textContent = '00:00:00.00';
  lapList.innerHTML = '';

  startBtn.disabled = false;
  startBtn.textContent = 'Start';
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function addLap() {
  lapCount++;
  const currentTime = elapsedTime + (timerInterval ? Date.now() - startTime : 0);
  const li = document.createElement('li');
  li.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(currentTime)}</span>`;
  lapList.prepend(li);
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

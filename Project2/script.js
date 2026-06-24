const passwordOutput = document.getElementById('passwordOutput');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

lengthSlider.addEventListener('input', () => {
  lengthValue.textContent = lengthSlider.value;
});

function getActiveCharset() {
  let charset = '';
  if (uppercase.checked) charset += CHARSETS.uppercase;
  if (lowercase.checked) charset += CHARSETS.lowercase;
  if (numbers.checked) charset += CHARSETS.numbers;
  if (symbols.checked) charset += CHARSETS.symbols;
  return charset;
}

function generatePassword() {
  const length = parseInt(lengthSlider.value, 10);
  const charset = getActiveCharset();

  if (!charset) {
    alert('Please select at least one character type.');
    return;
  }

  let password = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  passwordOutput.value = password;
  copyMsg.textContent = '';
  updateStrength(password);
}

function updateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const percent = (score / 5) * 100;
  strengthFill.style.width = percent + '%';

  let label = 'Weak';
  let color = '#e74c3c';
  if (score >= 4) {
    label = 'Strong';
    color = '#27ae60';
  } else if (score >= 2) {
    label = 'Medium';
    color = '#f39c12';
  }

  strengthFill.style.background = color;
  strengthText.textContent = `Strength: ${label}`;
}

copyBtn.addEventListener('click', async () => {
  if (!passwordOutput.value) return;
  try {
    await navigator.clipboard.writeText(passwordOutput.value);
    copyMsg.textContent = 'Copied to clipboard!';
  } catch (err) {
    copyMsg.textContent = 'Failed to copy.';
  }
  setTimeout(() => (copyMsg.textContent = ''), 2000);
});

generateBtn.addEventListener('click', generatePassword);

// Generate one on load
generatePassword();

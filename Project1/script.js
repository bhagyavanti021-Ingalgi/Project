const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = '';

function updateDisplay() {
  display.value = expression || '0';
}

function isOperator(char) {
  return ['+', '-', '*', '/', '%'].includes(char);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === 'clear') {
      expression = '';
    } else if (action === 'delete') {
      expression = expression.slice(0, -1);
    } else if (action === 'equals') {
      calculate();
      return;
    } else if (value !== undefined) {
      // Prevent two operators in a row
      const lastChar = expression.slice(-1);
      if (isOperator(value) && isOperator(lastChar)) {
        expression = expression.slice(0, -1) + value;
      } else {
        expression += value;
      }
    }
    updateDisplay();
  });
});

function calculate() {
  try {
    if (!expression) return;
    // Avoid eval misuse: only allow digits, operators, and decimal points
    if (!/^[0-9+\-*/.%\s]+$/.test(expression)) {
      throw new Error('Invalid expression');
    }
    const result = Function(`"use strict"; return (${expression})`)();
    expression = String(Number.isFinite(result) ? roundResult(result) : 'Error');
  } catch (e) {
    expression = 'Error';
  }
  updateDisplay();
}

function roundResult(num) {
  return Math.round(num * 1e8) / 1e8;
}

document.addEventListener('keydown', (e) => {
  if (/[0-9.+\-*/%]/.test(e.key)) {
    expression += e.key;
    updateDisplay();
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (e.key === 'Escape') {
    expression = '';
    updateDisplay();
  }
});

updateDisplay();

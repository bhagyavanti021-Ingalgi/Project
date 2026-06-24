const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const kelvin = document.getElementById('kelvin');
const clearBtn = document.getElementById('clearBtn');

function round(num) {
  return Math.round(num * 100) / 100;
}

function fromCelsius(c) {
  fahrenheit.value = round(c * 9 / 5 + 32);
  kelvin.value = round(c + 273.15);
}

function fromFahrenheit(f) {
  celsius.value = round((f - 32) * 5 / 9);
  kelvin.value = round((f - 32) * 5 / 9 + 273.15);
}

function fromKelvin(k) {
  celsius.value = round(k - 273.15);
  fahrenheit.value = round((k - 273.15) * 9 / 5 + 32);
}

celsius.addEventListener('input', () => {
  if (celsius.value === '') {
    fahrenheit.value = '';
    kelvin.value = '';
    return;
  }
  fromCelsius(parseFloat(celsius.value));
});

fahrenheit.addEventListener('input', () => {
  if (fahrenheit.value === '') {
    celsius.value = '';
    kelvin.value = '';
    return;
  }
  fromFahrenheit(parseFloat(fahrenheit.value));
});

kelvin.addEventListener('input', () => {
  if (kelvin.value === '') {
    celsius.value = '';
    fahrenheit.value = '';
    return;
  }
  fromKelvin(parseFloat(kelvin.value));
});

clearBtn.addEventListener('click', () => {
  celsius.value = '';
  fahrenheit.value = '';
  kelvin.value = '';
});

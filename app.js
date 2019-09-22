//Input Elements
let tempInputField = document.getElementById("tempInputField");
let convertScale = document.getElementById("convertScale");
let autoConvert = document.getElementById("autoConvert");

//Buttons
let convertButton = document.getElementById("convert");
let resetButton = document.getElementById("reset");

//Result Display
const celDisplay = document.getElementById("celsius");
const fahDisplay = document.getElementById("fahrenheit");
const kelDisplay = document.getElementById("kelvin");

//Defaults the scale to the celsius on load. let because value will change
let currentScale = convertScale.value;

//Handles the calculation logic
const handleCalculation = (value, scale) => {

  //a. The calculations
  const celToFah = value * (9 / 5) + 32;
  const celToKel = value + 273.15;
  const fahToCel = (value - 32) / (9 / 5);
  const fahToKel = ((value - 32) * 5) / 9 + 273.15;
  const kelToCel = value - 273.15;
  const KelToFah = ((value - 273.15) * 9) / 5 + 32;

  // Rounding down
  const rounded = (calculation) => Math.round(calculation * 100) / 100;

  switch (scale) {
    case 'celsius':
      celDisplay.innerHTML = value;
      fahDisplay.innerHTML = rounded(celToFah);
      kelDisplay.innerHTML = rounded(celToKel);
      break;
    case 'fahrenheit':
      celDisplay.innerHTML = rounded(fahToCel);
      fahDisplay.innerHTML = value;
      kelDisplay.innerHTML = rounded(fahToKel);
      break;
    case 'kelvin':
      celDisplay.innerHTML = rounded(kelToCel);
      fahDisplay.innerHTML = rounded(KelToFah);
      kelDisplay.innerHTML = value;
  }
}

//EVENT LISTENERS
//a. Sets the scale to the select one
convertScale.addEventListener("change", () => {
  currentScale = convertScale.value;
});

/*
1. When checked, it adds an event listener to the input field, running convert() for every change or keyup
  a. The 'change' event for when the numeric sliders are used
  b. keyup for when the keyboard is used
2. When unchecked, it removes the input ELs or else the automatic conversion will keep happening
3.  
*/
autoConvert.addEventListener('change', () => {
  if (autoConvert.checked) {
    tempInputField.addEventListener("keyup", convert);
    tempInputField.addEventListener("change", convert);
  } else {
    tempInputField.removeEventListener("keyup", convert);
    tempInputField.removeEventListener("change", convert);
  }
});

//Validates if the field is not empty
const convert = () => {
  const valid = tempInputField.checkValidity();
  if (valid) {
    handleCalculation(+tempInputField.value, currentScale);
  } else {
    reset();
    return;
  }
}

const reset = () => {
  tempInputField.value = null;
  celDisplay.innerHTML = '--';
  fahDisplay.innerHTML = '--';
  kelDisplay.innerHTML = '--';
}

// Runs the convert function when button clicked 
convertButton.addEventListener("click", (e) => {
  e.preventDefault();
  convert();
});

//Resets the app values to their defaults
resetButton.addEventListener("click", reset);
const buttons = document.querySelectorAll("button");
const displayMain = document.querySelector("#display > #displayMain");
const displayAlt = document.querySelector("#display > #displayAlt");
let regex = new RegExp(/\+|-|\*|\//);
let firstValue;
let secondValue;
let operator;
let lastInput;
let currentInput;

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  let result;
  switch(operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      if (b === "0") {
        return "ERROR";
      } else {
        result = divide(a, b);
      }      
      break;
  }
  return (Math.round(result * 100) / 100);
}

function resetCalc() {
  firstValue = "";
  secondValue = "";
  operator = "";
  displayMain.textContent = "";
  displayAlt.textContent = "";
}

function displayResult() {
  secondValue = displayMain.textContent;
  displayAlt.textContent += ` ${secondValue} =`;
  displayMain.textContent = operate(firstValue, secondValue, operator);
  operator = "";
}

function handleEvent(e) {
  if (displayMain.textContent === "ERROR") {
    resetCalc();
  }
  
  lastInput = currentInput;
  currentInput = e;
  
  switch(currentInput) {
    case "C":
    case "Escape":
      resetCalc();
      break;
    case "←":
    case "Backspace":
      displayMain.textContent = displayMain.textContent.slice(0, -1);
      break;
    case "+/-":
      if (displayMain.textContent != "") {
        displayMain.textContent *= -1;
      }
      break;
    case ".":
      if (!displayMain.textContent.includes(".")) {
        if (displayMain.textContent === "") {
          displayMain.textContent = 0 + currentInput;
        } else {
          displayMain.textContent += currentInput;
        }
      }
      break;
    case "=":
    case "Enter":
      if (operator && displayMain.textContent != "") {
        displayResult();
      }
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      if (regex.test(lastInput) && regex.test(currentInput)) {
        break;
      } else if (operator) {
        displayResult();
      }
      if (displayMain.textContent === "ERROR") {
        break;
      } else {
        operator = currentInput;
        firstValue = displayMain.textContent;
        displayAlt.textContent += ` ${firstValue} ${operator}`;
        displayMain.textContent = "";
        break;
      }
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      displayMain.textContent += currentInput;
  }
}

buttons.forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    handleEvent(e.target.value);
    e.preventDefault();
  });
});

window.addEventListener("keydown", (e) => {
  handleEvent(e.key);
  e.preventDefault();
});
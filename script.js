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
    case "×":
      result = multiply(a, b);
      break;
    case "÷":
      result = divide(a, b);
      break;
  }
  return Math.round(result * 100) / 100;
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
  displayAlt.textContent += ` ${secondValue} =`
  displayMain.textContent = operate(firstValue, secondValue, operator);
  operator = "";
}

const buttons = document.querySelectorAll("button");
const displayMain = document.querySelector("#display > #displayMain");
const displayAlt = document.querySelector("#display > #displayAlt");
let regex = new RegExp(/\+|-|×|÷/);
let firstValue;
let secondValue;
let operator;
let lastInput;
let currentInput;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    lastInput = currentInput;
    currentInput = e.target.value;

    switch(e.target.value) {
      case "C":
        resetCalc();
        break;
      case "←":
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        break;
      case "+/-":
        if (displayMain.textContent != "") {
          displayMain.textContent *= -1;
        }
        break;
      case ".":
        if (!displayMain.textContent.includes(".")) {
          displayMain.textContent += e.target.value;
        }
        break;
      case "=":
        if (operator && displayMain.textContent != "") {
          displayResult();
        }
        break;
        case "+":
        case "-":
        case "×":
        case "÷":
          if (regex.test(lastInput) && regex.test(currentInput)) {
            break;
          } else if (operator) {
            displayResult();
          }
          operator = e.target.value;
          firstValue = displayMain.textContent;
          displayAlt.textContent += ` ${firstValue} ${operator}`
          displayMain.textContent = "";
          break;
        default:
          displayMain.textContent += e.target.value;
      }
    });
  });
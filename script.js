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
  switch(operator) {
    case "+":
      return add(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "×":
      return multiply(a, b);
      break;
    case "÷":
      return divide(a, b);
      break;
  }
}

const buttons = document.querySelectorAll("button");
const displayMain = document.querySelector("#display > #displayMain");
const displayAlt = document.querySelector("#display > #displayAlt");
let firstValue;
let secondValue;
let operator;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switch(e.target.value) {
      case "C":
        firstValue = "";
        secondValue = "";
        operator = "";
        displayMain.textContent = "";
        displayAlt.textContent = "";
        break;
      case "←":
        displayMain.textContent = displayMain.textContent.slice(0, -1);
        break;
      case "+/-":
        displayMain.textContent *= -1;
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        if (operator) {
          secondValue = displayMain.textContent;
          displayMain.textContent = operate(firstValue, secondValue, operator);
          displayAlt.textContent += `${secondValue} = `
        }
        firstValue = displayMain.textContent;
        operator = e.target.value;
        displayAlt.textContent += `${firstValue} ${operator} `
        displayMain.textContent = "";
        break;
      case "=":
        secondValue = displayMain.textContent;
        displayAlt.textContent += `${secondValue} = `
        displayMain.textContent = operate(firstValue, secondValue, operator);
        break;
      default:
        displayMain.textContent += e.target.value;
    }
  });
});
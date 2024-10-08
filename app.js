let mainDisplayValue = "0";
let secondaryDisplayValue = "";
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

const maxDisplayLength = 14;
const buttons = document.querySelectorAll(".btn");

updateScreen();
clickButton();
clickKey();

function updateScreen() {
  updateMainDisplay();
  updateSecondaryDisplay();
}

function updateMainDisplay() {
  const mainDisplay = document.querySelector(".main-display");
  mainDisplay.textContent = mainDisplayValue;
  if (mainDisplayValue.length > maxDisplayLength) {
    mainDisplay.textContent = mainDisplayValue.substring(0, maxDisplayLength);
  }
}

function updateSecondaryDisplay() {
  const secondaryDisplay = document.querySelector(".secondary-display");
  secondaryDisplay.textContent = secondaryDisplayValue;
}

function clickButton() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("operand-btn")) {
        inputOperand(button.value);
      } else if (button.classList.contains("operator-btn")) {
        inputOperator(button.value);
      } else if (button.id === "decimal") {
        inputDecimal(button.value);
      } else if (button.id === "equals") {
        inputEquals();
      } else if (button.id === "clear") {
        clearScreen();
      } else if (button.id === "delete") {
        deleteCharacter();
      } else if (button.id === "sign") {
        inputSign();
      }
      updateScreen();
    });
  });
}

function clickKey() {
  window.addEventListener("keydown", (e) => {
    const key = e.key;
    const operands = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operators = ["+", "-", "*", "/"];

    if (operands.includes(key)) {
      inputOperand(key);
    } else if (operators.includes(key)) {
      inputOperator(key);
    } else if (key === ".") {
      inputDecimal(key);
    } else if (key === "Enter") {
      inputEquals();
    } else if (key === "c" || key === "C" || key === "Escape") {
      clearScreen();
    } else if (key === "Backspace" || key === "Delete") {
      deleteCharacter();
    } else if (key === "Control") {
      inputSign();
    }
    updateScreen();
  });
}

function inputOperand(operand) {
  if (firstOperator === null) {
    if (mainDisplayValue === "0" || mainDisplayValue === 0) {
      //1st click - handles first operand input
      mainDisplayValue = operand;
    } else if (mainDisplayValue === firstOperand) {
      //starts new operation after inputEquals()
      mainDisplayValue = operand;
    } else {
      mainDisplayValue += operand;
    }
  } else {
    //3rd/5th click - inputs to secondOperand
    if (mainDisplayValue === firstOperand) {
      mainDisplayValue = operand;
    } else {
      mainDisplayValue += operand;
    }
  }
}

function inputOperator(operator) {
  if (firstOperator != null && secondOperator === null) {
    //4th click - handles input of second operator
    secondOperator = operator;
    secondOperand = mainDisplayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      firstOperator
    );
    mainDisplayValue = result.toString();
    secondaryDisplayValue = `${result} ${secondOperator}`;
    firstOperand = mainDisplayValue;
    result = null;
  } else if (firstOperator != null && secondOperator != null) {
    //6th click - new secondOperator
    secondOperand = mainDisplayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      secondOperator
    );
    secondOperator = operator;
    mainDisplayValue = result.toString();
    secondaryDisplayValue = `${result} ${secondOperator}`;
    firstOperand = mainDisplayValue;
    result = null;
  } else {
    //2nd click - handles first operator input
    firstOperator = operator;
    firstOperand = mainDisplayValue;
    secondaryDisplayValue = `${firstOperand} ${firstOperator}`;
  }
}

function inputDecimal(decimal) {
  if (mainDisplayValue === firstOperand || mainDisplayValue === secondOperand) {
    mainDisplayValue = "0";
    mainDisplayValue += decimal;
  } else if (!mainDisplayValue.includes(decimal)) {
    mainDisplayValue += decimal;
  }
}

function inputEquals() {
  //hitting equals doesn't display undefined before operate()
  if (firstOperator === null) {
    mainDisplayValue = mainDisplayValue;
  } else if (secondOperator != null) {
    //handles final result
    secondOperand = mainDisplayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      secondOperator
    );
    secondaryDisplayValue += ` ${secondOperand}`;
    if (result === "lmao") {
      mainDisplayValue = "lmao";
    } else {
      mainDisplayValue = result.toString();
      firstOperand = mainDisplayValue;
      secondOperand = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  } else {
    //handles first operation
    secondOperand = mainDisplayValue;
    result = operate(
      Number(firstOperand),
      Number(secondOperand),
      firstOperator
    );
    secondaryDisplayValue += ` ${secondOperand}`;
    if (result === "lmao") {
      mainDisplayValue = "lmao";
    } else {
      mainDisplayValue = result.toString();
      firstOperand = mainDisplayValue;
      secondOperand = null;
      firstOperator = null;
      secondOperator = null;
      result = null;
    }
  }
}

function clearScreen() {
  mainDisplayValue = "0";
  secondaryDisplayValue = "";
  firstOperand = null;
  secondOperand = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}

function deleteCharacter() {
  mainDisplayValue =
    mainDisplayValue.length > 1
      ? mainDisplayValue.substring(0, mainDisplayValue.length - 1)
      : "0";
}

function inputSign() {
  mainDisplayValue *= -1;
}

function operate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return subtract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
    default:
      console.log("Error: Invalid operator.");
      break;
  }
}

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
  return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
  return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
  if (secondOperand === 0) {
    return "lmao";
  }
  return firstOperand / secondOperand;
}

"use strict";

const buttons = document.querySelectorAll(".btn");
const input = document.querySelector("#calc-input");

let firstNumber = 0; // объявил переменную для того, чтобы запомнить первое число при любой операции
let operation = "=";
input.value = 0;
let arrayMode = false;
let STMode = false;
let STArray = new Array();
function averageArray(array) {
  let sum = 0;
  for (let x of array) {
    sum += x;
  }
  return sum / array.length;
}
function numberOperation(operation, num1, num2) {
  switch (operation) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) {
        input.value = "0";
        firstNumber = 0;
        alert("Ошибка! На ноль делить нельзя");
      } else {
        return num1 / num2;
      }
      break;
    case "=":
      return num2;
  }
}

function doArrayToString(arr) {
  if (arr === "0") {
    return "0";
  }
  return "[" + String(arr) + "]";
}

function arrayOperation(operation, arr1, arr2) {
  if (operation !== "=" && arr1.length !== arr2.length) {
    alert("Введите массивы одинаковой длины");
    input.value = "0";
    firstNumber = 0;
    arrayMode = false;
    return "0";
  }
  if (arr1.length < 2 || arr1.length > 6) {
    alert("Введите массивы правильной длины");
    input.value = "0";
    firstNumber = 0;
    arrayMode = false;
    return "0";
  }

  let answerArr = new Array();
  switch (operation) {
    case "=":
      answerArr = arr2;
      break;
    case "+":
      for (let i = 0; i < arr1.length; i++) {
        answerArr[i] = arr1[i] + arr2[i];
      }
      break;
    case "-":
      for (let i = 0; i < arr1.length; i++) {
        answerArr[i] = arr1[i] - arr2[i];
      }
      break;
    case "*":
      for (let i = 0; i < arr1.length; i++) {
        answerArr[i] = arr1[i] * arr2[i];
      }
      break;
    case "/":
      for (let i = 0; i < arr1.length; i++) {
        if (arr2[i] !== 0) {
          answerArr[i] = arr1[i] / arr2[i];
        } else {
          alert("Ошибка! На ноль делить нельзя" + " позиция " + String(i + 1));
          input.value = "0";
          firstNumber = 0;
          return "0";
        }
      }
      break;
  }
  return answerArr;
}

function addNumber(number) {
  if (input.value === "0") {
    input.value = number;
  } else {
    if (arrayMode) {
      if (input.value === "[0]") {
        input.value = "[" + number + "]";
      } else {
        if (
          input.value.length > 3 &&
          input.value[input.value.length - 3] +
            input.value[input.value.length - 2] ===
            ",0"
        ) {
          input.value =
            input.value.slice(0, input.value.length - 2) +
            number +
            input.value[input.value.length - 1];
        } else {
          input.value =
            input.value.slice(0, input.value.length - 1) + number + "]";
        }
      }
    } else {
      if (STMode && ~input.value.indexOf("ST:0")) {
        input.value = "ST:" + number;
      } else {
        input.value += number;
      }
    }
  }
}

function eventCallBack(event) {
  let dataAttributes = event.target.dataset;
  if (dataAttributes.num === "0") {
    addNumber("0");
  }
  if (dataAttributes.num === "1") {
    addNumber("1");
  }
  if (dataAttributes.num === "2") {
    addNumber("2");
  }
  if (dataAttributes.num === "3") {
    addNumber("3");
  }
  if (dataAttributes.num === "4") {
    addNumber("4");
  }
  if (dataAttributes.num === "5") {
    addNumber("5");
  }
  if (dataAttributes.num === "6") {
    addNumber("6");
  }
  if (dataAttributes.num === "7") {
    addNumber("7");
  }
  if (dataAttributes.num === "8") {
    addNumber("8");
  }
  if (dataAttributes.num === "9") {
    addNumber("9");
  }
  if (!!dataAttributes.clear) {
    input.value = "0";
    firstNumber = 0;
    arrayMode = false;
    STMode = false;
    STArray = new Array();
  }
  if (dataAttributes.sign === "*") {
    if (!STMode) {
      multiplication();
    }
  }
  if (dataAttributes.sign === "+") {
    if (!STMode) {
      sum();
    } else {
      STsum();
    }
  }
  if (dataAttributes.sign === "-") {
    if (!STMode) {
      subtraction();
    }
  }
  if (dataAttributes.sign === "/") {
    if (!STMode) {
      division();
    }
  }
  if (dataAttributes.sign === "+/-") {
    if (!STMode && !arrayMode) {
      input.value = -input.value;
    }
  }
  if (dataAttributes.sign === "[]") {
    input.value = "[]";
    arrayMode = true;
    operation = "=";
  }
  if (dataAttributes.sign === ",") {
    if (arrayMode && input.value[input.value.length - 2] !== ",") {
      input.value = input.value.slice(0, input.value.length - 1) + ",]";
    } else {
      if (input.value[input.value.length - 2] === ",") {
        alert("Разрешено ставить только 1 запятую");
      }
    }
  }
  if (!!dataAttributes.equals) {
    if (STMode) {
      STEqually();
    } else {
      equally();
    }
  }
  if (dataAttributes.sign === "ST") {
    STMode = true;
    input.value = "ST:";
  }
}

function updateFirstNumber(operation) {
  if (arrayMode) {
    firstNumber = arrayOperation(
      operation,
      firstNumber,
      JSON.parse(input.value)
    );
  } else {
    firstNumber = numberOperation(operation, firstNumber, +input.value);
  }
}

function sum() {
  updateFirstNumber(operation);
  if (arrayMode) {
    input.value = "[]";
  } else {
    input.value = "";
  }
  operation = "+";
}
function STsum() {
  STArray.push(+input.value.slice(3));
  input.value = "ST:";

}
function STEqually() {
  STArray.push(+input.value.slice(3));
  input.value = "ST:" + String(averageArray(STArray));
  STArray = new Array();
  operation = "=";
}

function subtraction() {
  updateFirstNumber(operation);
  if (arrayMode) {
    input.value = "[]";
  } else {
    input.value = "";
  }
  operation = "-";
}

function multiplication() {
  updateFirstNumber(operation);
  if (arrayMode) {
    input.value = "[]";
  } else {
    input.value = "";
  }
  operation = "*";
}

function division() {
  updateFirstNumber(operation);
  if (arrayMode) {
    input.value = "[]";
  } else {
    input.value = "";
  }
  operation = "/";
}

function equally() {
  if (arrayMode) {
    input.value = doArrayToString(
      arrayOperation(operation, firstNumber, JSON.parse(input.value))
    );
  } else {
    input.value = String(numberOperation(operation, firstNumber, +input.value));
  }
  operation = "=";
}
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    eventCallBack(event);
  });
}

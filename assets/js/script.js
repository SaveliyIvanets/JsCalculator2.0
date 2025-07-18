"use strict";

const buttons = document.querySelectorAll(".btn");
const input = document.querySelector("#calc-input");
const historyElement = document.querySelector("#history-list");
let firstNumber = 0; // объявил переменную для того, чтобы запомнить первое число при любой операции
let operation = "=";
input.value = 0;
let arrayMode = false;
let STMode = false;
let STArray = new Array();
let historyExpression;
let STNumberCount = 0;

function outputSTArray(arr) {
  let ans = "";
  for (let elem of arr) {
    ans += String(elem) + "+";
  }
  return ans.slice(0, ans.length - 1);
}

function formatCurrentDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}
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
    return "0";
  }
  if (arr1.length < 2 || arr1.length > 6) {
    alert("Введите массивы правильной длины");
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
    STMode = false;
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
    arrayMode = false;
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
  STNumberCount++;
  if (STNumberCount > 6) {
    alert("Ошибка! можно вводить от 2 до 6 чисел");
    historyExpression =
      "ST: " +
      outputSTArray(STArray) +
      " " +
      "Ошибка! можно вводить от 2 до 6 чисел";
    historyElement.insertAdjacentHTML(
      "beforebegin",
      "<li>" + formatCurrentDateTime() + " |" + historyExpression + "</li>"
    );
    STArray = new Array();
    input.value = "ST:";
    STNumberCount = 0;
  } else {
    STArray.push(+input.value.slice(3));
    input.value = "ST:";
  }
}
function STEqually() {
  STNumberCount++;
  if (STNumberCount < 2) {
    input.value = "ST:";
    alert("Ошибка! можно вводить от 2 до 6 чисел");
    historyExpression =
      "ST: " +
      outputSTArray(STArray) +
      " " +
      "Ошибка! можно вводить от 2 до 6 чисел";
    historyElement.insertAdjacentHTML(
      "beforebegin",
      "<li>" + formatCurrentDateTime() + " |" + historyExpression + "</li>"
    );
  } else {
    STArray.push(+input.value.slice(3));
    historyExpression =
      "ST: " + outputSTArray(STArray) + " =" + String(averageArray(STArray));
    historyElement.insertAdjacentHTML(
      "beforebegin",
      "<li>" + formatCurrentDateTime() + " |" + historyExpression + "</li>"
    );
    input.value = "ST:" + String(averageArray(STArray));
  }
  STArray = new Array();
  operation = "=";
  STNumberCount = 0;
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
    let arrayResult = arrayOperation(
      operation,
      firstNumber,
      JSON.parse(input.value)
    );
    historyExpression =
      doArrayToString(firstNumber) +
      operation +
      input.value +
      " = " +
      doArrayToString(arrayResult);
    if (arrayResult === "0") {
      input.value = "0";
      arrayMode = false;
      firstNumber = 0;
    } else {
      input.value = doArrayToString(arrayResult);
    }
    if (operation !== "=" && arrayResult !== "0") {
      historyElement.insertAdjacentHTML(
        "beforebegin",
        "<li>" + formatCurrentDateTime() + " |" + historyExpression + "</li>"
      );
    } else {
      if (operation !== "=" && arrayResult == "0") {
        historyExpression =
          historyExpression.slice(0, historyExpression.length - 1) + "Ошибка";
        historyElement.insertAdjacentHTML(
          "beforebegin",
          "<li>" + formatCurrentDateTime() + " |" + historyExpression + "</li>"
        );
      }
    }
  } else {
    historyExpression =
      String(firstNumber) +
      operation +
      input.value +
      " = " +
      String(numberOperation(operation, firstNumber, +input.value));
    input.value = String(numberOperation(operation, firstNumber, +input.value));
    if (operation !== "=") {
      historyElement.insertAdjacentHTML(
        "beforebegin",
        "<li>" + formatCurrentDateTime() + " | " + historyExpression + "</li>"
      );
    }
  }
  operation = "=";
}
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    eventCallBack(event);
  });
}

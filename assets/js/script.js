"use strict";

const buttons = document.querySelectorAll(".btn");
const input = document.querySelector("#calc-input");
const historyElement = document.querySelector("#history-list");

input.value = 0;
let firstNumber = 0;
let operation = "=";
let arrayMode = false;
let STMode = false;
let STArray = [];
let STNumberCount = 0;

function addHistoryNote(historyExpression) {
  let date = new Date();
  historyElement.insertAdjacentHTML(
    "afterend",
    `<li>${date.toLocaleString("ru-Ru")} | ${historyExpression}</li>`
  );
}
function killComma(str) {
  return str[str.length - 2] === "," ? `${str.slice(0, str.length - 2)}]` : str;
}

function outputSTArray(arr) {
  let ans = "";
  for (let elem of arr) {
    ans += `${String(elem)}+`;
  }
  return ans.slice(0, ans.length - 1);
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
        return "error";
      } else {
        return num1 / num2;
      }
    case "=":
      return num2;
  }
}

function doArrayToString(arr) {
  return arr === "0" ? "0" : `[${String(arr)}]`;
}

function arrayOperation(operation, arr1, arr2) {
  if (operation !== "=" && arr1.length !== arr2.length) {
    alert("Массивы должны быть одной длины");
    return "0";
  }
  if (arr1.length < 2 || arr1.length > 6) {
    alert("Массивы должны содержать не менее 2 элементов и не более 6");
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
        input.value = `[${number}]`;
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
        input.value = `ST:${number}`;
      } else {
        input.value += number;
      }
    }
  }
}

function clearInput() {
  input.value = "0";
  firstNumber = 0;
  arrayMode = false;
  STMode = false;
  STArray = new Array();
}

function eventCallBack(event) {
  if (!!event.target.dataset.num) {
    addNumber(event.target.dataset.num);
  }
  if (!!event.target.dataset.clear) {
    clearInput();
  }

  if (~["-", "+", "*", "/"].indexOf(event.target.dataset.sign)) {
    if (!STMode) {
      calculatorOperation(event.target.dataset.sign);
    } else {
      if (event.target.dataset.sign === "+") {
        STsum();
      }
    }
  }

  if (event.target.dataset.sign === "+/-") {
    if (!STMode && !arrayMode) {
      input.value = -input.value;
    } else {
      if (arrayMode) {
        let commaIndex = input.value.lastIndexOf(",");
        if (!~commaIndex && input.value !== "[]") {
          input.value[1] === "-"
            ? (input.value = `${input.value[0]}${input.value.slice(
                2,
                input.value.length
              )}`)
            : (input.value = `${input.value[0]}-${input.value.slice(
                1,
                input.value.length
              )}`);
        }
        if (
          ~commaIndex &&
          input.value !== "[,]" &&
          input.value.length !== commaIndex + 1
        ) {
          input.value[commaIndex + 1] === "-"
            ? (input.value = `${input.value.slice(
                0,
                commaIndex + 1
              )}${input.value.slice(commaIndex + 2, input.value.length)}`)
            : (input.value = `${input.value.slice(
                0,
                commaIndex + 1
              )}-${input.value.slice(commaIndex + 1, input.value.length)}`);
        }
      }
    }
  }

  if (event.target.dataset.sign === "[]") {
    input.value = "[]";
    arrayMode = true;
    operation = "=";
    STMode = false;
  }

  if (event.target.dataset.sign === ",") {
    if (arrayMode && input.value[input.value.length - 2] !== ",") {
      input.value = `${input.value.slice(0, input.value.length - 1)},]`;
    } else {
      if (input.value[input.value.length - 2] === ",") {
        alert("Разрешено ставить только 1 запятую");
      }
    }
  }

  if (!!event.target.dataset.equals) {
    STMode ? STEqually() : equally();
  }

  if (event.target.dataset.sign === "ST") {
    STMode = true;
    arrayMode = false;
    input.value = "ST:";
  }
}

function updateFirstNumber(operation) {
  arrayMode
    ? (firstNumber = arrayOperation(
        operation,
        firstNumber,
        JSON.parse(killComma(input.value))
      ))
    : (firstNumber = numberOperation(operation, firstNumber, +input.value));
}

function calculatorOperation(sign) {
  updateFirstNumber(operation);
  arrayMode ? (input.value = "[]") : (input.value = "");
  operation = sign;
}
function STsum() {
  STNumberCount++;
  if (input.value.slice(3) === "") {
    STNumberCount--;
    input.value = "ST:";
    return;
  }
  if (STNumberCount > 6) {
    alert("Ошибка! можно вводить от 2 до 6 чисел");
    STArray = new Array();
    input.value = "ST:";
    STNumberCount = 0;
  } else {
    STArray.push(+input.value.slice(3));
    input.value = "ST:";
  }
}

function STEqually() {
  if (input.value.slice(3) !== "") {
    STNumberCount++;
  }
  if (STNumberCount < 2) {
    input.value = "ST:";
    alert("Ошибка! можно вводить от 2 до 6 чисел");
  } else {
    if (input.value.slice(3) !== "") {
      STArray.push(+input.value.slice(3));
    }
    addHistoryNote(
      `ST: ${outputSTArray(STArray)} = ${String(averageArray(STArray))}`
    );
    input.value = String(averageArray(STArray));
  }
  STArray = new Array();
  operation = "=";
  STNumberCount = 0;
  if (input.value !== "ST:") {
    STMode = false;
  }
}

function equally() {
  let historyExpression;
  if (arrayMode) {
    let arrayResult = arrayOperation(
      operation,
      firstNumber,
      JSON.parse(killComma(input.value))
    );

    historyExpression = `${doArrayToString(firstNumber)}${operation}${killComma(
      input.value
    )} = ${doArrayToString(arrayResult)}`;

    if (arrayResult === "0") {
      input.value = "0";
      arrayMode = false;
      firstNumber = 0;
    } else {
      input.value = doArrayToString(arrayResult);
    }
    if (operation !== "=" && arrayResult !== "0") {
      addHistoryNote(historyExpression);
    }
  } else {
    if (input.value === "") {
      input.value = firstNumber;
    }
    let numberOperationResult = numberOperation(
      operation,
      firstNumber,
      +input.value
    );

    historyExpression = `${String(firstNumber)}${operation}${
      input.value
    } = ${+String(numberOperationResult)}`;

    if (numberOperationResult === "error" || isNaN(numberOperationResult)) {
      input.value = "0";
    } else {
      input.value = String(numberOperationResult);
    }
    if (
      operation !== "=" &&
      numberOperationResult !== "error" &&
      !isNaN(numberOperationResult)
    ) {
      addHistoryNote(historyExpression);
    }
  }
  operation = "=";
}
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    eventCallBack(event);
  });
}

"use strict";

const buttons = document.querySelectorAll(".btn");
const input = document.querySelector("#calc-input");

let firstNumber = 0; // объявил переменную для того, чтобы запомнить первое число при любой операции
let operation = "=";
input.value = 0;
let arrayMode = false;

function addNumber(number) {
  if (input.value === "0") {
    input.value = number;
  } else {
    if (arrayMode) {
      if (input.value === "[0]") {
        input.value = "[" + number + "]";
      } else {
        input.value =
          input.value.slice(0, input.value.length - 1) + number + "]";
      }
    } else {
      input.value += number;
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
  }
  if (dataAttributes.sign === "*") {
    multiplication();
  }
  if (dataAttributes.sign === "+") {
    sum();
  }
  if (dataAttributes.sign === "-") {
    subtraction();
  }
  if (dataAttributes.sign === "/") {
    division();
  }
  if (dataAttributes.sign === "+/-") {
    input.value = -input.value;
  }
  if (dataAttributes.sign === "[]") {
    input.value = "[]";
    arrayMode = true;
  }
  if (dataAttributes.sign === ",") {
    if (arrayMode && input.value[input.value.length - 2] !== ",") {
      input.value = input.value.slice(0, input.value.length - 1) + ",]";
    }else{
        if(input.value[input.value.length - 2] === ","){
            alert("Разрешено ставить только 1 запятую");
        }
    }
  }
  if (!!dataAttributes.equals) {
    equally();
  }
}

function updateFirstNumber(operation, arrayMode) {
  switch (operation) {
    case "+":
      firstNumber = +input.value + firstNumber;
      break;
    case "-":
      firstNumber = firstNumber - +input.value;
      break;
    case "*":
      firstNumber = firstNumber * +input.value;
      break;
    case "/":
      if (+input.value === 0) {
        input.value = "0";
        firstNumber = 0;
        alert("Ошибка! На ноль делить нельзя");
      } else {
        firstNumber = firstNumber / +input.value;
      }
      break;
    case "=":
      firstNumber = +input.value;
  }
}

function sum() {
  updateFirstNumber(operation);
  input.value = "";
  operation = "+";
}

function subtraction() {
  updateFirstNumber(operation);
  input.value = "";
  operation = "-";
}

function multiplication() {
  updateFirstNumber(operation);
  input.value = "";
  operation = "*";
}

function division() {
  updateFirstNumber(operation);
  input.value = "";
  operation = "/";
}

function equally() {
  switch (operation) {
    case "+":
      input.value = String(+input.value + firstNumber);
      break;
    case "-":
      input.value = String(firstNumber - +input.value);
      break;
    case "*":
      input.value = String(firstNumber * +input.value);
      break;
    case "/":
      if (+input.value === 0) {
        input.value = "0";
        firstNumber = 0;
        alert("Ошибка! На ноль делить нельзя");
      } else {
        input.value = String(firstNumber / +input.value);
      }
  }
  operation = "=";
}
for (let button of buttons) {
  button.addEventListener("click", (event) => {
    eventCallBack(event);
  });
}

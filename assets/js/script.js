'use strict';

const buttons = document.querySelectorAll('.btn');
const input = document.querySelector('#calc-input');
let firstNumber = 0; // объявил переменную для того, чтобы запомнить первое число при любой операции
let operation = "=";
input.value = 0;
let arrayMode = false;

function eventCallBack(event) {
    let dataAttributes = event.target.dataset;
    if(dataAttributes.num === "0"){
        addZero();
    }
    if(dataAttributes.num === "1"){
        input.value !== "0" ? input.value += "1" : input.value = "1";
    }
    if(dataAttributes.num === "2"){
        input.value !== "0" ? input.value += "2" : input.value = "2";
    }
    if(dataAttributes.num === "3"){
        input.value !== "0" ? input.value += "3" : input.value = "3";
    }
    if(dataAttributes.num === "4"){
        input.value !== "0" ? input.value += "4" : input.value = "4";
    }
    if(dataAttributes.num === "5"){
        input.value !== "0" ? input.value += "5" : input.value = "5";
    }
    if(dataAttributes.num === "6"){
        input.value !== "0" ? input.value += "6" : input.value = "6";
    }
    if(dataAttributes.num === "7"){
        input.value !== "0" ? input.value += "7" : input.value = "7";
    }
    if(dataAttributes.num === "8"){
        input.value !== "0" ? input.value += "8" : input.value = "8";
    }
    if(dataAttributes.num === "9"){
        input.value !== "0" ? input.value += "9" : input.value = "9";
    }
    if(!!dataAttributes.clear){
        input.value = "0";
        firstNumber = 0;
    }
    if(dataAttributes.sign === "*"){
        multiplication();
    }
    if(dataAttributes.sign === "+"){
        sum();
    }
    if(dataAttributes.sign === "-"){
        subtraction();
    }
    if(dataAttributes.sign === "/"){
        division();
    }
    if(dataAttributes.sign === "+/-"){
        input.value = - input.value;
    }
    if(dataAttributes.sign === "[]"){
        input.value = "[]";
        arrayMode = true;
    }
    if(!!dataAttributes.equals){
        equally();
    }
}
function updateFirstNumber(operation) {
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
                alert("Ошибка! На ноль делить нельзя")
            } else {
                firstNumber = firstNumber / +input.value;
            }
            break;
        case "=":
            firstNumber = +input.value;
    }
}


function addZero() {
    if (input.value !== "0") {
        input.value += '0';
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
                alert("Ошибка! На ноль делить нельзя")
            } else {
                input.value = String(firstNumber / +input.value);
            }
    }
    operation = "=";
}
for(let button of buttons){
    button.addEventListener("click", (event) => {eventCallBack(event)});
}

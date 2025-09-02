
import { add, subtract, multiply, divide, negate } from './operation.js';

let screenText = document.getElementById("screenText");
const allClearButton = document.getElementById("allClear");
const singleClearButton = document.getElementById("singleClear");

const operatorButton = document.querySelectorAll('.operator')
const operandButton = document.querySelectorAll('.operand')
screenText.textContent = 0;

// function logic --------------------------------------------
function printValue() {
    console.log(`Current value: ${screenText.textContent}`);
}

function appendScreenText(value) {
    if (screenText.textContent == 0) {
        screenText.textContent = value;
    } else {
        screenText.textContent += value;
    }
    printValue();
}

// reset value
function refresh() {
    screenText.textContent = 0;
    printValue();
}

// button events ----------------------------------------------

operandButton.forEach(button => {
    button.addEventListener('click', function() {
        const num = this.textContent.trim()
        appendScreenText(num);
    });
});

allClearButton.addEventListener('click', () => {
    refresh();
});

singleClearButton.addEventListener('click', () => {
    let num = Number(screenText.textContent);

    // remove last digit input for numbers > 10
    if (num >= 10) {
        screenText.textContent = num.toString().slice(0, -1);
    } else {
        refresh();
    }
    printValue();
});

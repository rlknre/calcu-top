
import { add, subtract, multiply, divide, negate } from './operation.js';

let screenText = document.getElementById("screenText");
const allClearButton = document.getElementById("allClear");
const singleClearButton = document.getElementById("singleClear");

const decimalButton = document.getElementById("decimal");
const negateButton = document.getElementById("negateNum");
const equalsButton = document.getElementById("equals");

const operatorButton = document.querySelectorAll('.operator')
const operandButton = document.querySelectorAll('.operand')

let activeOperator = 'none';
let prevOperand = 0;
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

// getter / setter functions
function getScreenText() { return screenText.textContent; }

function getNumber() { return Number(screenText.textContent); }

function setActiveOperator(operator) { activeOperator = operator; }

function setScreenText(value) { screenText.textContent = value; }

function setPrevOperand(value) { prevOperand = value; }

// button events ----------------------------------------------

allClearButton.addEventListener('click', () => {
    refresh();
});

// input digits to calculator
operandButton.forEach(button => {
    button.addEventListener('click', function() {
        if (activeOperator !== 'none') {

            // catch 0 division
            if (activeOperator === 'divide') {
                const num = this.textContent.trim();
                if (num == 0) {
                    console.log('ERROR: Can\'t divide by zero');
                    return;
                }
            }
            refresh();
        }
        const num = this.textContent.trim();
        appendScreenText(num);
    });
});

// set operation 
operatorButton.forEach(button => {
    button.addEventListener('click', function() {

        // catch: operator already set
        if (activeOperator !== 'none') {
            console.log('ERROR: Another operator is still active.');
        } else {
            const operator = this.textContent.trim();
            setPrevOperand(getNumber());

            if (operator === '+') setActiveOperator('add');
            else if (operator === '-') setActiveOperator('subtract');
            else if (operator === 'x') setActiveOperator('multiply');
            else if (operator === '/') setActiveOperator('divide');

            appendScreenText(` ${operator}`);
        }
    });
});

// do necessary operation
equalsButton.addEventListener('click', () => {

    // catch: expression waiting for second operand
    let expression = getScreenText();
    const hasOperator = ['+', '-', 'x', '/'].some(op => expression.includes(op));

    if (hasOperator) {
        console.log('ERROR: Waiting for second operand.');
    } else {
        // only do necessary operation if format is <operand> <operator> <operand>
        if (activeOperator !== 'none') {
            let result = 0;
            let currOperand = getNumber();
            switch(activeOperator) {
                case 'add':
                    result = add(prevOperand, currOperand)
                    break;
                case 'subtract':
                    result = subtract(prevOperand, currOperand)
                    break;
                case 'multiply':
                    result = multiply(prevOperand, currOperand)
                    break;
                case 'divide':
                    result = divide(prevOperand, currOperand)
                    break;
            }
            setScreenText(result);
            setPrevOperand(getNumber());
            setActiveOperator('none');
            printValue();
        }
    }
});

// negation operation
negateButton.addEventListener('click', () => {
    let result = negate(getNumber());
    setScreenText(result);
    printValue();
});

// adding decimals
decimalButton.addEventListener('click', () => {
    
    // catch: waiting for operand or wrong decimal format
    let expression = getScreenText();
    const hasOperator = ['+', '-', 'x', '/'].some(op => expression.includes(op));
    const hasDecimal = expression.includes('.');

    if (hasOperator) {
        console.log('ERROR: Waiting for second operand.');
        return;
    } 
    if (hasDecimal) {
        console.log('ERROR: Waiting for second operand.');
        return;
    }

    appendScreenText('.');
});

// clear recent input
singleClearButton.addEventListener('click', () => {
    let num = getNumber();

    // remove last digit input for numbers > 10
    if (num >= 10) {
        screenText.textContent = num.toString().slice(0, -1);
        printValue();
    } else {
        refresh();
    }
});

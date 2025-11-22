class Calculator {
    constructor(displayTextElement) {
        this.displayTextElement = displayTextElement;
        this.clear();
        this.memory = 0;
        this.isRadians = true; // Default to Radians
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.shouldResetScreen = false;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    appendNumber(number) {
        if (this.shouldResetScreen) {
            this.currentOperand = '';
            this.shouldResetScreen = false;
        }
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.shouldResetScreen = true;
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    computation = 'Error';
                } else {
                    computation = prev / current;
                }
                break;
            case 'xʸ':
                computation = Math.pow(prev, current);
                break;
            case 'ʸ√x':
                computation = Math.pow(prev, 1 / current);
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
        this.shouldResetScreen = true;
    }

    // Scientific Functions
    sin() {
        const val = parseFloat(this.currentOperand);
        this.currentOperand = this.isRadians ? Math.sin(val) : Math.sin(val * Math.PI / 180);
        this.shouldResetScreen = true;
    }

    cos() {
        const val = parseFloat(this.currentOperand);
        this.currentOperand = this.isRadians ? Math.cos(val) : Math.cos(val * Math.PI / 180);
        this.shouldResetScreen = true;
    }

    tan() {
        const val = parseFloat(this.currentOperand);
        this.currentOperand = this.isRadians ? Math.tan(val) : Math.tan(val * Math.PI / 180);
        this.shouldResetScreen = true;
    }

    sinh() {
        this.currentOperand = Math.sinh(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    cosh() {
        this.currentOperand = Math.cosh(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    tanh() {
        this.currentOperand = Math.tanh(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    log() {
        this.currentOperand = Math.log10(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    ln() {
        this.currentOperand = Math.log(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    sqrt() {
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    cbrt() {
        this.currentOperand = Math.cbrt(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    square() {
        this.currentOperand = Math.pow(parseFloat(this.currentOperand), 2);
        this.shouldResetScreen = true;
    }

    cube() {
        this.currentOperand = Math.pow(parseFloat(this.currentOperand), 3);
        this.shouldResetScreen = true;
    }

    inverse() {
        this.currentOperand = 1 / parseFloat(this.currentOperand);
        this.shouldResetScreen = true;
    }

    exp() {
        this.currentOperand = Math.exp(parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    tenPower() {
        this.currentOperand = Math.pow(10, parseFloat(this.currentOperand));
        this.shouldResetScreen = true;
    }

    factorial() {
        let val = parseInt(this.currentOperand);
        if (val < 0) return;
        let res = 1;
        for (let i = 2; i <= val; i++) res *= i;
        this.currentOperand = res;
        this.shouldResetScreen = true;
    }

    pi() {
        this.currentOperand = Math.PI;
        this.shouldResetScreen = true;
    }

    e() {
        this.currentOperand = Math.E;
        this.shouldResetScreen = true;
    }

    rand() {
        this.currentOperand = Math.random();
        this.shouldResetScreen = true;
    }

    toggleRad() {
        this.isRadians = !this.isRadians;
        // Could update UI to show RAD/DEG status
    }

    // Memory
    memoryClear() { this.memory = 0; }
    memoryAdd() { this.memory += parseFloat(this.currentOperand); }
    memoryMinus() { this.memory -= parseFloat(this.currentOperand); }
    memoryRecall() {
        this.currentOperand = this.memory;
        this.shouldResetScreen = true;
    }

    getDisplayNumber(number) {
        if (number === 'Error') return number;
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.displayTextElement.innerText = this.getDisplayNumber(this.currentOperand);

        // Dynamic font size
        const length = this.displayTextElement.innerText.length;
        if (length > 12) {
            this.displayTextElement.style.fontSize = '2rem';
        } else if (length > 9) {
            this.displayTextElement.style.fontSize = '2.5rem';
        } else if (length > 6) {
            this.displayTextElement.style.fontSize = '3.5rem';
        } else {
            this.displayTextElement.style.fontSize = '5rem';
        }
    }

    toggleSign() {
        if (this.currentOperand === '0') return;
        this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
    }

    percentage() {
        this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
    }
}

const displayTextElement = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-action="operator"]');
const equalsButton = document.querySelector('[data-action="calculate"]');
const clearButton = document.querySelector('[data-action="clear"]');
const signButton = document.querySelector('[data-action="sign"]');
const percentButton = document.querySelector('[data-action="percent"]');
const decimalButton = document.querySelector('[data-action="decimal"]');

// Scientific buttons
const sciButtons = document.querySelectorAll('.secondary');

const calculator = new Calculator(displayTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        updateClearButton();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.value);
        calculator.updateDisplay();
    });
});

sciButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        switch (action) {
            case 'sin': calculator.sin(); break;
            case 'cos': calculator.cos(); break;
            case 'tan': calculator.tan(); break;
            case 'sinh': calculator.sinh(); break;
            case 'cosh': calculator.cosh(); break;
            case 'tanh': calculator.tanh(); break;
            case 'log': calculator.log(); break;
            case 'ln': calculator.ln(); break;
            case 'sqrt': calculator.sqrt(); break;
            case 'cbrt': calculator.cbrt(); break;
            case 'square': calculator.square(); break;
            case 'cube': calculator.cube(); break;
            case 'inverse': calculator.inverse(); break;
            case 'exp': calculator.exp(); break;
            case 'ten-power': calculator.tenPower(); break;
            case 'factorial': calculator.factorial(); break;
            case 'pi': calculator.pi(); break;
            case 'e': calculator.e(); break;
            case 'rand': calculator.rand(); break;
            case 'rad':
                calculator.toggleRad();
                button.innerText = calculator.isRadians ? 'Rad' : 'Deg';
                break;
            case 'memory-clear': calculator.memoryClear(); break;
            case 'memory-add': calculator.memoryAdd(); break;
            case 'memory-minus': calculator.memoryMinus(); break;
            case 'memory-recall': calculator.memoryRecall(); break;
            case 'power': calculator.chooseOperation('xʸ'); break;
            case 'root': calculator.chooseOperation('ʸ√x'); break;
        }
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
    if (clearButton.innerText === 'C') {
        calculator.currentOperand = '0';
        calculator.updateDisplay();
        updateClearButton();
    } else {
        calculator.clear();
        calculator.updateDisplay();
    }
});

signButton.addEventListener('click', () => {
    calculator.toggleSign();
    calculator.updateDisplay();
});

percentButton.addEventListener('click', () => {
    calculator.percentage();
    calculator.updateDisplay();
});

decimalButton.addEventListener('click', () => {
    calculator.appendNumber('.');
    calculator.updateDisplay();
    updateClearButton();
});

function updateClearButton() {
    if (calculator.currentOperand !== '0') {
        clearButton.innerText = 'C';
    } else {
        clearButton.innerText = 'AC';
    }
}

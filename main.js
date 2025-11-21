class Calculator {
  constructor(displayTextElement) {
    this.displayTextElement = displayTextElement;
    this.clear();
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
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
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
    if (length > 9) {
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

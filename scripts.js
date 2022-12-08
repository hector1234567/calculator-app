import { Calculator } from "./calculator";

// REMEMBER THEME ON SESSION STORAGE
const themeSwitches = document.querySelectorAll('[name="theme"]');

themeSwitches.forEach(theme => theme.addEventListener('change', function(ev) {
    localStorage.setItem('theme', ev.target.id);
}));

const theme = localStorage.getItem('theme');
if(theme) {
    const themeSwitch = document.getElementById(theme);
    themeSwitch.setAttribute('checked', true);
}

// Calculator
const calculator = new Calculator(document.querySelector('.screen span'));

document.querySelector('.keyboard').addEventListener('click', function(ev) {
    const key = ev.target.closest('.keyboard__key');

    if(!key) return;
    
    const num = key.dataset.num;
    if(num === 'dot') return calculator.typeNumber('dot');
    if(num) return calculator.typeNumber(num);

    const operation = key.dataset.op;
    if(operation === 'equal') {
        return calculator.typeEqual();
    }
    if(operation === 'reset') {
        return calculator.reset();
    }
    if(operation === 'del') {
        return calculator.delete();
    }
    return calculator.typeOperation(operation);
})
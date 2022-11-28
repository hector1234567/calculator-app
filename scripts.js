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

// CALC
class Calc {
    constructor(elemScreen) {
        this.elemScreen = elemScreen;
        this.result = 0;
        this.screen = '0';
    }

    #add () {
        return +this.screen + this.result;
    }

    typeNumber(char) {
        if(this.screen === '0' && char !== '.') this.screen = '';
        if(char === '.') {
            if(this.hasDot) return;
            this.hasDot = true;
        }
        this.#addCharToScreen(char);
    }

    #addCharToScreen(char) {
        this.screen = this.screen + char;
        if(this.screen.length > 0) {
            const [left, right] = this.screen.split('.');
            const reversedLeft = this.#reverseString(left);
            const leftWithCommas = this.#reverseString(reversedLeft.match(/.{1,3}/g).join(','));
            this.elemScreen.innerHTML = right ? leftWithCommas + '.' + right : leftWithCommas;
        }
    }

    deleteCharOnScreen() {
        if(this.screen[this.screen.length - 1] === '.') this.hasDot = false;
        this.screen = this.screen.slice(0, -1);
        if(this.screen === '') this.screen = '0';
        this.#addCharToScreen('');
    }

    #reverseString(str) {
        return (str === '') ? '' : this.#reverseString(str.substr(1)) + str.charAt(0);
    }

    set operation(op) {
        this.result = this.screen;
        this.operation = op;
    }
}

const calc = new Calc(document.querySelector('.screen'));

document.querySelector('.keyboard').addEventListener('click', function(ev) {
    const key = ev.target.closest('.keyboard__key');

    if(!key) return;
    
    const num = key.dataset.num;
    if(num === 'dot') return calc.typeNumber('.');
    if(num) return calc.typeNumber(num);

    const operation = key.dataset.op;
    if(operation === 'del') {
        return calc.deleteCharOnScreen();
    }
    if(operation === 'add') {
        return calc.operation = 'add';
    }
})
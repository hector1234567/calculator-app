export class Calculator {
    #elemScreen
    #_wbuff = '';
    #dot = false;

    constructor(elemScreen) {
        this.#elemScreen = elemScreen; 
        this.x = null;
        this.y = null;
        this.op = null;
        this.result = null;
    }

    typeNumber(num) {
        if(this.result !== null) this.reset();
        if(num === 'dot') {
            if(this.#wbuff.includes('.')) return;
            this.#dot = true;
        } else if(this.#dot) {
            this.#wbuff = this.#wbuff + '.' + num.toString();
            this.#renderScreen(this.#wbuff);
            this.#dot = false;
        } else {
            this.#wbuff = this.#wbuff + num.toString();
            this.#renderScreen(this.#wbuff);
        }
    }

    typeOperation(op) {
        this.op = op;
        if(this.#wbuff === '') return;
        if(this.x === null) {
            this.x = +this.#wbuff;
        } else if(this.result === null) {
            this.y = +this.#wbuff;
            this.x = this.#operate();
            this.#renderScreen(this.x.toString());
            this.result = null;
            this.y = null;
        } else {
            this.result = null;
            this.y = null;
        }
        this.#wbuff = '';
    }

    typeEqual() {
        if(this.x === null) return;
        if(this.y === null) this.y = +this.#wbuff;
        this.result = this.#operate();
        this.x = this.result;
        this.#renderScreen(this.result.toString());
    }

    reset() {
        this.x = null;
        this.y = null;
        this.op = null;
        this.result = null;
        this.#elemScreen.innerHTML = '0';
        this.#wbuff = '';
        this.#dot = false;
    }

    delete() {
        this.#wbuff = this.#wbuff.substring(0, this.#wbuff.length - 1);
        this.#renderScreen(this.#wbuff);
        this.#dot = false;
    }

    #renderScreen(val) {
        if(val === '') {
            this.#elemScreen.innerHTML = '0';
        } else if(val[0] === '.') {
            this.#elemScreen.innerHTML = '0' + val;
        } else {
            console.log(val, typeof(val))
            const [left, right] = val.split('.');
            const reversedLeft = this.#reverseString(left);
            const leftWithCommas = this.#reverseString(reversedLeft.match(/.{1,3}/g).join(','));
            this.#elemScreen.innerHTML = right ? leftWithCommas + '.' + right : leftWithCommas;
        }
    }

    #reverseString(str) {
        return (str === '') ? '' : this.#reverseString(str.substr(1)) + str.charAt(0);
    }

    #operate() {
        if(this.op === 'add') {
            return this.x + this.y;
        }
        if(this.op === 'sub') {
            return this.x - this.y;
        }
        if(this.op === 'mul') {
            return this.x * this.y;
        }
        if(this.op === 'div') {
            return this.x / this.y;
        }
    }

    set #wbuff(val) {
        if(val === '0') return;
        this.#_wbuff = val;
    }

    get #wbuff() {
        return this.#_wbuff;
    }
}
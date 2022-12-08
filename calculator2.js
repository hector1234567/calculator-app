export class Calculator {
    #elemScreen
    #_wbuff = '';
    #dot = false;

    constructor(elemScreen) {
        this.#elemScreen = elemScreen; 
        this.x = null;
        this.y = null;
        this.op = null;
        this.result = 0;
    }

    typeNumber(num) {
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
        console.dir(this)
    }

    typeOperation(op) {
        this.op = op;
        if(this.#wbuff === '') return;
        if(this.x === null) {
            this.x = +this.#wbuff;
        } else {
            this.y = +this.#wbuff;
            this.result = this.#operate();
            this.#renderScreen(this.result);
            this.x = this.result;
            this.y = null;
        }
        this.#wbuff = '';
        console.dir(this)
    }

    typeEqual() {
    }

    reset() {
        this.x = null;
        this.y = null;
        this.op = null;
        this.result = 0;
        this.#elemScreen.innerHTML = '0';
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
            this.#elemScreen.innerHTML = val;
        }
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
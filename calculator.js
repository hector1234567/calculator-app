export class Calculator {
    #elemScreen

    constructor(elemScreen) {
        this.#elemScreen = elemScreen; 
        this.x = null;
        this.y = null;
        this.op = null;
        this.result = 0;
    }

    typeNumber(num) {
        if(this.op === null) {
            let xStr = '';
    
            if(this.x !== null) xStr = xStr + this.x.toString();
    
            xStr = xStr + num.toString();
            this.#renderScreen(xStr);
            this.x = +xStr;
        } else {
            let yStr = '';
    
            if(this.y !== null) yStr = yStr + this.y.toString();
    
            yStr = yStr + num.toString();
            this.#renderScreen(yStr);
            this.y = +yStr;
        }
    }

    typeOperation(op) {
        if(this.op === null) {
            this.op = op;
        } else if(this.x === this.result) {
            this.y = null;
            this.op = op;
        }else {
            this.result = this.#operate();
            this.x = this.result;
            this.y = null;
            this.#renderScreen(this.result);
            this.op = op;
        }
    }

    typeEqual() {
        this.result = this.#operate();
        this.x = this.result;
        this.#renderScreen(this.result);
    }

    reset() {
        this.x = null;
        this.y = null;
        this.op = null;
        this.result = 0;
        this.#elemScreen.innerHTML = '0';
    }

    delete() {
        if(this.op === null) {
            let xStr = this.x.toString();
            xStr = xStr.substr(0, xStr.length - 1);
            if(xStr === '') xStr = '0';
            this.#renderScreen(xStr);
            this.x = +xStr;
        } else {
            let yStr = this.y.toString();
            yStr = yStr.substr(0, yStr.length - 1);
            if(yStr === '') yStr = '0';
            this.#renderScreen(yStr);
            this.y = +yStr;
        }
    }

    #renderScreen(val) {
        this.#elemScreen.innerHTML = val;
    }

    #operate() {
        if(this.op === 'add') {
            return this.x + this.y;
        }
        if(this.op === 'sub') {
            return this.x - this.y;
        }
        if(this.op === 'mul') {
            console.log(this.x, this.y, this.x * this.y)
            return this.x * this.y;
        }
        if(this.op === 'div') {
            return this.x / this.y;
        }
    }
}
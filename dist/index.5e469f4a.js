// REMEMBER THEME ON SESSION STORAGE
const themeSwitches = document.querySelectorAll('[name="theme"]');
themeSwitches.forEach((theme)=>theme.addEventListener("change", function(ev) {
        localStorage.setItem("theme", ev.target.id);
    }));
const theme = localStorage.getItem("theme");
if (theme) {
    const themeSwitch = document.getElementById(theme);
    themeSwitch.setAttribute("checked", true);
}
// CALC
class Calc {
    constructor(elemScreen){
        this.elemScreen = elemScreen;
        this.result = 0;
        this.op1 = 0;
        this.op2 = 0;
        this.screen = "0";
        this.operation = null;
    }
    typeNumber(char) {
        if (this.screen === "0" && char !== ".") this.screen = "";
        if (char === ".") {
            if (this.hasDot) return;
            this.hasDot = true;
        }
        this.#addCharToScreen(char);
    }
    #addCharToScreen(char) {
        this.screen = this.screen + char;
        this.render();
    }
    render() {
        if (this.screen.length === 0) return;
        const [left, right] = this.screen.split(".");
        const reversedLeft = this.#reverseString(left);
        const leftWithCommas = this.#reverseString(reversedLeft.match(/.{1,3}/g).join(","));
        this.elemScreen.innerHTML = right ? leftWithCommas + "." + right : leftWithCommas;
    }
    deleteCharOnScreen() {
        if (this.screen[this.screen.length - 1] === ".") this.hasDot = false;
        this.screen = this.screen.slice(0, -1);
        if (this.screen === "") this.screen = "0";
        this.render();
    }
    reset() {
        this.result = 0;
        this.screen = "0";
        this.hasDot = false;
        this.render();
    }
    #reverseString(str) {
        return str === "" ? "" : this.#reverseString(str.substr(1)) + str.charAt(0);
    }
    // set operation(op) {
    //     this.result = this.#operate(+this.screen.split(',').join(''));
    //     this.screen = '0';
    //     this.render();
    //     this._operation = op;
    //     console.log(this.result)
    // }
    #operate() {
        if (this._operation === "add") return this.op1 + this.op2;
        if (this._operation === "sub") return this.op1 - this.op2;
        if (this._operation === "mul") return this.op1 * this.op2;
        if (this._operation === "div") return this.op1 / this.op2;
        return num;
    }
    showResult() {
        this.op2 = +this.screen.split(",").join("");
        this.result = this.#operate();
        this.screen = "" + this.result;
        this.render();
        this.screen = "0";
        this.op1 = this.result;
    }
}
const calc = new Calc(document.querySelector(".screen"));
document.querySelector(".keyboard").addEventListener("click", function(ev) {
    const key = ev.target.closest(".keyboard__key");
    if (!key) return;
    const num1 = key.dataset.num;
    if (num1 === "dot") return calc.typeNumber(".");
    if (num1) return calc.typeNumber(num1);
    const operation = key.dataset.op;
    if (operation === "del") return calc.deleteCharOnScreen();
    if (operation === "reset") return calc.reset();
    if (operation === "equal") return calc.showResult();
    return calc.operation = operation;
});

//# sourceMappingURL=index.5e469f4a.js.map

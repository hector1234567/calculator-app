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
        this.screen = "0";
    }
    #add() {
        return +this.screen + this.result;
    }
    type(char) {
        if (this.screen === "0" && char !== ".") this.screen = "";
        if (char === ".") {
            if (this.hasDot) return;
            this.hasDot = true;
        }
        this.screen = this.screen + char;
        this.elemScreen.innerHTML = this.screen;
    }
    set operation(op) {
        this.result = this.screen;
        this.operation = op;
    }
}
const calc = new Calc(document.querySelector(".screen"));
document.querySelector(".keyboard").addEventListener("click", function(ev) {
    const key = ev.target.closest(".keyboard__key");
    if (!key) return;
    const num = key.dataset.num;
    if (num === "dot") return calc.type(".");
    if (num) return calc.type(num);
    const operation = key.dataset.op;
    if (operation === "add") return calc.operation = "add";
});

//# sourceMappingURL=index.5e469f4a.js.map

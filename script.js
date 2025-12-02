"use strict";

const display = document.getElementById("display");

function append(value) {
    if (display.value === "Error") display.value = "";
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    if (display.value === "Error") {
        clearDisplay();
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        // Start from what user typed
        let expr = display.value;

        // Replace pretty operators with JS equivalents
        expr = expr.replace(/÷/g, "/").replace(/×/g, "*");

        // 1) Insert * between number or ')' and '('
        //    9(8-6)  ->  9*(8-6)
        //    (2+3)(4+5) -> (2+3)*(4+5)
        expr = expr.replace(/(\d|\))\(/g, "$1*(");

        // 2) Insert * between ')' and number
        //    (2+3)4  ->  (2+3)*4
        expr = expr.replace(/\)(\d)/g, ")*$1");

        // Now evaluate the cleaned-up expression
        const result = eval(expr);

        if (!isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = result;
        }
    } catch (e) {
        display.value = "Error";
    }
}
document.addEventListener("keydown", (event) => {
	console.log("inside event");
  const key = event.key;

  if (key >= "0" && key <= "9") {
    append(key);
  }
  else if (["+","-","*","/","%","(",")","."].includes(key)) {
    append(key);
  }
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  }
  else if (key === "Backspace") {
    backspace();
  }
  else if (key === "Escape") {
    clearDisplay();
  }
});

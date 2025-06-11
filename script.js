const input = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');

let expression = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;

        switch (value) {
            case '=':
                try {
                    // Securely evaluate using Function constructor
                    expression = Function(`'use strict'; return (${expression})`)();
                    input.value = expression;
                } catch {
                    input.value = "Error";
                    expression = "";
                }
                break;

            case 'AC':
                expression = "";
                input.value = "";
                break;

            case 'DEL':
                expression = expression.slice(0, -1);
                input.value = expression;
                break;

            default:
                // Avoid invalid multiple operator sequences like ++, --, etc.
                if (/[+\-*/.]/.test(value) && /[+\-*/.]$/.test(expression)) {
                    return;
                }
                expression += value;
                input.value = expression;
                break;
        }
    });
});

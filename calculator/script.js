let firstNumber = '';
let secondNumber = '';
let sign = ''; // знак операции
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/'];

// экран
const out = document.querySelector('.screen-par');

function clearAll() {
    firstNumber = '';
    secondNumber = '';
    sign = ''; // знак
    finish = false;
    out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if (!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if (event.target.classList.contains('ac')) return;

    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9
    if (digit.includes(key)) {
        if (secondNumber === '' && sign === '') {
            firstNumber += key;

            out.textContent = firstNumber;
        } else if (firstNumber !== ' ' && secondNumber !== ' ' && finish) {
            secondNumber = key;
            finish = false;
            out.textContent = secondNumber;
        } else {
            secondNumber += key;
            out.textContent = secondNumber;
        }
        console.log(firstNumber, secondNumber, sign);
        return;
    }

    // если нажата клавиша + - / *
    if (action.includes(key)) {
        sign = key;
        out.textContent = sign;
        console.log(firstNumber, secondNumber, sign);
        return;
    }

    if (key === '=') {
        if (secondNumber === "") secondNumber = firstNumber;
        switch (sign) {
            case"+" :
                firstNumber = (+firstNumber) + (+secondNumber);
                break;
            case"-" :
                firstNumber = firstNumber - secondNumber;
                break;
            case"X" :
                firstNumber = firstNumber * secondNumber;
                break;
            case"/" :
                if(secondNumber === '0'){
                    out.textContent = 'Ошибка';
                    firstNumber = '';
                    secondNumber = '';
                    sign = '';
                    return;
                }
                firstNumber = firstNumber / secondNumber;
                break;
        }
        finish = true;
        out.textContent = firstNumber;
        console.log(firstNumber, secondNumber, sign);
    }
}

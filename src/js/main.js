"use strict";
const acttForm = document.querySelector('.actt-form');
const inputs = acttForm.querySelectorAll('input');
const btn = acttForm.querySelector('.btn');
const formatNumberCard = (input) => {
    const valueNumberInput = input.value.replace(/\D/g, '');
    const formatted = valueNumberInput.replace(/(.{4})/g, '$1 ').trim();
    input.value = formatted;
};
const maxDigits = (input, max) => {
    input.value = input.value.slice(0, max);
};
const formatarNumbers = (input) => {
    const valueInput = +input.value;
    if (input.id === 'ano' || input.id === 'date') {
        if (input.id === 'ano') {
            if (valueInput >= 1 && valueInput <= 100) {
                input.value = valueInput < 10 ? '0' + valueInput : String(valueInput);
            }
        }
        else {
            if (valueInput >= 1 && valueInput <= 12) {
                input.value = valueInput < 10 ? '0' + valueInput : String(valueInput);
            }
            ;
        }
        maxDigits(input, 2);
    }
    else {
        if (valueInput >= 1) {
            input.value = valueInput < 10 ? '00' + valueInput : String(valueInput);
        }
        if (input.value.length === 2) {
            input.value = valueInput >= 10 ? '0' + valueInput : String(valueInput);
        }
        maxDigits(input, 3);
    }
};
const msgError = (input) => {
    const formGroup = input.closest('.form-group');
    if (!(input.value !== '')) {
        if (formGroup) {
            const spanExistente = formGroup.querySelector('span.err');
            if (!spanExistente) {
                const spanError = `<span class="err">Cant't be blank</span>`;
                input?.insertAdjacentHTML('afterend', spanError);
            }
            return;
        }
    }
    else {
        if (input.id === 'name') {
            const spanError = `<span class="err">Wrong format, letters only</span>`;
            input.classList.add('err-t');
            input?.insertAdjacentHTML('afterend', spanError);
        }
    }
};
const removeMsgError = (input) => {
    const spans = document.querySelectorAll('span.err');
    spans.forEach((span) => {
        const formGroup = span.closest('.form-group');
        if (formGroup) {
            const inputFG = formGroup.querySelector('input');
            input === inputFG ? span.remove() : '';
        }
    });
};
const showError = (input) => {
    if (input.id === 'conta' && input.value === '0000 0000 0000 0000') {
        input.classList.add('error');
        return;
    }
    if (input.type === 'number' && +input.value === 0 && input.value !== '') {
        input.classList.add('error');
        console.log(input.value);
        return;
    }
    input.classList.add('error');
    msgError(input);
};
const hiddenError = (input) => {
    if (input.classList.contains('err-t')) {
        input.classList.remove('err-t');
    }
    input.classList.remove('error');
    removeMsgError(input);
};
const validateInvalidCharacters = (input) => {
    const cleanedName = /[^a-zA-Z\s]/.test(input.value);
    if (!cleanedName) {
        hiddenError(input);
        return false;
    }
    else {
        showError(input);
        return true;
    }
};
const inputValidateEmpty = (input) => {
    if (!(input.value === '')) {
        if (input.id === 'name') {
            const nameValid = validateInvalidCharacters(input);
            if (nameValid)
                return;
        }
        if (input.id === 'conta' && (input.value === '0000 0000 0000 0000' || input.value.length !== 19)) {
            showError(input);
            return;
        }
        if (input.type === 'number' && +input.value === 0 && input.value !== '') {
            showError(input);
            return;
        }
        hiddenError(input);
        return;
    }
    showError(input);
};
const checkInput = (input) => {
    if (!(input.type === 'text' && input.id === 'name')) {
        if (input.id === "conta") {
            formatNumberCard(input);
            maxDigits(input, 19);
        }
        else if (input.id === "date" || input.id === "ano") {
            formatarNumbers(input);
        }
        else {
            formatarNumbers(input);
        }
    }
    else {
        maxDigits(input, 19);
        validateInvalidCharacters(input);
    }
};
const showDisplay = (input) => {
    const [spanCvc, spanNumber, spanName, spanDate] = document.querySelectorAll('span.actt');
    if (input.id === "name") {
        spanName.innerText = input.value;
    }
    else if (input.id === "conta") {
        let rawValue = input.value.replace(/\D/g, '').slice(0, 16);
        let paddedValue = rawValue.padStart(16, '0');
        let formatted = paddedValue.match(/.{1,4}/g)?.join(' ') || '';
        spanNumber.innerText = formatted;
    }
    else if (input.id === "date" || input.id === "ano") {
        const mesInput = document.getElementById('date');
        const anoInput = document.getElementById('ano');
        const mes = mesInput?.value || '00';
        const ano = anoInput?.value || '00';
        spanDate.innerText = `${mes}/${ano}`;
    }
    else {
        if (input.value === '') {
            spanCvc.innerText = '000';
            return;
        }
        spanCvc.innerText = input.value;
    }
};
const reload = () => {
    location.reload();
};
const showMsgComplet = () => {
    const container = document.querySelector('.container-form');
    const containerComplete = `
        <div class="container-complete">
            <figure class="container-icon">
                <img src="src/assets/images/icon-complete.svg" alt="icon-complete">
            </figure>
            <div class="container-text">
                <h1>Thank you!</h1>
                <h2>We've added your card details</h2>
            </div>
            <button class="btn-con">Continue</button>
        </div>
    `;
    acttForm?.remove();
    container?.insertAdjacentHTML('beforeend', containerComplete);
    const btnCon = document.querySelector('.btn-con');
    btnCon?.addEventListener('click', reload);
};
const formComplet = () => {
    const allInputsValid = [...inputs].every((input) => !input.classList.contains('error'));
    const allNumberInputsFilled = [...inputs].every((input) => {
        if (input.type === 'number') {
            return +input.value !== 0;
        }
        return true;
    });
    const numberCardValid = inputs[1].value !== '0000 0000 0000 0000' &&
        inputs[1].value.length === 19;
    if (allInputsValid && allNumberInputsFilled && numberCardValid) {
        showMsgComplet();
    }
};
inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInput(input);
        if (input.value !== '' && !input.classList.contains('err-t')) {
            hiddenError(input);
        }
        showDisplay(input);
    });
});
acttForm.addEventListener('submit', e => {
    e.preventDefault();
});
btn.addEventListener('click', () => {
    inputs.forEach(input => {
        inputValidateEmpty(input);
    });
    formComplet();
});

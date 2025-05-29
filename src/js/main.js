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
const msgError = (input) => {
    const formGroup = input.closest('.form-group');
    if (!(input.value !== '')) {
        if (formGroup) {
            const spanExistente = formGroup.querySelector('span.err');
            if (!spanExistente) {
                const spanError = `<span class="err">Cant't be blank</span>`;
                input === null || input === void 0 ? void 0 : input.insertAdjacentHTML('afterend', spanError);
            }
            return;
        }
    }
    else {
        if (input.type === 'text') {
            const spanError = `<span class="err">Wrong format, letters only</span>`;
            input.classList.add('err-t');
            input === null || input === void 0 ? void 0 : input.insertAdjacentHTML('afterend', spanError);
        }
        else {
            const spanError = `<span class="err">Wrong format, numbers only</span>`;
            input.classList.add('err-t');
            input === null || input === void 0 ? void 0 : input.insertAdjacentHTML('afterend', spanError);
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
        ;
    });
};
const showError = (input) => {
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
        return;
    }
    else {
        showError(input);
    }
};
const inputValidateEmpty = (input) => {
    if (!(input.value === '')) {
        hiddenError(input);
        return;
    }
    ;
    showError(input);
};
const checkInput = (input) => {
    if (!(input.type === 'text' && input.id === 'name')) {
        if (input.id === "conta") {
            formatNumberCard(input);
            maxDigits(input, 19);
        }
        else if (input.id === "date" || input.id === "ano") {
            maxDigits(input, 2);
        }
        else {
            maxDigits(input, 3);
        }
    }
    else {
        maxDigits(input, 19);
        validateInvalidCharacters(input);
    }
    ;
};
inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInput(input);
        if (input.value !== '' && !input.classList.contains('err-t')) {
            hiddenError(input);
        }
    });
});
acttForm.addEventListener('submit', e => {
    e.preventDefault();
});
btn.addEventListener('click', () => {
    inputs.forEach(input => {
        inputValidateEmpty(input);
    });
});

"use strict";
const acttForm = document.querySelector('.actt-form');
const inputs = acttForm.querySelectorAll('input');
const btn = acttForm.querySelector('.btn');
const maxDigits = (input, max) => {
    input.value = input.value.slice(0, max);
};
const msgError = (input) => {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
        const spanExistente = formGroup.querySelector('span.err');
        if (!spanExistente) {
            const spanError = `<span class="err">Cant't be blank</span>`;
            input === null || input === void 0 ? void 0 : input.insertAdjacentHTML('afterend', spanError);
        }
        return;
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
    input.classList.remove('error');
    removeMsgError(input);
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
    if (!(input.type === 'text')) {
        if (input.id === "conta") {
            maxDigits(input, 27);
        }
        else if (input.id === "date" || input.id === "ano") {
            maxDigits(input, 2);
        }
        else {
            maxDigits(input, 3);
        }
    }
    else {
        maxDigits(input, 5);
    }
    ;
};
inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInput(input);
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

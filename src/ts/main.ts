const acttForm = document.querySelector('.actt-form') as HTMLFormElement;
const inputs = acttForm.querySelectorAll('input');
const btn = acttForm.querySelector('.btn') as HTMLButtonElement;

type ElementeHtml = HTMLElement | null;


const maxDigits = (input: HTMLInputElement, max: number) => {
    input.value = input.value.slice(0, max);
};

const msgError = (input: HTMLInputElement) => {
        const formGroup = input.closest('.form-group') as ElementeHtml;
        
        if (formGroup) {
            const spanExistente = formGroup.querySelector('span.err');

            if (!spanExistente) {
                const spanError: string = `<span class="err">Cant't be blank</span>`;
                input?.insertAdjacentHTML('afterend', spanError);
            }

            return;
        }
        
};

const removeMsgError = (input: HTMLInputElement) => {
    const spans = document.querySelectorAll<HTMLSpanElement>('span.err');

    spans.forEach((span) => {
        const formGroup = span.closest('.form-group') as ElementeHtml;

        if (formGroup) {
            const inputFG = formGroup.querySelector('input') as HTMLInputElement;
            input === inputFG ? span.remove() : '';
        };
    });
};

const showError = (input: HTMLInputElement) => {
    input.classList.add('error');
    msgError(input);
};

const hiddenError = (input: HTMLInputElement) => {
    input.classList.remove('error');
    removeMsgError(input);
};

const inputValidateEmpty = (input: HTMLInputElement) => {
    if(!(input.value === '')) {
        hiddenError(input);
        return;
    };

    showError(input);
};

const checkInput = (input: HTMLInputElement) => {
    if (!(input.type === 'text')) {
        if (input.id === "conta") {
            maxDigits(input, 27);
        } else if (input.id === "date" || input.id === "ano") {
            maxDigits(input, 2);
        } else {
            maxDigits(input, 3);
        }
    } else {
        maxDigits(input, 5);
    };
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
const acttForm = document.querySelector('.actt-form') as HTMLFormElement;
const inputs = acttForm.querySelectorAll('input');
const btn = acttForm.querySelector('.btn') as HTMLButtonElement;

type ElementeHtml = HTMLElement | null;

const formatNumberCard = (input: HTMLInputElement) => {
    const valueNumberInput: string = input.value.replace(/\D/g, '');
    const formatted: string = valueNumberInput.replace(/(.{4})/g, '$1 ').trim();

    input.value = formatted;
};

const maxDigits = (input: HTMLInputElement, max: number) => {
    input.value = input.value.slice(0, max);
};

const formatarNumbers = (input: HTMLInputElement) => {
    const valueInput: number = +input.value;

    if (input.id === 'ano' || input.id === 'date') {
        if (input.id === 'ano') {
            if (valueInput >= 1 && valueInput <= 100) {
                input.value = valueInput < 10 ? '0' + valueInput : String(valueInput);
            }
        } else {
            if(valueInput >= 1 && valueInput <= 12) {
                input.value = valueInput < 10 ? '0' + valueInput : String(valueInput);
            };
        }
        maxDigits(input, 2);
    } else {
        if (valueInput >= 0) {
            input.value = valueInput < 10 ? '00' + valueInput : String(valueInput);
        }

        if (input.value.length === 2) {
            input.value = valueInput >= 10 ? '0' + valueInput : String(valueInput);
        }
        
        maxDigits(input, 3);
    }
};

const msgError = (input: HTMLInputElement) => {
        const formGroup = input.closest('.form-group') as ElementeHtml;
        
        if (!(input.value !== '')) {
            if (formGroup) {

                const spanExistente = formGroup.querySelector('span.err');

                if (!spanExistente) {
                    const spanError: string = `<span class="err">Cant't be blank</span>`;
                    input?.insertAdjacentHTML('afterend', spanError);
                }

                return;
            }
        } else {

            if (input.id === 'name') {
                const spanError: string = `<span class="err">Wrong format, letters only</span>`;
                input.classList.add('err-t');
                input?.insertAdjacentHTML('afterend', spanError);
            }
        }
        
};

const removeMsgError = (input: HTMLInputElement) => {
    const spans = document.querySelectorAll<HTMLSpanElement>('span.err');

    spans.forEach((span) => {
        const formGroup = span.closest('.form-group') as ElementeHtml;

        if (formGroup) {
            const inputFG = formGroup.querySelector('input') as HTMLInputElement;
            input === inputFG ? span.remove() : '';
        }
    });
};

const showError = (input: HTMLInputElement) => {
    if(input.id === 'conta' &&  input.value === '0000 0000 0000 0000') {
        input.classList.add('error');
        return;
    }

    if(input.type === 'number' && +input.value === 0 && input.value !== '') {
        input.classList.add('error');
        console.log(input.value);
        
        return;
    }

    input.classList.add('error');
    msgError(input);
};

const hiddenError = (input: HTMLInputElement) => {
    if (input.classList.contains('err-t')) {
        input.classList.remove('err-t');
    }
    
    input.classList.remove('error');
    removeMsgError(input);
};

const validateInvalidCharacters = (input: HTMLInputElement) => {
    const cleanedName: boolean = /[^a-zA-Z\s]/.test(input.value);
    
    if (!cleanedName) {
        hiddenError(input);
        return false;
    } else {
        showError(input);
        return true;
    }
};

const inputValidateEmpty = (input: HTMLInputElement) => {

    if(!(input.value === '')) {
        if (input.id === 'name') {
            const nameValid: boolean = validateInvalidCharacters(input);
            if (nameValid) return;
        }

        if(input.id === 'conta' &&  input.value === '0000 0000 0000 0000') {
            showError(input);
            return;
        }

        if(input.type === 'number' && +input.value === 0 && input.value !== '') {
            showError(input);            
            return;
        }

        hiddenError(input);
        return;
    }

    showError(input);
};

const checkInput = (input: HTMLInputElement) => {
    if (!(input.type === 'text' && input.id === 'name')) {
        if (input.id === "conta") {
            formatNumberCard(input);
            maxDigits(input, 19);
        } else if (input.id === "date" || input.id === "ano") {
            formatarNumbers(input);
        } else {
            formatarNumbers(input);
        }
    } else {
        maxDigits(input, 19);
        validateInvalidCharacters(input);
    }
};

const showDisplay = (input: HTMLInputElement) => {
    const [spanCvc, spanNumber, spanName, spanDate] = document.querySelectorAll<HTMLSpanElement>('span.actt');

    if (input.id === "name" ) {
        spanName.innerText = input.value;

    } else if (input.id === "conta" ) {
        let rawValue = input.value.replace(/\D/g, '').slice(0, 16);
        let paddedValue = rawValue.padStart(16, '0');
        let formatted = paddedValue.match(/.{1,4}/g)?.join(' ') || '';
        spanNumber.innerText = formatted;
        
    } else if (input.id === "date" || input.id === "ano") {
        const mesInput = document.getElementById('date') as HTMLInputElement;
        const anoInput = document.getElementById('ano') as HTMLInputElement;

        const mes = mesInput?.value || '00';
        const ano = anoInput?.value || '00';

        spanDate.innerText = `${mes}/${ano}`;
        
    } else {
        spanCvc.innerText = input.value;
    }
}

const reload = () => {
    location.reload();
};

const showMsgComplet = () => {
    const container: ElementeHtml = document.querySelector('.container-form');
    const containerComplete: string = `
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

    const btnCon: ElementeHtml = document.querySelector('.btn-con');
    btnCon?.addEventListener('click', reload);
};

const formComplet = () => {
        const allInputsValid: boolean = [...inputs].every((input) => !input.classList.contains('error'));

        const allNumberInputsFilled: boolean = [...inputs].every((input) => {
            if (input.type === 'number') {
                return +input.value !== 0;
            }
            return true;
        });

        const numberCardValid: boolean = inputs[1].value !== '0000 0000 0000 0000';


        if (allInputsValid && allNumberInputsFilled && numberCardValid) {
            showMsgComplet();
        }

};

inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInput(input);

        if(input.value !== '' && !input.classList.contains('err-t')) {
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


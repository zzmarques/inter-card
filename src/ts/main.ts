const acttForm = document.querySelector('.actt-form') as HTMLFormElement;
const inputs = acttForm.querySelectorAll('input');


const maxDigits = (input: HTMLInputElement, max: number) => {
    input.value = input.value.slice(0, max);
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
    }
}

inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInput(input);
    });
});

acttForm.addEventListener('submit', e => {
    e.preventDefault();
});
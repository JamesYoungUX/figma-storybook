import './input.css';

export const createInput = ({
    label = 'Label',
    placeholder = 'Enter text...',
    type = 'text',
    size = 'medium',
    error = false,
    disabled = false,
    helperText = '',
}) => {
    const container = document.createElement('div');
    container.className = 'input-container';

    const labelElement = document.createElement('label');
    labelElement.className = 'input-label';
    labelElement.innerText = label;
    container.appendChild(labelElement);

    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.className = `input input--${size}`;

    if (error) {
        input.classList.add('input--error');
    }

    if (disabled) {
        input.disabled = true;
        input.classList.add('input--disabled');
    }

    container.appendChild(input);

    if (helperText) {
        const helper = document.createElement('div');
        helper.className = error ? 'input-helper input-helper--error' : 'input-helper';
        helper.innerText = helperText;
        container.appendChild(helper);
    }

    return container;
};

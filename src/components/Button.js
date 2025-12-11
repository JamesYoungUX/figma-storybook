import './button.css';

export const createButton = ({
    label = 'Button',
    variant = 'primary',
    size = 'medium',
    onClick,
}) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = label;
    button.className = `btn btn--${variant} btn--${size}`;

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    return button;
};

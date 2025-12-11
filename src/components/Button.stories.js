import { createButton } from './Button';

export default {
    title: 'Components/Button',
    tags: ['autodocs'],
    render: ({ label, ...args }) => {
        return createButton({ label, ...args });
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'success', 'warning', 'error', 'outline'],
            description: 'Button variant/style',
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'Button size',
        },
        label: {
            control: 'text',
            description: 'Button text label',
        },
        onClick: { action: 'clicked' },
    },
};

export const Primary = {
    args: {
        variant: 'primary',
        label: 'Primary Button',
        size: 'medium',
    },
};

export const Secondary = {
    args: {
        variant: 'secondary',
        label: 'Secondary Button',
        size: 'medium',
    },
};

export const Success = {
    args: {
        variant: 'success',
        label: 'Success Button',
        size: 'medium',
    },
};

export const Warning = {
    args: {
        variant: 'warning',
        label: 'Warning Button',
        size: 'medium',
    },
};

export const Error = {
    args: {
        variant: 'error',
        label: 'Error Button',
        size: 'medium',
    },
};

export const Outline = {
    args: {
        variant: 'outline',
        label: 'Outline Button',
        size: 'medium',
    },
};

export const Small = {
    args: {
        variant: 'primary',
        label: 'Small Button',
        size: 'small',
    },
};

export const Large = {
    args: {
        variant: 'primary',
        label: 'Large Button',
        size: 'large',
    },
};

export const AllVariants = {
    render: () => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '1rem';
        container.style.flexWrap = 'wrap';
        container.style.padding = '1rem';

        const variants = ['primary', 'secondary', 'success', 'warning', 'error', 'outline'];

        variants.forEach(variant => {
            container.appendChild(createButton({
                variant,
                label: variant.charAt(0).toUpperCase() + variant.slice(1)
            }));
        });

        return container;
    },
};

export const AllSizes = {
    render: () => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '1rem';
        container.style.alignItems = 'center';
        container.style.padding = '1rem';

        const sizes = ['small', 'medium', 'large'];

        sizes.forEach(size => {
            container.appendChild(createButton({
                variant: 'primary',
                size,
                label: size.charAt(0).toUpperCase() + size.slice(1)
            }));
        });

        return container;
    },
};

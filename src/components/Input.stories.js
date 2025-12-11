import { createInput } from './Input';

export default {
    title: 'Components/Input',
    tags: ['autodocs'],
    render: ({ label, placeholder, type, size, error, disabled, helperText }) => {
        return createInput({ label, placeholder, type, size, error, disabled, helperText });
    },
    argTypes: {
        label: {
            control: 'text',
            description: 'Input label',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text',
        },
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number', 'tel', 'url'],
            description: 'Input type',
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'Input size',
        },
        error: {
            control: 'boolean',
            description: 'Error state',
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state',
        },
        helperText: {
            control: 'text',
            description: 'Helper or error text',
        },
    },
};

export const Default = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        type: 'email',
        size: 'medium',
        error: false,
        disabled: false,
        helperText: '',
    },
};

export const WithHelperText = {
    args: {
        label: 'Username',
        placeholder: 'Choose a username',
        type: 'text',
        size: 'medium',
        error: false,
        disabled: false,
        helperText: 'Your username must be unique',
    },
};

export const WithError = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email',
        type: 'email',
        size: 'medium',
        error: true,
        disabled: false,
        helperText: 'Please enter a valid email address',
    },
};

export const Disabled = {
    args: {
        label: 'Disabled Input',
        placeholder: 'This input is disabled',
        type: 'text',
        size: 'medium',
        error: false,
        disabled: true,
        helperText: '',
    },
};

export const Small = {
    args: {
        label: 'Small Input',
        placeholder: 'Small size',
        type: 'text',
        size: 'small',
        error: false,
        disabled: false,
        helperText: '',
    },
};

export const Large = {
    args: {
        label: 'Large Input',
        placeholder: 'Large size',
        type: 'text',
        size: 'large',
        error: false,
        disabled: false,
        helperText: '',
    },
};

export const Password = {
    args: {
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        size: 'medium',
        error: false,
        disabled: false,
        helperText: 'Must be at least 8 characters',
    },
};

export const AllSizes = {
    render: () => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '2rem';
        container.style.padding = '1rem';

        const sizes = ['small', 'medium', 'large'];

        sizes.forEach(size => {
            container.appendChild(createInput({
                label: `${size.charAt(0).toUpperCase() + size.slice(1)} Input`,
                placeholder: `This is a ${size} input`,
                size,
            }));
        });

        return container;
    },
};

export const FormExample = {
    render: () => {
        const form = document.createElement('div');
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.gap = '1.5rem';
        form.style.padding = '2rem';
        form.style.maxWidth = '500px';
        form.style.backgroundColor = 'white';
        form.style.borderRadius = 'var(--radius-lg)';
        form.style.boxShadow = 'var(--shadow-md)';

        const title = document.createElement('h2');
        title.textContent = 'Sign Up Form';
        title.style.margin = '0 0 1rem 0';
        title.style.fontSize = 'var(--font-size-2xl)';
        title.style.fontWeight = 'var(--font-weight-bold)';
        form.appendChild(title);

        form.appendChild(createInput({
            label: 'Full Name',
            placeholder: 'John Doe',
            type: 'text',
            size: 'medium',
        }));

        form.appendChild(createInput({
            label: 'Email Address',
            placeholder: 'john@example.com',
            type: 'email',
            size: 'medium',
            helperText: 'We\'ll never share your email',
        }));

        form.appendChild(createInput({
            label: 'Password',
            placeholder: 'Enter a strong password',
            type: 'password',
            size: 'medium',
            helperText: 'Must be at least 8 characters',
        }));

        form.appendChild(createInput({
            label: 'Phone Number',
            placeholder: '(555) 123-4567',
            type: 'tel',
            size: 'medium',
        }));

        return form;
    },
};

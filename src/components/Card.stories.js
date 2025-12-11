import { createCard } from './Card';

export default {
    title: 'Components/Card',
    tags: ['autodocs'],
    render: ({ title, description, imageUrl, elevation }) => {
        return createCard({ title, description, imageUrl, elevation });
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Card title',
        },
        description: {
            control: 'text',
            description: 'Card description',
        },
        imageUrl: {
            control: 'text',
            description: 'Optional image URL',
        },
        elevation: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'Shadow elevation level',
        },
    },
};

export const Default = {
    args: {
        title: 'Beautiful Card',
        description: 'This card demonstrates design tokens from Figma including shadows, spacing, and typography.',
        elevation: 'md',
    },
};

export const WithImage = {
    args: {
        title: 'Card with Image',
        description: 'This card includes an image at the top, perfect for product cards or blog posts.',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=200&fit=crop',
        elevation: 'md',
    },
};

export const SmallElevation = {
    args: {
        title: 'Small Elevation',
        description: 'This card has a subtle shadow (sm elevation).',
        elevation: 'sm',
    },
};

export const LargeElevation = {
    args: {
        title: 'Large Elevation',
        description: 'This card has a prominent shadow (lg elevation).',
        elevation: 'lg',
    },
};

export const ExtraLargeElevation = {
    args: {
        title: 'Extra Large Elevation',
        description: 'This card has the most dramatic shadow (xl elevation).',
        elevation: 'xl',
    },
};

export const AllElevations = {
    render: () => {
        const container = document.createElement('div');
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        container.style.gap = '2rem';
        container.style.padding = '2rem';

        const elevations = ['sm', 'md', 'lg', 'xl'];

        elevations.forEach(elevation => {
            container.appendChild(createCard({
                title: `${elevation.toUpperCase()} Elevation`,
                description: `This card demonstrates the ${elevation} shadow elevation from our design tokens.`,
                elevation
            }));
        });

        return container;
    },
};

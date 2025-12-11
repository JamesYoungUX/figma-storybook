import './card.css';

export const createCard = ({
    title = 'Card Title',
    description = 'Card description goes here',
    imageUrl = null,
    elevation = 'md',
}) => {
    const card = document.createElement('div');
    card.className = `card card--elevation-${elevation}`;

    if (imageUrl) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = title;
        img.className = 'card__image';
        card.appendChild(img);
    }

    const content = document.createElement('div');
    content.className = 'card__content';

    const titleElement = document.createElement('h3');
    titleElement.className = 'card__title';
    titleElement.innerText = title;
    content.appendChild(titleElement);

    const descElement = document.createElement('p');
    descElement.className = 'card__description';
    descElement.innerText = description;
    content.appendChild(descElement);

    card.appendChild(content);

    return card;
};

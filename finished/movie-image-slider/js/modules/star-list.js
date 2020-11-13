import StarItem from './star-item';

const createStar = (rating, stars, i) => {
    const pct = rating * 10;

    return StarItem.html({
        styles: {
            width: (i === stars - 1 && stars !== rating ? pct : 100) + '%'
        }
    });
};

const StarListModule = (() => {
    const html = props => {
        const stars = Math.ceil(props.rating);
        const starItems = Array.from({ length: stars })
            .map((_, i) => createStar(props.rating, stars, i))
            .join('');

        return `
            <ul class="text__rating-star-list">
                ${starItems}
            </ul>
        `;
    };

    return { html };
})();

export default StarListModule;

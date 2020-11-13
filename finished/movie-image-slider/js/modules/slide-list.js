import SliderItem from './slider-item';

const createItem = (movie, i) => {
    return SliderItem.html({
        src: movie.image,
        styles: {
            transform: `translateX(${i === 0 ? 45 : 45 + 15 * i}rem)`
        }
    });
};

const SliderListModule = (() => {
    const html = props => {
        return `
            <ul class="slider__list">
                ${props.movies.map(createItem).join('')}
            </ul>
        `;
    };

    return { html };
})();

export default SliderListModule;

import StarList from './star-list';

const TextModule = (() => {
    const html = props => {
        return `
            <div class="text__inner">
                <div class="text__group">
                    <h3 class="text__title">${props.title}</h3>
                    <div class="text__rating">
                        <span class="text__rating-average">Avg. rating:</span>
                        ${StarList.html({ rating: props.rating })}
                        <span class="text__rating-number">
                            ${props.rating} / 5
                        </span>
                    </div>
                    <p class="text__synopsis">
                        ${props.synopsis}
                    </p>
                </div>
            </div>
        `;
    };

    return { html };
})();

export default TextModule;

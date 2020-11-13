import Utils from './utils';
const { styles } = Utils;

const StarItemModule = (() => {
    const html = props => {
        return `
            <li class="text__rating-star">
                <div
                    class="text__rating-star-fill"
                    style="${styles(props.styles)}"
                ></div>
            </li>
        `;
    };

    return { html };
})();

export default StarItemModule;

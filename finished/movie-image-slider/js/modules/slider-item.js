import Utils from './utils';
const { styles } = Utils;

const SliderItemModule = (() => {
    const html = props => {
        return `
            <li class="slider__item" style="${styles(props.styles)}">
                <img src="${props.src}" class="slider__item-img" />
            </li>
        `;
    };

    return { html };
})();

export default SliderItemModule;

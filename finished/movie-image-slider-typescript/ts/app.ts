import SliderList from './modules/slide-list';
import SliderItem from './modules/slider-item';
import {$, isArrayOfSliderItems} from './modules/utils';

const components = [
    {
        tagName: 'slider-list',
        component: SliderList,
        extends: {extends: 'ul'},
    },
    {
        tagName: 'slider-item',
        component: SliderItem,
        extends: {extends: 'li'},
    },
];

components.forEach((c) => {
    window.customElements.define(c.tagName, c.component, c.extends);
});

$('.btn').addEventListener('click', () => {
    const items = Array.from(document.querySelectorAll('.slider__item'));

    if (isArrayOfSliderItems(items)) {
        items.forEach((item) => item.rotatePosition());
    }
});

import SliderItem from './slider-item';

export const $ = (selector: string): HTMLElement => {
    return document.querySelector(selector) as HTMLElement;
};

export const isSliderItem = (obj: unknown): obj is SliderItem => {
    return (obj as SliderItem)?.constructor === SliderItem;
};

export const isArrayOfSliderItems = (obj: unknown): obj is SliderItem[] => {
    return Array.isArray(obj) && obj.every(isSliderItem);
};

export const html = (() => (str: any) => str.join(''))();

export interface Movie {
    image: string;
    title: string;
    rating: number;
    synopsis: string;
}

import { Rect } from './types';

export const sleep = (ms = 0): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const checkCollision = (r1: Rect, r2: Rect): boolean => {
    return !!(
        r2.width &&
        r1.x + r1.width >= r2.x &&
        r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height
    );
};

export const rectOf = (el: Element): ClientRect => {
    return el.getBoundingClientRect();
};

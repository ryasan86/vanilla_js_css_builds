import movies from '../movies';
import {Movie} from './utils';

export default class SlideListComponent extends HTMLUListElement {
    constructor() {
        super();

        this.innerHTML = movies.map(this.html).join('');
    }

    private html(m: Movie, idx: number): string {
        return `<li 
                    is="slider-item" 
                    image="${m.image}" 
                    title="${m.title}" 
                    rating="${m.rating}" 
                    synopsis="${m.synopsis}" 
                    idx="${idx}">
                </li>
            `;
    }
}

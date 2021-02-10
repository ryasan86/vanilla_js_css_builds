import movies from '../movies';
import {Movie, $} from './utils';

export default class SliderItemComponent extends HTMLLIElement {
    private position: number;
    private movie: Movie;

    constructor() {
        super();
        this.position = Number(this.getAttribute('idx'));

        this.movie = {
            title: this.getAttribute('title') as string,
            image: this.getAttribute('image') as string,
            synopsis: this.getAttribute('synopsis') as string,
            rating: Number(this.getAttribute('rating')),
        };

        this.className = 'slider__item';
    }

    private connectedCallback(): void {
        this.appendImage();
        this.setStyles();
    }

    private appendImage(): void {
        const img = Object.assign(document.createElement('img'), {
            src: this.movie.image,
        });

        this.appendChild(img);
    }

    // prettier-ignore
    private setStyles(): void {
        this.style.transform = `translateX(${this.position === 0 ? 45 : 45 + 15 * this.position}rem)`;
        this.style.display = this.position === movies.length - 1 ? 'none' : 'initial';
        
        if (this.position === 0) {
            this.classList.add('active');
            renderMovieDetails(this.movie);
        } 
        if (this.position !== 0 && this.classList.contains('active')) {
            this.classList.remove('active');
        }
        
    }

    private setNextPosition(): void {
        this.position = (this.position + movies.length - 1) % movies.length;
    }

    public rotatePosition(): void {
        this.setNextPosition();
        this.setStyles();
    }
}

const renderMovieDetails = (movie: Movie) => {
    const stars = Math.ceil(movie.rating);

    const starItems = Array.from({length: stars}).map((_, i) => {
        const pct = movie.rating * 10;
        const width = (i === stars - 1) && (stars !== movie.rating ? pct : 100); // prettier-ignore

        return `
            <li class="text__rating-star">
                <div class="text__rating-star-fill" style="width: ${width}%"></div>
            </li>
        `;
    });

    $('.text').innerHTML = `
        <div class="text__inner">
            <div class="text__group">
                <h3 class="text__title">${movie.title}</h3>
                <div class="text__rating">
                    <span class="text__rating-average">Avg. rating:</span>
                    <ul class="text__rating-star-list">
                        ${starItems.join('')}
                    </ul>
                    <span class="text__rating-number">
                        ${movie.rating} / 5
                    </span>
                </div>
                <p class="text__synopsis">${movie.synopsis}</p>
            </div>
        </div>
    `;
};

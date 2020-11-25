import { columns, earth, center, state } from './app';
import { playerElement } from './player';
import { rectOf, checkCollision, random } from './utils';

export let invaderElements: HTMLCollection;

const speed = {
    slow: 1500,
    normal: 1000,
    fast: 500
};

class Invaders {
    bottomInvaders: (Element | null)[];

    constructor () {
        this.bottomInvaders = this.freshBottomInvaders();
    }

    freshBottomInvaders = (): (Element | null)[] => {
        return [...columns].map(col => col.lastElementChild);
    };

    checkIfPlayerIsHit = async (bullet: HTMLElement): Promise<void> => {
        if (checkCollision(rectOf(bullet), rectOf(playerElement))) {
            bullet.remove();
            playerElement.remove();
        }

        if (bullet.offsetTop >= earth.offsetHeight) {
            bullet.remove();
        }
    };

    updateBullets = (): void => {
        if (!state.isPaused) {
            this.bottomInvaders.forEach((invader: any) => {
                if (invader?.children.length) {
                    [...invader.children].forEach((bullet: any) => {
                        bullet.style.top = `${bullet.offsetTop + 5}px`;
                        this.checkIfPlayerIsHit(bullet);
                    });
                }
            });

            this.bottomInvaders = this.freshBottomInvaders();
        }

        requestAnimationFrame(this.updateBullets);
    };

    randomAttack = (): void => {
        if (!state.isPaused) {
            const idx = random(0, columns.length - 1);
            const randomInvader = this.bottomInvaders[idx];

            if (randomInvader) {
                randomInvader.innerHTML += `<div class="bullet" style="bottom: 0; left: ${center}px;"></div>`;
            }
        }
    };

    moveRight = (): void => {
        // move right
    };

    moveLeft = (): void => {
        // move left
    };

    moveDown = (): void => {
        // move down
    };

    update = (): void => {
        this.updateBullets();
        setInterval(this.randomAttack, speed.normal);
    };

    render = (): void => {
        [...columns].slice(1).forEach((_, i) => {
            columns[i].innerHTML = '<div class="invader"></div>'.repeat(5);
        });

        invaderElements = document.getElementsByClassName('invader');
    };
}

export default Invaders;

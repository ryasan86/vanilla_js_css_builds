import { columns, earth, center, state } from './app';
import { playerElement } from './player';
import { rectOf, checkCollision, random } from './utils';

export let invaderElements: HTMLCollection;
export let interval: number;

const speed = {
    slow: 1500,
    normal: 1000,
    fast: 500
};

class Invaders {
    bottomInvaders: (Element | null)[];
    randomInvader: Element | null;

    constructor () {
        this.bottomInvaders = this.freshBottomInvaders();
        this.randomInvader = null;
    }

    freshBottomInvaders = (): (Element | null)[] => {
        return [...columns].slice(0, -1).map(col => col.lastElementChild);
    };

    checkForPlayerHit = async (bullet: HTMLElement): Promise<void> => {
        if (playerElement) {
            if (checkCollision(rectOf(bullet), rectOf(playerElement))) {
                bullet.remove();
                playerElement.remove();
            }

            if (bullet.offsetTop >= earth.offsetHeight) {
                bullet.remove();
            }
        }
    };

    // updateBullets = (): void => {
    //     if (!state.isPaused) {
    //         this.bottomInvaders.forEach((invader: any) => {
    //             if (invader?.children.length) {
    //                 [...invader.children].forEach((bullet: any) => {
    //                     bullet.style.top = `${bullet.offsetTop + 5}px`;
    //                     this.checkForPlayerHit(bullet);
    //                 });
    //             }
    //         });
    //         this.bottomInvaders = this.freshBottomInvaders();
    //     }

    //     requestAnimationFrame(this.updateBullets);
    // };

    updateBullets = (): void => {
        if (!state.isPaused) {
            if (this.randomInvader) {
                [...this.randomInvader.children].forEach((bullet: any) => {
                    bullet.style.top = `${bullet.offsetTop + 5}px`;
                });
            }
        }

        requestAnimationFrame(this.updateBullets);
    };

    addBulletToRandom = (): void => {
        if (!state.isPaused) {
            this.randomInvader = columns[random(0, 9)].lastElementChild;
            if (this.randomInvader) {
                this.randomInvader.innerHTML += `<div class="bullet" style="bottom: 0; left: ${center}px;"></div>`;
            }
        }
    };

    update = (): void => {
        this.updateBullets();
        interval = setInterval(this.addBulletToRandom, speed.slow);
    };

    render = (): void => {
        [...columns].slice(1).forEach((_, i) => {
            columns[i].innerHTML = '<div class="invader"></div>'.repeat(5);
        });
        invaderElements = document.getElementsByClassName('invader') as HTMLCollection; // prettier-ignore
    };
}

export default Invaders;

// moveRight = (): void => {
//     // move right
// };

// moveLeft = (): void => {
//     // move left
// };

// moveDown = (): void => {
//     // move down
// };

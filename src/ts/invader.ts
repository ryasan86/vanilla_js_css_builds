import { center, earth, state } from './app';
import { playerElement } from './player';
import { rectOf, checkCollision } from './utils';

class InvaderBullet {
    node = document.createElement('div');

    constructor () {
        this.node.className = 'bullet';
        this.node.style.cssText = `bottom: 0; left: ${center}px`;
    }

    checkForHitOnPlayer = (): void => {
        if (playerElement) {
            if (checkCollision(rectOf(this.node), rectOf(playerElement))) {
                this.node.remove();
                playerElement.remove();
            }

            if (this.node.offsetTop >= earth.offsetHeight) {
                this.node.remove();
            }
        }
    };

    update = (): void => {
        if (!state.isPaused) {
            this.node.style.top = `${this.node.offsetTop + 5}px`;
            this.checkForHitOnPlayer();
        }

        requestAnimationFrame(this.update);
    };

    render = (): HTMLElement => {
        return this.node;
    };
}

class Invader {
    node = document.createElement('div');
    bullets: InvaderBullet[];

    constructor (numA: number, numB: number) {
        this.node.className = 'invader';
        this.node.id = `invader-${numA}-${numB}`;
        this.bullets = [];
    }

    remove = (): void => {
        this.node.remove();
    };

    fire = (): void => {
        const bullet = new InvaderBullet();
        this.bullets.push(bullet);
        this.update(bullet);
    };

    update = (bullet: InvaderBullet): void => {
        this.node.appendChild(bullet.render());
        bullet.update();
    };

    render = (): HTMLElement => {
        return this.node;
    };
}

export default Invader;

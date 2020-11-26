import { center, earth, state } from './app';
import { playerElement } from './player';
import { rectOf, checkCollision } from './utils';

class InvaderBullet {
    node = document.createElement('div');
    bullets: InvaderBullet[];

    constructor (bullets: InvaderBullet[]) {
        this.node.className = 'bullet';
        this.node.style.cssText = `bottom: 0; left: ${center}px`;
        this.bullets = bullets;
    }

    remove = (): void => {
        this.bullets.splice(this.bullets.indexOf(this), 1);
        this.node.remove();
    };

    checkForHitOnPlayer = (): void => {
        if (playerElement) {
            if (checkCollision(rectOf(this.node), rectOf(playerElement))) {
                this.remove();
                playerElement.remove();
            }
            if (this.node.offsetTop >= earth.offsetHeight) {
                this.remove();
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
    bullet: InvaderBullet | null;
    coordinates: [number, number];

    constructor (numA: number, numB: number) {
        this.node.className = 'invader';
        this.bullets = [];
        this.bullet = null;
        this.coordinates = [numA, numB];
    }

    remove = (): void => {
        this.render().remove();
    };

    fire = (): void => {
        this.bullet = new InvaderBullet(this.bullets);
        this.bullets.push(this.bullet);
        this.update();
    };

    update = (): void => {
        if (this.bullet) {
            this.node.appendChild(this.bullet.render());
            this.bullet.update();
        }
    };

    render = (): HTMLElement => {
        return this.node;
    };
}

export default Invader;

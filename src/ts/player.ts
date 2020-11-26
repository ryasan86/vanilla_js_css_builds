import Invader from './invader';
import { center, earth, state, player, invaders } from './app';
import { sleep, rectOf, checkCollision } from './utils';
import { invaderElements } from './invaders';

export let playerElement: HTMLElement;

class PlayerBullet {
    node = document.createElement('div');
    bullets: PlayerBullet[];

    constructor (x: number, bullets: PlayerBullet[]) {
        this.node.className = 'bullet';
        this.node.style.cssText = `top: 0; left: ${x}px`;
        this.bullets = bullets;
    }

    remove = (): void => {
        this.bullets.splice(this.bullets.indexOf(this), 1);
        this.node.remove();
    };

    checkForHitOnInvader = (): void => {
        let invader: Invader | undefined;

        for (const i in invaders.matrix) {
            for (const j in invaders.matrix) {
                invader = invaders?.matrix[i][j];

                if (
                    invader &&
                    checkCollision(rectOf(this.node), rectOf(invader.render()))
                ) {
                    this.remove();
                    player.scorePoints();
                    invaders.removeInvader(invader);
                }

                if (this.node.offsetTop <= -earth.offsetHeight) {
                    this.remove();
                }
            }
        }
    };

    update = (): void => {
        if (!state.isPaused) {
            this.node.style.top = `${this.node.offsetTop - 5}px`;
            this.checkForHitOnInvader();
        }
        requestAnimationFrame(this.update);
    };

    render = (): HTMLElement => {
        return this.node;
    };
}

// if (invaderElements?.length) {
//     for (const invader of invaderElements) {
//         if (checkCollision(rectOf(this.node), rectOf(invader))) {
//             this.remove();
//             invaders.removeInvader(invader)
//             player.scorePoints();
//         }
//         if (this.node.offsetTop <= -earth.offsetHeight) {
//             this.remove();
//         }
//     }
// }

class Player {
    lives = 3;
    scoreCount = 0;
    x = 500;
    moveID = 0;
    node = document.createElement('div');
    score = document.getElementById('score-count') as HTMLElement;
    gun = document.getElementById('gun') as HTMLElement;
    bullets: PlayerBullet[];
    bullet: PlayerBullet | null;

    constructor () {
        this.node.id = 'player';
        this.bullets = [];
        this.bullet = null;
    }

    moveLeft = (): void => {
        this.stopMoving();

        if (this.node.offsetLeft <= 0 || state.isPaused) return;
        else {
            this.node.style.left = `${(this.x -= 5)}px`;
            this.moveID = requestAnimationFrame(this.moveLeft);
        }
    };

    moveRight = (): void => {
        this.stopMoving();

        if (this.node.offsetLeft >= 1010 || state.isPaused) return;
        else {
            this.node.style.left = `${(this.x += 5)}px`;
            this.moveID = requestAnimationFrame(this.moveRight);
        }
    };

    stopMoving = (): void => {
        if (this.moveID) cancelAnimationFrame(this.moveID);
    };

    scorePoints = async (): Promise<void> => {
        for (let i = 1; i <= 10; i++) {
            this.scoreCount++;
            this.score.textContent = this.scoreCount.toString();
            await sleep(25);
        }
    };

    fire = (): void => {
        const x = this.node.offsetLeft + center;
        this.bullet = new PlayerBullet(x, this.bullets);
        this.bullets.push(this.bullet);
        this.update();
    };

    update = (): void => {
        if (this.bullet) {
            this.gun.appendChild(this.bullet.render());
            this.bullet.update();
        }
    };

    render = (): void => {
        (document.getElementById('player-zone') as HTMLElement).appendChild(this.node) // prettier-ignore
        playerElement = this.node;
    };
}

export default Player;

import { center, player, earth } from './app';
import { sleep, rectOf, checkCollision } from './utils';
import { invaderElements } from './invaders';

export let playerElement: HTMLElement;

class Player {
    lives = 3;
    scoreCount = 0;
    x = 500;
    moveID = 0;
    node = document.createElement('div');
    score = document.getElementById('score-count') as HTMLElement;
    gun = document.getElementById('gun') as HTMLElement;

    constructor () {
        this.node.id = 'player';
    }

    moveLeft = (): void => {
        this.stopMoving();

        if (this.node.offsetLeft <= 0) {
            return;
        } else {
            this.node.style.left = `${(this.x -= 5)}px`;
            this.moveID = requestAnimationFrame(this.moveLeft);
        }
    };

    moveRight = (): void => {
        this.stopMoving();

        if (this.node.offsetLeft >= 1010) {
            return;
        } else {
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
        this.gun.innerHTML += `<div class="bullet" style="top: 0; left: ${x}px;"></div>`;
    };

    checkIfInvaderIsHit = async (bullet: HTMLElement): Promise<void> => {
        if (invaderElements?.length) {
            for (const invader of invaderElements) {
                if (checkCollision(rectOf(bullet), rectOf(invader))) {
                    bullet.remove();
                    invader.remove();
                    player.scorePoints();
                }

                if (bullet.offsetTop <= -earth.offsetHeight) {
                    bullet.remove();
                }
            }
        }
    };

    update = (): void => {
        if (this.gun.children.length) {
            [...this.gun.children].forEach((bullet: any) => {
                bullet.style.top = `${bullet.offsetTop - 5}px`;
                this.checkIfInvaderIsHit(bullet);
            });
        }

        requestAnimationFrame(this.update);
    };

    render = (): void => {
        (document.getElementById('player-zone') as HTMLElement).appendChild(this.node) // prettier-ignore
        playerElement = this.node;
    };
}

export default Player;

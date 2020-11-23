import 'regenerator-runtime/runtime';

import { Rect } from './types';
import { LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, SPACE_BAR } from './constants';

const earth = document.getElementById('earth') as HTMLElement;
const columns = document.getElementsByClassName('invaders-col') as HTMLCollection; // prettier-ignore
const gun = document.getElementById('gun') as HTMLElement;
const score = document.getElementById('score-count') as HTMLElement;
const bulletWidth = 6;

let invaders: Element[];

class Player {
    lives = 3;
    score = 0;
    xDir = 500;
    moveID = 0;
    player = document.createElement('div');

    constructor () {
        this.player.id = 'player';
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.stopMoving = this.stopMoving.bind(this);
    }

    moveLeft () {
        this.stopMoving();
        this.player.style.left = `${(this.xDir -= 5)}px`;
        if (this.player.offsetLeft <= 0) this.stopMoving();
        else this.moveID = requestAnimationFrame(this.moveLeft);
    }

    moveRight () {
        this.stopMoving();
        this.player.style.left = `${(this.xDir += 5)}px`;
        if (this.player.offsetLeft >= 1010) this.stopMoving();
        else this.moveID = requestAnimationFrame(this.moveRight);
    }

    async scorePoints () {
        for (let i = 1; i <= 10; i++) {
            this.score++;
            score.textContent = this.score.toString();
            await sleep(25);
        }
    }

    stopMoving () {
        if (this.moveID) cancelAnimationFrame(this.moveID);
    }

    fire () {
        const x = this.player.offsetLeft + (this.player.offsetWidth / 2) - (bulletWidth / 2); // prettier-ignore
        gun.innerHTML += `<div class="bullet" style="top: 0; left: ${x}px"></div>`;
    }

    html () {
        return this.player;
    }
}

const player: Player = new Player();

const update = () => {
    if (gun.children.length) {
        [...gun.children].forEach((bullet: any) => {
            bullet.style.top = `${bullet.offsetTop - 5}px`;
            updateCollisions(bullet);
        });
    }
    requestAnimationFrame(update);
};

const updateCollisions = async (bullet: HTMLElement) => {
    for (const invader of invaders) {
        if (checkCollision(rectOf(bullet), rectOf(invader))) {
            bullet.remove();
            invader.remove();
            player.scorePoints();
        }
        if (bullet.offsetTop <= -earth.offsetHeight) {
            bullet.remove();
        }
    }
};

const checkCollision = (r1: Rect, r2: Rect) => {
    return (
        r2.width &&
        r1.x + r1.width >= r2.x &&
        r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height
    );
};

const onKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === LEFT_ARROW) player.moveLeft();
    if (e.keyCode === RIGHT_ARROW) player.moveRight();
    if (e.keyCode === DOWN_ARROW) player.stopMoving();
    if (e.keyCode === SPACE_BAR) player.fire();
};

const rectOf = (el: Element) => {
    return el.getBoundingClientRect();
};

const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const renderInvaders = () => {
    [...columns].forEach((col: Element) => {
        col.innerHTML = '<div class="invader"></div>'.repeat(5);
    });
    invaders = Array.from(document.getElementsByClassName('invader'));
};

const renderPlayer = () => {
    (document.getElementById('player-zone') as HTMLElement).appendChild(player.html()) // prettier-ignore
};

(() => {
    const drawGame = () => {
        renderInvaders();
        renderPlayer();
        update();
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('load', drawGame);
})();

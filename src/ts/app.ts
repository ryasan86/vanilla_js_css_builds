import { Rect } from './types';
import {
    LEFT_ARROW,
    RIGHT_ARROW,
    DOWN_ARROW,
    SPACE_BAR,
    SHIP_WIDTH
} from './constants';

const player = document.getElementById('player') as HTMLElement;
const ammo = document.getElementById('ammo') as HTMLElement;
const columns = document.getElementsByClassName('invaders__col');

let invaders: Element[], reqID = 0, xDir = 500; // prettier-ignore

const actions = {
    moveLeft: () => {
        actions.stopMoving();
        player.style.left = (xDir -= 5) + 'px';
        reqID = requestAnimationFrame(actions.moveLeft);
        if (player.offsetLeft <= 0) actions.stopMoving();
    },
    moveRight: () => {
        actions.stopMoving();
        player.style.left = (xDir += 5) + 'px';
        reqID = requestAnimationFrame(actions.moveRight);
        if (player.offsetLeft >= 1010) actions.stopMoving();
    },
    stopMoving: () => cancelAnimationFrame(reqID),
    fire: () => {
        actions.addBullet();
        const bullet = ammo.firstElementChild as HTMLElement;
        const timer = setInterval(frame, 5);
        let yDir = 0;
        bullet.style.left = `${rect(player).x - SHIP_WIDTH}px`;

        function frame () {
            if (yDir > -800) bullet.style.top = `${(yDir -= 2)}px`;
            else clearInterval(timer);
        }
    },
    addBullet: () => {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        // bullet.style.left = `${rect(player).x - SHIP_WIDTH}px`;
        ammo.appendChild(bullet);
    }
};

const collision = (r1: Rect, r2: Rect) => {
    return (
        r1.x + r1.width >= r2.x &&
        r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height
    );
};

const rect = (el: Element) => el.getBoundingClientRect();

const drawInvaders = () => {
    Array.from(columns).forEach((col: Element) => {
        col.innerHTML = '<div class="invader"></div>'.repeat(5);
    });
    invaders = Array.from(document.getElementsByClassName('invader'));
};

const onKeydown = (e: KeyboardEvent) => {
    if (e.keyCode === LEFT_ARROW) actions.moveLeft();
    if (e.keyCode === RIGHT_ARROW) actions.moveRight();
    if (e.keyCode === DOWN_ARROW) actions.stopMoving();
    if (e.keyCode === SPACE_BAR) actions.fire();
};

const detectCollisions = () => {
    const bullet = ammo.firstElementChild;

    if (bullet) {
        for (const invader of invaders) {
            // for (const bullet of ammo.children) {
            if (collision(rect(bullet), rect(invader))) {
                bullet.remove();
                invader.remove();
            }
            // }
        }
    }
    requestAnimationFrame(detectCollisions);
};

(() => {
    const docReady = () => {
        drawInvaders();
        detectCollisions();
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('load', docReady);
})();

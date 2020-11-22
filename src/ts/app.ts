import { Rect, Observer } from './types';
import {
    LEFT_ARROW,
    RIGHT_ARROW,
    DOWN_ARROW,
    SPACE_BAR,
    SHIP_WIDTH
} from './constants';

let invaders: Element[];
const player = document.getElementById('player') as HTMLElement;
const bulletList = document.getElementById('bullet-list') as HTMLElement;
const columns = document.getElementsByClassName('invaders__col');

const Observer = (() => {
    const observerList: Observer[] = [];
    const add = (...args: Observer[]) => observerList.push(...args);
    const notify = (ctx: any) => observerList.forEach(observerFn => observerFn(ctx)); // prettier-ignore
    return { add, notify };
})();

const State = (() => ({
    direction: null as string | null,
    reqId: null as number | null,
    xDir: 500 as number
}))();

const Actions = (() => ({
    changeDirection: ({ direction }: { direction: string }) => (State.direction = direction), // prettier-ignore
    stopMoveAnimation: () => cancelAnimationFrame(State.reqId || 0),
    startMoveAnimation: () => {
        Actions.stopMoveAnimation();
        if (State.direction === 'left') State.xDir -= 5;
        if (State.direction === 'right') State.xDir += 5;

        player.style.left = State.xDir + 'px';

        if (player.offsetLeft <= 0 || player.offsetLeft >= 1010) Actions.stopMoveAnimation(); // prettier-ignore
        else State.reqId = requestAnimationFrame(Actions.startMoveAnimation);
    },
    fire: () => {
        Actions.addBullet();
        const bullet = bulletList.firstElementChild as HTMLElement;
        const timer = setInterval(frame, 5);
        const xDir = rect(player).x - SHIP_WIDTH;
        let yDir = 0;
        bullet.style.left = xDir + 'px';

        function frame () {
            if (yDir > -800) bullet.style.top = (yDir -= 2) + 'px';
            else clearInterval(timer);
        }
    },
    addBullet: () => {
        const div = document.createElement('div');
        div.classList.add('bullet');
        bulletList.appendChild(div);
    }
}))();

const collision = (r1: Rect, r2: Rect) => {
    return (
        r1.x + r1.width >= r2.x &&
        r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height
    );
};

const rect = (el: Element) => {
    const { x, y, height, width } = el.getBoundingClientRect();
    return { x, y, height, width };
};

const renderInvaders = () => {
    Array.from(columns).forEach((col: Element) => {
        col.innerHTML = '<div class="invader"></div>'.repeat(5);
    });
};

Observer.add(Actions.changeDirection, Actions.startMoveAnimation);

(() => {
    const onKeydown = (e: KeyboardEvent) => {
        if (e.keyCode === LEFT_ARROW) Observer.notify({ direction: 'left' });
        if (e.keyCode === RIGHT_ARROW) Observer.notify({ direction: 'right' });
        if (e.keyCode === DOWN_ARROW) Actions.stopMoveAnimation();
        if (e.keyCode === SPACE_BAR) Actions.fire();
    };

    const detectCollisions = () => {
        const bullet = bulletList.firstElementChild;
        if (bullet) {
            for (let i = 0; i < invaders.length; i++) {
                const invader = invaders[i];
                if (collision(rect(bullet), rect(invader))) {
                    bullet.remove();
                    invader.remove();
                }
            }
        }
        requestAnimationFrame(detectCollisions);
    };

    const docReady = () => {
        renderInvaders();
        invaders = Array.from(document.getElementsByClassName('invader'));
        detectCollisions();
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('load', docReady);
})();

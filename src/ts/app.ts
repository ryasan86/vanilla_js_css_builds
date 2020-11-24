import 'regenerator-runtime/runtime';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const SPACE_BAR = 32;

// const SHIP_WIDTH = 90;
// const SHIP_HEIGHT = 50;
const BULLET_WIDTH = 6;

let invaders: HTMLCollection,
    columns: HTMLCollection,
    earth: HTMLElement,
    gun: HTMLElement,
    score: HTMLElement,
    player: Player,
    matrix: Invader[][];

interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}

class Player {
    lives = 3;
    score = 0;
    xDir = 500;
    moveID = 0;
    player = document.createElement('div');

    constructor () {
        this.player.id = 'player';
    }

    moveLeft = (): void => {
        this.stopMoving();
        this.player.style.left = `${(this.xDir -= 5)}px`;
        if (this.player.offsetLeft <= 0) this.stopMoving();
        else this.moveID = requestAnimationFrame(this.moveLeft);
    };

    moveRight = (): void => {
        this.stopMoving();
        this.player.style.left = `${(this.xDir += 5)}px`;
        if (this.player.offsetLeft >= 1010) this.stopMoving();
        else this.moveID = requestAnimationFrame(this.moveRight);
    };

    stopMoving = (): void => {
        if (this.moveID) cancelAnimationFrame(this.moveID);
    };

    scorePoints = async (): Promise<void> => {
        for (let i = 1; i <= 10; i++) {
            this.score++;
            score.textContent = this.score.toString();
            await sleep(25);
        }
    };

    fire = (): void => {
        const x = this.player.offsetLeft + (this.player.offsetWidth / 2) - (BULLET_WIDTH / 2); // prettier-ignore
        gun.innerHTML += `<div class="bullet" style="top: 0; left: ${x}px;"></div>`;
    };

    query = (): HTMLElement | null => {
        return document.getElementById('player');
    };

    html = (): HTMLElement => {
        return this.player;
    };
}

class Invader {
    invader = document.createElement('div');

    constructor () {
        this.invader.className = 'invader';
        this.invader.addEventListener('click', this.fire);
    }

    fire = (): void => {
        const x = (this.invader.offsetWidth / 2) - (BULLET_WIDTH / 2); // prettier-ignore
        this.invader.innerHTML = `<div class="bullet" style="bottom: 0; left: ${x}px;"></div>`;
    };

    html (): HTMLElement {
        return this.invader;
    }
}

const updateOften = (): void => {
    if (gun.children.length) {
        [...gun.children].forEach((bullet: any) => {
            bullet.style.top = `${bullet.offsetTop - 5}px`;
            checkIfInvaderIsHit(bullet);
        });
    }

    bottomInvaders().forEach((invader: any) => {
        if (invader.children.length) {
            [...invader.children].forEach((bullet: any) => {
                bullet.style.top = `${bullet.offsetTop + 5}px`;
                checkIfPlayerIsHit(bullet);
            });
        }
    });

    requestAnimationFrame(updateOften);
};

const checkIfPlayerIsHit = async (bullet: HTMLElement): Promise<void> => {
    const p = player.query();

    if (p && checkCollision(rectOf(bullet), rectOf(p))) {
        bullet.remove();
        p.remove();
    }
    if (bullet.offsetTop >= earth.offsetHeight) {
        console.log('bullet removed');
        bullet.remove();
    }
};

const checkIfInvaderIsHit = async (bullet: HTMLElement): Promise<void> => {
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

const checkCollision = (r1: Rect, r2: Rect): boolean => {
    return !!(
        r2.width &&
        r1.x + r1.width >= r2.x &&
        r1.x <= r2.x + r2.width &&
        r1.y + r1.height >= r2.y &&
        r1.y <= r2.y + r2.height
    );
};

const onKeydown = (e: KeyboardEvent): void => {
    if (e.keyCode === LEFT_ARROW) player.moveLeft();
    if (e.keyCode === RIGHT_ARROW) player.moveRight();
    if (e.keyCode === DOWN_ARROW) player.stopMoving();
    if (e.keyCode === SPACE_BAR) player.fire();
};

const rectOf = (el: Element): Rect => {
    return el.getBoundingClientRect();
};

const sleep = (ms = 0): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const bottomInvaders = () => {
    return [...columns].map(col => col.lastElementChild);
};

const renderContainer = (): void => {
    document.body.innerHTML = `
        <div id="container">
            <div id="earth">
                <div id="header">
                    <div id="score">
                        <span>SCORE:</span>&nbsp;<span id="score-count">0</span>
                    </div>
                    <div id="lives">
                        <span>LIVES:</span>
                        <ul class="lives-count"></ul>
                    </div>
                </div>

                <div id="earth">
                    <ul id="invader-columns">
                        ${`<li class="invaders-col"></li>`.repeat(11)}
                    </ul>
                    <div id="player-zone">
                        <div id="gun"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

const renderInvaders = (): void => {
    columns = document.getElementsByClassName('invaders-col' ) as HTMLCollection; // prettier-ignore

    matrix = [...columns].map(() => {
        return Array.from({ length: 5 }).map(() => new Invader());
    });

    [...columns].forEach((col: Element, i: number) => {
        matrix[i].forEach(invader => col.appendChild(invader.html()));
    });
};

const renderPlayer = (): void => {
    (document.getElementById('player-zone') as HTMLElement).appendChild(player.html()) // prettier-ignore
};

const queryElements = (): void => {
    earth = document.getElementById('earth') as HTMLElement;
    invaders = document.getElementsByClassName('invader') as HTMLCollection;
    gun = document.getElementById('gun') as HTMLElement;
    score = document.getElementById('score-count') as HTMLElement;
};

(() => {
    const drawGame = () => {
        player = new Player();
        renderContainer();
        renderInvaders();
        renderPlayer();
        queryElements();

        updateOften();
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('load', drawGame);
})();

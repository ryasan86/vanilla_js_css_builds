import 'regenerator-runtime/runtime';

import Player from './player';
import Invaders from './invaders';
import State from './state';

// prettier-ignore
const LEFT_ARROW = 37,
      RIGHT_ARROW = 39,
      DOWN_ARROW = 40,
      SPACE_BAR = 32,
      SHIP_WIDTH = 90,
      BULLET_WIDTH = 6;

// prettier-ignore
export let player: Player,
           invaders: Invaders,
           columns: HTMLCollection,
           earth: HTMLElement,
           state: State;

export const center = (SHIP_WIDTH / 2) - (BULLET_WIDTH / 2); // prettier-ignore

const onKeydown = (e: KeyboardEvent): void => {
    if (e.keyCode === LEFT_ARROW) player.moveLeft();
    if (e.keyCode === RIGHT_ARROW) player.moveRight();
    if (e.keyCode === DOWN_ARROW) player.stopMoving();
    if (e.keyCode === SPACE_BAR) player.fire();
};

const initHTML = () => {
    document.body.innerHTML = `
        <div id="container">
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
                <ul id="invader-column-list">
                    ${`<li class="invader-column"></li>`.repeat(11)}
                </ul>
                <div id="player-zone">
                    <div id="gun"></div>
                </div>
            </div>
        </div>
    `;

    earth = document.getElementById('earth') as HTMLElement;
    columns = document.getElementsByClassName('invader-column') as HTMLCollection; // prettier-ignore
};

const loadGame = () => {
    initHTML();

    state = new State();

    invaders = new Invaders();
    invaders.render();
    invaders.update();

    player = new Player();
    player.render();
    player.update();

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('blur', () => state.setPause(true));
    window.addEventListener('focus', () => state.setPause(false));
};

window.addEventListener('load', loadGame);

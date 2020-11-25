import { columns, state, ROW_LENGTH, COLUMN_LENGTH } from './app';
import { random } from './utils';
import Invader from './invader';

export let invaderElements: HTMLCollection;
export let interval: number;

const speed = {
    slow: 1500,
    normal: 1000,
    fast: 500
};

const createMatrix = () => {
    const matrix: any[] = [];
    let arr;

    for (let i = 0; i < COLUMN_LENGTH - 1; i++) {
        arr = [];

        for (let j = 0; j < ROW_LENGTH; j++) {
            arr.push(new Invader(i, j));
        }

        matrix.push(arr);
    }

    return matrix;
};

class Invaders {
    matrix = createMatrix();

    updateBottom = (): any[] => {
        return this.matrix.map(column => {
            return column[ROW_LENGTH - 1];
        });
    };

    randomAttack = (): void => {
        if (!state.isPaused) {
            const bottomInvaders: Invader[] = this.updateBottom();
            bottomInvaders[random(0, COLUMN_LENGTH - 2)].fire();
        }
    };

    update = (): void => {
        setInterval(this.randomAttack, speed.normal);
    };

    render = (): void => {
        const cols = [...columns].slice(0, -1);

        this.matrix.forEach((invaders, i) => {
            const children = invaders.map((invader: Invader) => {
                return invader.render();
            });

            cols[i].append(...children);
        });
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

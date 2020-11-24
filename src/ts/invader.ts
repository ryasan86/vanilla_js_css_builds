class Invader {
    invader = document.createElement('div');

    constructor () {
        this.invader.className = 'invader';
    }

    html (): HTMLElement {
        return this.invader;
    }
}

export default Invader;

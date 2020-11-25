class Invader {
    id: string;
    invader: HTMLElement;
    node = document.createElement('div')

    constructor (id: number) {
        this.id = `invader-${id}`;
        this.invader = document.getElementById(this.id) as HTMLElement;
    }
}

export default Invader;

const player = () => document.querySelector('#invaders__player');

const Observer = (() => {
    const observerList = [];
    const add = (...args) => observerList.push(...args);
    const removeAt = idx => observerList.splice(idx, 1);
    const notify = ctx => observerList.forEach(observerFn => observerFn(ctx));
    return { add, removeAt, notify };
})();

const State = (() => ({
    pos: 500,
    changeDirection: ({ direction }) => {
        const elem = player();
        const id = setInterval(frame, 5);

        function frame () {
            if (
                (State.pos === 0 && direction === 'left') ||
                (State.pos === 1000 && direction === 'right')
            ) {
                clearInterval(id);
            } else {
                const pos = direction === 'left' ? State.pos-- : State.pos++;
                elem.style.left = pos + 'px';
            }
        }
    }
}))();

Observer.add(State.changeDirection);

(() => {
    const onKeydown = e => {
        if (e.keyCode === 37) Observer.notify({ direction: 'left' });
        if (e.keyCode === 39) Observer.notify({ direction: 'right' });
    };

    const initApp = () => {
        window.addEventListener('keydown', onKeydown);
    };

    initApp();
})();

const player = document.querySelector('#invaders__player');
const columns = Array.from(document.querySelectorAll('.invaders__col'));
let reqId;

const getPositionInfo = element => {
    const { left, top, height, width } = element.getBoundingClientRect();
    return { left, top, height, width };
};

const fire = () => {
    player.innerHTML = `<div class="bullet"></div>`;
    const timer = setInterval(frame, 5);
    const bullet = player.firstElementChild;
    let pos = 0;

    function frame () {
        if (pos > -100) bullet.style.top = --pos + 'vh';
        else clearInterval(timer);
    }
};

const Observer = (() => {
    const observerList = [];
    const add = (...args) => observerList.push(...args);
    const notify = ctx => observerList.forEach(observerFn => observerFn(ctx));
    return { add, notify };
})();

const Actions = (() => ({
    direction: null,
    pos: 500,
    changeDirection: ({ direction }) => (Actions.direction = direction),
    move: () => {
        const frame = Actions.direction === 'left' ? frameLeft : frameRight;
        const timer = setInterval(frame, 5);

        function frameLeft () {
            if (Actions.pos > 0 && Actions.direction === 'left') {
                player.style.left = (Actions.pos -= 2) + 'px';
            } else clearInterval(timer);
        }
        function frameRight () {
            if (Actions.pos < 1000 && Actions.direction === 'right') {
                player.style.left = (Actions.pos += 2) + 'px';
            } else clearInterval(timer);
        }
    }
}))();

Observer.add(Actions.changeDirection, Actions.move);

(() => {
    const onKeydown = e => {
        if (e.keyCode === 37 && Actions.direction !== 'left')
            Observer.notify({ direction: 'left' });
        if (e.keyCode === 39 && Actions.direction !== 'right')
            Observer.notify({ direction: 'right' });
        if (e.keyCode === 32) fire();
    };

    const initEventListeners = () => {
        window.addEventListener('keydown', onKeydown);
    };

    const initInvaderColumns = () => {
        columns.forEach(col => {
            col.innerHTML = `<div class="invader"></div>`;
        });
    };

    const initApp = () => {
        initInvaderColumns();
        initEventListeners();
        const el6 = document.querySelector('.invaders__col--6').firstElementChild; // prettier-ignore
        console.log('ALIEN', getPositionInfo(el6));
    };

    initApp();
})();

const player = document.querySelector('#invaders__player');
const columns = Array.from(document.querySelectorAll('.invaders__col'));

const Utils = (() => ({
    getPositionInfo: element => {
        const { left, top, height, width } = element.getBoundingClientRect();
        return { left, top, height, width };
    }
}))();

const Fire = (() => ({
    start: () => {
        player.innerHTML = '<div class="bullet"></div>';
        const bullet = player.firstElementChild;
        const timer = setInterval(frame, 5);
        let pos = 0;

        function frame () {
            if (pos > -100) bullet.style.top = --pos + 'vh';
            else Fire.stop(timer);
        }
    },
    stop: timer => {
        player.innerHTML = '';
        clearInterval(timer);
    }
}))();

const Observer = (() => {
    const observerList = [];

    return {
        add: (...args) => observerList.push(...args),
        notify: ctx => observerList.forEach(observerFn => observerFn(ctx))
    };
})();

let reqId;

const Actions = (() => ({
    direction: null,
    pos: 500,
    changeDirection: ({ direction }) => (Actions.direction = direction),
    startAnimation: () => {
        Actions.stopAnimation();

        if (Actions.direction === 'left') {
            player.style.left = (player.offsetLeft -= 5) + 'px';
        } else if (Actions.direction === 'right') {
            player.style.left = (player.offsetLeft += 5) + 'px';
        }

        reqId = requestAnimationFrame(Actions.startAnimation);

        if (player.offsetLeft <= 0 || player.offsetLeft >= 1000) {
            Actions.stopAnimation();
        }
    },
    stopAnimation: () => {
        cancelAnimationFrame(reqId);
    }
}))();

Observer.add(Actions.changeDirection, Actions.startAnimation);

(() => {
    const onMovePlayer = e => {
        if (e.keyCode === 37) Observer.notify({ direction: 'left' });
        if (e.keyCode === 39) Observer.notify({ direction: 'right' });
    };

    const onFire = e => {
        if (e.keyCode === 32) Fire.start();
    };

    window.addEventListener('keydown', onMovePlayer);
    window.addEventListener('keydown', onFire);

    columns.forEach(col => {
        col.innerHTML = `<div class="invader"></div>`;
    });
})();

var reqId, dir;
var p, t, pw, ph, px, py, tw, th, tx, ty;

function detectCollisions () {
    for (let i = 0; i < t.length; i++) {
        pw = p.offsetWidth;
        ph = p.offsetHeight;
        px = p.offsetLeft;
        py = p.offsetTop;
        tw = t[i].offsetWidth;
        th = t[i].offsetHeight;
        tx = t[i].offsetLeft;
        ty = t[i].offsetTop;
        console.log(pw, ph, px, py);
        console.log(tw, th, tx, ty);

        if (px + pw > tx && px < tx + tw && py + ph > ty && py < ty + th) {
            console.log('Collision detected with ' + t[i].id);
            document.body.removeChild(t[i]);
        }
    }
    window.requestAnimationFrame(detectCollisions);
}

const Fire = (() => ({
    start: () => {
        p.innerHTML = '<div class="bullet"></div>';
        const bullet = p.firstElementChild;
        const timer = setInterval(frame, 5);
        let pos = 0;

        function frame () {
            if (pos > -800) p.style.top = --pos + 'px';
            else Fire.stop(timer);
        }
    },
    stop: timer => clearInterval(timer)
}))();

const Observer = (() => {
    const observerList = [];

    return {
        add: (...args) => observerList.push(...args),
        notify: ctx => observerList.forEach(observerFn => observerFn(ctx))
    };
})();

const Actions = (() => ({
    direction: null,
    pos: 500,
    changeDirection: ({ direction }) => (Actions.direction = direction),
    stopAnimation: () => cancelAnimationFrame(reqId),
    startAnimation: () => {
        Actions.stopAnimation();

        if (Actions.direction === 'left')
            p.style.left = (p.offsetLeft -= 5) + 'px';

        if (Actions.direction === 'right')
            p.style.left = (p.offsetLeft += 5) + 'px';

        reqId = requestAnimationFrame(Actions.startAnimation);

        if (p.offsetLeft <= 0 || p.offsetLeft >= 1000) Actions.stopAnimation();
    }
}))();

Observer.add(Actions.changeDirection, Actions.startAnimation);

(() => {
    const onKeydown = e => {
        if (e.keyCode === 37) Observer.notify({ direction: 'left' });
        if (e.keyCode === 39) Observer.notify({ direction: 'right' });
        if (e.keyCode === 40) Actions.stopAnimation();
        if (e.keyCode === 32) Fire.start();
    };

    Array.from(document.querySelectorAll('.invaders__col')).forEach(
        (col, i) => {
            if (i === 5) col.innerHTML = `<div class="invader"></div>`;
        }
    );

    const docReady = () => {
        p = document.querySelector('#player');
        t = document.querySelector('.invader');

        detectCollisions();
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('load', docReady);
})();

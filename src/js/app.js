let reqId;
let p, t, t6, pw, ph, px, py, tw, th, tx, ty;
let b, bw, bh, bx, by;

const Utils = (() => ({
    getRect: element => {
        console.log(element.getBoundingClientRect)
        const { left, top, height, width } = element.getBoundingClientRect();
        return { left, top, height, width };
    },
    detectCollisions: () => {
        const b = p.firstElementChild;

        if (b) {
            for (let i = 0; i < t.length; i++) {
                bw = b.offsetWidth;
                bh = b.offsetHeight;
                bx = b.offsetLeft;
                by = b.offsetTop;
                tw = t[i].offsetWidth;
                th = t[i].offsetHeight;
                tx = t[i].offsetLeft;
                ty = t[i].offsetTop;

                if (i === 0) {
                    // console.log('t', Utils.getRect(t));
                    // console.log('b', Utils.getRect(b));
                    // console.log('alien-->', tw, th, tx, ty);
                    console.log('bullet-->', bw, bh, bx, by);
                }

                if (
                    bx + bw > tx &&
                    bx < tx + tw &&
                    by + bh > ty &&
                    by < ty + th
                ) {
                    // Do anything you want in the program when collision is detected
                    console.log('Collision detected with ' + t[i].class);
                    document.body.removeChild(t[i]);
                }
            }
        }
        requestAnimationFrame(Utils.detectCollisions);
    }
}))();

const Fire = (() => ({
    start: () => {
        p.innerHTML = '<div class="bullet"></div>';
        const bullet = p.firstElementChild;
        const timer = setInterval(frame, 5);
        let pos = 0;

        function frame () {
            if (pos > -100) bullet.style.top = --pos + 'vh';
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
        p = document.getElementById('player');
        t = document.getElementsByClassName('invader');
        t6 = document.querySelector(`.invaders__col--6`);
        // console.log('player: ', Utils.getRect(p));
        // console.log('alien', Utils.getRect(t6));

        Utils.detectCollisions();
    };

    window.addEventListener('keydown', onKeydown);
    window.addEventListener('load', docReady);
})();

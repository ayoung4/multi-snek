import * as connect from 'socket.io-client';

import { MOVE, UPDATE, INTERVAL } from 'Shared/constants';
import { render } from './render';
import { step, setDir } from 'Shared/game/store';
import { store, update } from './store';

const sketch = render(store);

const socket = connect('http://localhost:3000');

// const loop = (t1) => (t2) =>
//     t2 - t1 > INTERVAL
//         ? store.dispatch(step()) && window.requestAnimationFrame(loop(t2))
//         : window.requestAnimationFrame(loop(t1));

sketch.keyPressed = function () {
    if (sketch.keyCode === sketch.LEFT_ARROW) {
        store.dispatch(setDir('0', [-1, 0]));
        socket.emit(MOVE, [-1, 0]);
    } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
        store.dispatch(setDir('0', [1, 0]));
        socket.emit(MOVE, [1, 0]);
    } else if (sketch.keyCode === sketch.UP_ARROW) {
        store.dispatch(setDir('0', [0, -1]));
        socket.emit(MOVE, [0, -1]);
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
        store.dispatch(setDir('0', [0, 1]));
        socket.emit(MOVE, [0, 1]);
    }
};

socket.on(UPDATE, (state) => store.dispatch(update(state)));

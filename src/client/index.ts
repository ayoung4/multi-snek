import * as connect from 'socket.io-client';

import { MOVE, UPDATE } from 'Shared/constants';
import { render } from './render';
import { store, update } from './client-store';

const sketch = render(store);

const socket = connect('http://localhost:3000');

sketch.keyPressed = function () {
    if (sketch.keyCode === sketch.LEFT_ARROW) {
        socket.emit(MOVE, [-1, 0]);
    } else if (sketch.keyCode === sketch.RIGHT_ARROW) {
        socket.emit(MOVE, [1, 0]);
    } else if (sketch.keyCode === sketch.UP_ARROW) {
        socket.emit(MOVE, [0, -1]);
    } else if (sketch.keyCode === sketch.DOWN_ARROW) {
        socket.emit(MOVE, [0, 1]);
    }
};

socket.on(UPDATE, (state) => store.dispatch(update(state)));

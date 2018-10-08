import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';

import { MOVE, UPDATE, DISCONNECT } from 'Shared/constants';

import { store, step, setDir, addSnake, removeSnake } from 'Shared/game/store';

const app = express();

const server = new http.Server(app);
const io = socketIO(server);
const PORT = 3000;

app.use(express.static(__dirname + '/public/'));

let joins = 0;

setInterval(() => {
    store.dispatch(step());
}, 500);

io.on('connection', (socket) => {

    const id = String(joins++);

    store.dispatch(addSnake(id))
    
    const updateLoop = setInterval(() => {
        socket.emit(UPDATE, store.getState());
    }, 500);

    socket.on(MOVE, (dir) => store.dispatch(setDir(id, dir)));

    socket.on(DISCONNECT, () => {
        updateLoop.unref();
        store.dispatch(removeSnake(id));
    });

});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));

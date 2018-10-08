import * as express from 'express';
import * as http from 'http';
import * as socketIO from 'socket.io';

import { MOVE, UPDATE, DISCONNECT, INTERVAL } from 'Shared/constants';

import { step, setDir, addSnake, removeSnake } from 'Shared/game/store';
import { store } from './store';

const app = express();

const server = new http.Server(app);
const io = socketIO(server);
const PORT = 3000;

app.use(express.static(__dirname + '/public/'));

let currentPlayers = 0;
let gameLoop: NodeJS.Timer;

io.on('connection', (socket) => {

    if (currentPlayers === 0) {

        gameLoop = setInterval(() => {
            store.dispatch(step());
        }, INTERVAL);

    }

    const id = String(currentPlayers++);

    store.dispatch(addSnake(id))

    const updateLoop = setInterval(() => {
        socket.emit(UPDATE, store.getState());
    }, INTERVAL);

    socket.on(MOVE, (dir) => store.dispatch(setDir(id, dir)));

    socket.on(DISCONNECT, () => {

        updateLoop.unref();
        clearInterval(updateLoop);
        store.dispatch(removeSnake(id));
        currentPlayers--;

        if (currentPlayers === 0) {

            gameLoop.unref();
            clearInterval(gameLoop);

        }

    });

});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));

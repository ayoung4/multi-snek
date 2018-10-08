import * as redux from 'redux';

import { Vector } from 'Shared/game/vector';
import { Snake } from 'Shared/game/snake';

enum ActionTypes {
    UPDATE = 'client/update',
}

export const update = (state: Snake.IGameState) => ({
    type: ActionTypes.UPDATE,
    payload: state,
});

const reducer: redux.Reducer<Snake.IGameState> =
    (state = Snake.randomState(), { type, payload }) =>
        type === ActionTypes.UPDATE
            ? payload
            : state;

export const store = redux.createStore(
    reducer,
);
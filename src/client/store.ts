import * as redux from 'redux';

import { Snake } from 'Shared/game/snake';
import { matchReducer } from 'Shared/matchReducer';

enum ActionTypes {
    UPDATE = 'client/update',
}

export const update = (state: Snake.IGameState) => ({
    type: ActionTypes.UPDATE,
    payload: state,
});

const socketUpdate: redux.Reducer<Snake.IGameState> =
    (state, { type, payload }) =>
        type === ActionTypes.UPDATE
            ? payload
            : state;

export const store = redux.createStore(
    matchReducer({
        [ActionTypes.UPDATE]: socketUpdate,
    }),
);
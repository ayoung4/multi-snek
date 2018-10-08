import * as redux from 'redux';
import * as R from 'ramda';

import { Vector } from './vector';
import { Snake } from './snake';

enum ActionTypes {
    SET_DIR = 'snake/set-direction',
    ADD_SNAKE = 'snake/add',
    REMOVE_SNAKE = 'snake/remove',
    STEP = 'game/step',
}

export const step = () => ({
    type: ActionTypes.STEP,
    payload: null,
});

export const setDir = (id: string, dir: Vector) => ({
    type: ActionTypes.SET_DIR,
    payload: {
        id,
        dir,
    },
});

export const addSnake = (id: string) => ({
    type: ActionTypes.ADD_SNAKE,
    payload: {
        id,
    },
});

export const removeSnake = (id: string) => ({
    type: ActionTypes.REMOVE_SNAKE,
    payload: {
        id,
    },
});

type ReducerMap = {
    [key in ActionTypes]: redux.Reducer<Snake.IGameState>;
};

const reducers: ReducerMap = {
    [ActionTypes.SET_DIR]: ({ snakes, ...rest }, { payload }) => ({
        ...rest,
        snakes: R.map(
            ({ id, dir, ...rest }) =>
                id === payload.id
                    ? { id, dir: payload.dir, ...rest }
                    : { id, dir, ...rest },
            snakes,
        ),
    }),
    [ActionTypes.ADD_SNAKE]: ({ snakes, ...rest }, { payload }) => ({
        ...rest,
        snakes: [
            ...snakes,
            { id: payload.id, body: [Vector.random()], dir: [0, 1] },
        ],
    }),
    [ActionTypes.REMOVE_SNAKE]: ({ snakes, ...rest }, { payload }) => ({
        ...rest,
        snakes: R.filter(({ id }) => id !== payload.id, snakes),
    }),
    [ActionTypes.STEP]: Snake.step,
};

type MapReducer = (rm: ReducerMap) => redux.Reducer<Snake.IGameState>

const matchReducer: MapReducer
    = (rm) =>
        (state = Snake.randomState(), { type, payload }) =>
            !!rm[type]
                ? rm[type](state, { type, payload })
                : state;

const reducer = matchReducer(reducers);

export const store = redux.createStore(
    reducer,
);
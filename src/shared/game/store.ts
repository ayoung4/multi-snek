import * as redux from 'redux';
import * as R from 'ramda';
import * as _ from 'lodash';

import { Vector } from './vector';
import { Snake } from './snake';
import { ReducerMap, matchReducer } from '../matchReducer';

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

const randomColors = () => {
    const x = _.random(0, 1, true);
    if (x > 0.66) {
        const color = _.random(0, 100);
        return [color, color];
    } else if (x > 0.33) {
        const color = _.random(10, 100);
        return [color, color - 10];
    } else {
        const color = _.random(0, 100);
        return [color, 100 - color];
    }
};

export const reducers: ReducerMap = {
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
            {
                id: payload.id,
                body: [Vector.random()],
                dir: [0, 1],
                colors: randomColors(),
            },
        ],
    }),
    [ActionTypes.REMOVE_SNAKE]: ({ snakes, ...rest }, { payload }) => ({
        ...rest,
        snakes: R.filter(
            ({ id }) => id !== payload.id,
            snakes,
        ),
    }),
    [ActionTypes.STEP]: Snake.step,
};

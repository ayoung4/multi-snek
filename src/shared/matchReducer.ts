import * as redux from 'redux';

import { Snake } from './game/snake';

export type ReducerMap = {
    [key: string]: redux.Reducer<Snake.IGameState>;
};

type MatchReducer = (rm: ReducerMap) => redux.Reducer<Snake.IGameState>

export const matchReducer: MatchReducer
    = (rm) =>
        (state = Snake.emptyState, { type, payload }) =>
            !!rm[type]
                ? rm[type](state, { type, payload })
                : state;
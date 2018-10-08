import * as redux from 'redux';

import { matchReducer } from 'Shared/matchReducer';
import { reducers } from 'Shared/game/store';

export const store = redux.createStore(
    matchReducer(reducers),
);

import * as _ from 'lodash';

import { WIDTH, HEIGHT } from './constants';

export type Vector = [number, number];

export module Vector {

    export const of: (x: number, y: number) => Vector =
        (x, y) => [x, y];

    export const random: () => Vector =
        () => of(
            _.random(1, WIDTH - 1),
            _.random(1, HEIGHT - 1),
        );

    export const add: (v1: Vector, v2: Vector) => Vector =
        ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2];

    export const equals: (v1: Vector, v2: Vector) => boolean =
        ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;

    const wrapper =
        (n: number) =>
            (x: number) =>
                x < 0
                    ? n
                    : x % n;

    const wrapWidth = wrapper(WIDTH);
    const wrapHeight = wrapper(HEIGHT);

    export const wrap: (v: Vector) => Vector =
        ([x, y]) => of(
            wrapWidth(x),
            wrapHeight(y),
        );

}

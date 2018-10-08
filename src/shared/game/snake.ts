import * as R from 'ramda';

import { Vector } from './vector';

export module Snake {

    export interface ISnake {
        id: string;
        dir: Vector;
        body: Vector[];
    }

    export interface IGameState {
        snakes: ISnake[];
        food: Vector;
    }

    export const randomState: () => IGameState =
        () => ({
            snakes: [],
            food: Vector.random(),
        });

    const collides: (h: Vector, t: Vector[]) => boolean =
        (h, t) => R.reduce(
            (acc, v) => acc || Vector.equals(h, v),
            false,
            t,
        );

    const move = R.pipe(
        Vector.add,
        Vector.wrap,
    );

    const stepSnake =
        R.curry(
            (food: Vector, bodies: Vector[], { body: [h, ...t], dir, id }: ISnake) => {
                const newHead = move(dir, h);
                const eats = Vector.equals(newHead, food);
                return collides(newHead, bodies)
                    ? {
                        id,
                        dir,
                        body: [Vector.random()],
                    }
                    : {
                        id,
                        dir,
                        body: eats
                            ? [newHead, h, ...t]
                            : [newHead, ...R.dropLast(1, [h, ...t])],
                    };
            }
        );

    const concatBodies: (snakes: ISnake[]) => Vector[] =
        R.reduce(
            (acc, { body }) => R.concat(acc, body),
            [],
        );

    export const step: (state: IGameState) => IGameState =
        ({ snakes, food }) => {
            const bodies = concatBodies(snakes);
            return {
                snakes: R.map(
                    stepSnake(food, bodies),
                    snakes,
                ),
                food: collides(food, bodies)
                    ? Vector.random()
                    : food,
            }
        };

}

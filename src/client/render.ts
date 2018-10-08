import * as p5 from 'p5';
import * as R from 'ramda';
import * as redux from 'redux';

import { WIDTH, HEIGHT } from 'Shared/game/constants'
import { Snake } from 'Shared/game/snake';
import { Vector } from 'Shared/game/vector';

const DIM = 15;

export const render = (store: redux.Store<Snake.IGameState>) => new p5(function (sketch) {

    const drawTile = (r, g, b) => ([x, y]: Vector) => {
        sketch.fill(r, g, b);
        sketch.stroke(r - 20, g - 20, b - 20);
        sketch.rect(x * DIM, y * DIM, DIM, DIM);
    };

    const drawSnakeSegment = drawTile(60, 185, 60);

    const drawSnake: (snake: any) => any = R.forEach(drawSnakeSegment);

    const drawSnakes: (snake: any) => any = R.forEach(drawSnake);

    const drawFood = drawTile(185, 60, 60);

    sketch.setup = function () {
        sketch.createCanvas(WIDTH * DIM, HEIGHT * DIM);
        sketch.background(100);
        sketch.frameRate(20);
    };

    sketch.draw = function () {
        const { snakes, food } = store.getState();
        sketch.background(60);
        drawSnakes(
            R.map(
                R.prop('body'),
                snakes,
            )
        );
        drawFood(food);
    };

});

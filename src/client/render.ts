import * as p5 from 'p5';
import * as R from 'ramda';
import * as redux from 'redux';

import { WIDTH, HEIGHT } from 'Shared/game/constants'
import { Snake } from 'Shared/game/snake';
import { Vector } from 'Shared/game/vector';

const DIM = 25;

export const render = (store: redux.Store<Snake.IGameState>) => new p5(function (sketch) {

    const drawTile = (h, s, b) => ([x, y]: Vector) => {
        sketch.colorMode(sketch.HSB, 100);
        sketch.fill(h, s, b);
        sketch.stroke(h, s, b - 20);
        sketch.rect(x * DIM, y * DIM, DIM, DIM);
    };

    const drawSnake = ({ color, body }: Snake.ISnake) =>
        R.forEach(drawTile(color, 90, 80), body);

    const drawSnakes = R.forEach(drawSnake);

    const drawFood = drawTile(100, 100, 100);

    sketch.setup = function () {
        sketch.createCanvas(WIDTH * DIM, HEIGHT * DIM);
        sketch.background(0, 0, 20);
        sketch.frameRate(20);
    };

    sketch.draw = function () {
        const { snakes, food } = store.getState();
        sketch.background(0, 0, 20);
        drawSnakes(snakes);
        drawFood(food);
    };

});

import { SuqarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery'
import { createTeris } from './core/Tetris';
import { TerisRule } from './core/TerisRule';
import { Direction } from './core/types';

const teris = createTeris({ x: 3, y: 2 })

teris.squares.forEach(sq => {
    sq.viewer = new SuqarePageViewer(sq, $('#root'))
})

$('#down').click(() => {
    TerisRule.moveDirectly(teris, Direction.down)
})

$('#up').click(() => {
    TerisRule.move(teris, {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y - 1
    })
})

$('#right').click(() => {
    TerisRule.move(teris, Direction.right)
})

$('#left').click(() => {
    TerisRule.move(teris, Direction.left)
})

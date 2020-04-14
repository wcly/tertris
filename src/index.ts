import { Square } from './core/Square'
import { SuqarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery'
import { SquareGroup } from './core/SquareGroup';

const group = new SquareGroup([{ x: 0, y: -1 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 1 }], { x: 3, y: 2 }, '#fff')

group.squares.forEach(sq => {
    sq.viewer = new SuqarePageViewer(sq, $('#root'))
})

$('#down').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x,
        y: group.centerPoint.y + 1
    }
})

$('#up').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x,
        y: group.centerPoint.y - 1
    }
})

$('#right').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x + 1,
        y: group.centerPoint.y
    }
})

$('#left').click(() => {
    group.centerPoint = {
        x: group.centerPoint.x - 1,
        y: group.centerPoint.y
    }
})

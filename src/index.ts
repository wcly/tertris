import { SuqarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery'
import { createTeris } from './core/Tetris';

const tetris = createTeris({ x: 3, y: 2 })

tetris.squares.forEach(sq => {
    sq.viewer = new SuqarePageViewer(sq, $('#root'))
})

$('#down').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y + 1
    }
})

$('#up').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y - 1
    }
})

$('#right').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x + 1,
        y: tetris.centerPoint.y
    }
})

$('#left').click(() => {
    tetris.centerPoint = {
        x: tetris.centerPoint.x - 1,
        y: tetris.centerPoint.y
    }
})

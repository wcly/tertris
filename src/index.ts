import { Square } from './core/Square'
import { SuqarePageViewer } from './core/viewer/SquarePageViewer';
import $ from 'jquery'

const sq = new Square();
sq.viewer = new SuqarePageViewer(sq, $('#root'))

sq.color = 'red'
sq.point = {
    x: 4,
    y: 4,
}

$('#down').click(() => {
    sq.point = {
        x: sq.point.x,
        y: sq.point.y + 1
    }
})

$('#remove').click(() => {
    if (sq.viewer) {
        sq.viewer.remove()
    }
})

$('#add').click(() => {
    sq.viewer = new SuqarePageViewer(sq, $('#root'))
})
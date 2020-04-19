import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from 'jquery'

const g = new Game(new GamePageViewer());

$('#start').click(()=>{
    g.start();
})

$('#pause').click(()=>{
    g.pause();
})

$('#left').click(()=>{
    g.controlLeft();
})

$('#right').click(()=>{
    g.controlRight();
})

$('#down').click(()=>{
    g.controlDown();
})

$('#rotate').click(()=>{
    g.controlRotate();
})
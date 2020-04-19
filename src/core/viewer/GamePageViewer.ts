import { GameViewer } from "../types";
import { SquareGroup } from "../SquareGroup";
import { SuqarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'

export class GamePageViewer implements GameViewer {
    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer = new SuqarePageViewer(sq, $("#next"));
        })
    }

    switch(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer!.remove();
            sq.viewer = new SuqarePageViewer(sq, $("#panel"))
        })
    }
}
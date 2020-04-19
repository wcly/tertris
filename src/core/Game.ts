import { GameStatus, Direction, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Tetris";
import { TerisRule } from "./TerisRule";
import GameConfig from "./GameConfig";

export class Game {
    // 游戏状态
    private _gameStatus: GameStatus = GameStatus.init;
    // 当前玩家操作的方块
    private _curTeris?: SquareGroup;
    // 下一个方块
    private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
    // 计时器
    private _timer?: number;
    // 自动下落的间隔时间
    private _duration = 1000;

    constructor(private _viewer: GameViewer) {
        this.resetCetnerPoint(GameConfig.nextSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }

    /**
     * 游戏开始
     */
    start() {
        if (this._gameStatus === GameStatus.playing) {
            return;
        }
        this._gameStatus = GameStatus.playing;
        if (!this._curTeris) {
            // 给当前玩家操作的方块赋值
            this.switchTeris();
        }
        this.autoDrop();
    }

    /**
     * 游戏暂停
     */
    pause() {
        if (this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }

    controlLeft(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris, Direction.left)
        }
    }

    controlRight(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.move(this._curTeris, Direction.right)
        }
    }

    controlDown(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.moveDirectly(this._curTeris, Direction.down)
        }
    }

    controlRotate(){
        if(this._curTeris && this._gameStatus === GameStatus.playing){
            TerisRule.rotate(this._curTeris)
        }
    }

    /**
     * 方块自由下落
     */
    private autoDrop() {
        if (this._timer || this._gameStatus !== GameStatus.playing) {
            return;
        }
        this._timer = setInterval(() => {
            if (this._curTeris) {
                TerisRule.move(this._curTeris, Direction.down);
            }
        }, this._duration)
    }

    /**
     * 切换方块
     */
    private switchTeris() {
        this._curTeris = this._nextTeris;
        this.resetCetnerPoint(GameConfig.panelSize.width, this._nextTeris);
        this._nextTeris = createTeris({ x: 0, y: 0 })
        this.resetCetnerPoint(GameConfig.nextSize.width, this._nextTeris);
        this._viewer.switch(this._curTeris);
        this._viewer.showNext(this._nextTeris);
    }

    /**
     * 设置中心点坐标，让该方块出现在面板的中上方
     * @param width 面板的宽度
     * @param teris 方块
     */
    private resetCetnerPoint(width: number, teris: SquareGroup) {
        const x = Math.ceil(width / 2) - 1;
        const y = 0;
        teris.centerPoint = { x, y }
        while (teris.squares.some(it => it.point.y < 0)) {
            teris.squares.forEach(sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })
        }
    }
}
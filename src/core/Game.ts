import { GameStatus, Direction, GameViewer } from "./types";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Tetris";
import { TerisRule } from "./TerisRule";
import GameConfig from "./GameConfig";
import { Square } from "./Square";

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
    // 当前游戏中已存在的方块
    private _exists: Square[] = []
    // 积分
    private _score: number = 0

    constructor(private _viewer: GameViewer) {
        this.createNext()
    }

    /**
     * 创建下一个方块
     */
    private createNext() {
        this._nextTeris = createTeris({ x: 0, y: 0 });
        this.resetCetnerPoint(GameConfig.nextSize.width, this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }
    
    /**
     * 游戏初始化
     */
    private init() {
        this._exists.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove()
            }
        })
        this._exists = [];
        this.createNext();
        this._curTeris = undefined
        this._score = 0;
    }

    /**
     * 游戏开始
     */
    start() {
        // 改变游戏状态
        if (this._gameStatus === GameStatus.playing) {
            return;
        }
        // 游戏结束后重新开始
        if (this._gameStatus === GameStatus.over) {
            this.init()
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

    controlLeft() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, Direction.left, this._exists)
        }
    }

    controlRight() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris, Direction.right, this._exists)
        }
    }

    controlDown() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirectly(this._curTeris, Direction.down, this._exists)
            this.hitBottom();
        }
    }

    controlRotate() {
        if (this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris, this._exists)
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
                if (!TerisRule.move(this._curTeris, Direction.down, this._exists)) {
                    this.hitBottom()
                }
            }
        }, this._duration)
    }

    /**
     * 切换方块
     */
    private switchTeris() {
        this._curTeris = this._nextTeris;
        this._curTeris.squares.forEach(sq => {
            if (sq.viewer) {
                sq.viewer.remove();
            }
        })
        this.resetCetnerPoint(GameConfig.panelSize.width, this._nextTeris);
        // 游戏结束
        if (!TerisRule.canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)) {
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer)
            this._timer = undefined;
            return
        }
        this._viewer.switch(this._curTeris);
        this.createNext()
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
            teris.centerPoint = {
                x: teris.centerPoint.x,
                y: teris.centerPoint.y + 1
            }
        }
    }

    /**
     * 触底操作
     */
    private hitBottom() {
        // 存入当前方块
        this._exists.push(...this._curTeris!.squares);
        // 处理移除
        const num = TerisRule.deleteSquares(this._exists);
        // 增加积分
        this.addScore(num)
        // 切换方块
        this.switchTeris();
    }

    /**
     * 增加积分
     * @param lineNum 消除行数
     */
    private addScore(lineNum: number) {
        if (lineNum === 0) {
            return
        }
        switch (lineNum) {
            case 1:
                this._score += 10;
                break;
            case 2:
                this._score += 20
                break;
            case 3:
                this._score += 30
                break;
            case 4:
                this._score += 50
                break;
            default:
                this._score += 100
        }
    }
}
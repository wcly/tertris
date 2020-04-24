import { SquareGroup } from "./SquareGroup";
import { Game } from "./Game";

export interface Point {
    x: number,
    y: number,
}

export interface IViewer {
    show(): void // 显示
    remove(): void // 移除
}

// 形状
export type Shape = Point[]

export enum Direction {
    left,
    right,
    down
}

export enum GameStatus {
    init, // 未开始
    playing, // 进行中
    pause, // 暂停
    over, // 结束
}

export interface GameViewer {
    /**
     * 显示方块
     * @param teris 下一个方块对象
     */
    showNext(teris: SquareGroup): void;

    /**
     * 切换方块
     * @param teris 切换方块对象
     */
    switch(teris: SquareGroup): void;

    /**
     * 完成界面的初始化
     * @param game 
     */
    init(game: Game): void;

    /**
     * 显示分数
     * @param score 分数 
     */
    showScore(score: number): void;

    onGamePause():void;

    onGameStart():void;

    onGameOver():void;
}
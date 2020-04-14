export interface Point {
    x: number,
    y: number,
}

export interface IViewer {
    show(): void // 显示
    remove(): void // 移除
}

export type Shape = Point[]
import { Point, IViewer } from "./types";

export class Square {
    private _point: Point = {
        x: 0,
        y: 0,
    }
    private _color: string = ''
    private _viewer?: IViewer

    public get viewer() {
        return this._viewer
    }

    public get point() {
        return this._point;
    }

    public set point(val) {
        this._point = val;
        // 设置point触发显示
        if (this._viewer) {
            this._viewer.show()
        }
    }

    public get color() {
        return this._color;
    }

}
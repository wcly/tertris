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

    public set viewer(val) {
        this._viewer = val
        if (val) {
            val.show()
        }
    }

    public get point() {
        return this._point;
    }

    public set point(val) {
        console.log(val)
        this._point = val;
        // 设置point触发显示
        if (this._viewer) {
            this._viewer.show()
        }
    }

    public get color() {
        return this._color;
    }

    public set color(val) {
        this._color = val;
    }
}
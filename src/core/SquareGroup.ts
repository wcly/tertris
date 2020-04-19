import { Square } from "./Square";
import { Point, Shape } from "./types";

// 方块组合类
export class SquareGroup {
    private _squares: readonly Square[];

    public get squares() {
        return this._squares;
    }

    public get shape() {
        return this._shape;
    }

    public get centerPoint(): Point {
        return this._centerPoint
    }

    public set centerPoint(v: Point) {
        this._centerPoint = v
        this.setSquarePoints()
    }

    constructor(private _shape: Shape, private _centerPoint: Point, private _color: string) {
        // 设置小方块数组
        const arr: Square[] = [];
        this._shape.forEach(p => {
            const sq = new Square();
            sq.color = this._color;
            arr.push(sq);
        });
        this._squares = arr;
        this.setSquarePoints();
    }

    /**
     * 根据中心点坐标重新生成方块图形
     */
    private setSquarePoints(){
        this._shape.forEach((p, i) => {
            this._squares[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }
        });
    }

    protected isClock = true; // 旋转方向是否为顺时针

    /**
     * 返回旋转后的形状
     */
    afterRotateShage(): Shape {
        if (this.isClock) {
            return this._shape.map(p => {
                const newPoint: Point = {
                    x: -p.y,
                    y: p.x
                }
                return newPoint
            })
        } else {
            return this._shape.map(p => {
                const newPoint: Point = {
                    x: p.y,
                    y: -p.x
                }
                return newPoint
            })
        }
    }

    /**
     * 旋转
     */
    rotate() {
        const newShape = this.afterRotateShage();
        this._shape = newShape;
        this.setSquarePoints();
    }
}
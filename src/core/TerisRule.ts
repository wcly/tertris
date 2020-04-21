import { Shape, Point, Direction } from "./types";
import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

function isPoint(obj: any): obj is Point {
    if (typeof obj.x === "undefined") {
        return false
    }
    return true
}

/**
 * 游戏规则
 */
export class TerisRule {
    /**
     * 判断某个形状的方块，是否能够移动到目标位置
     * @param shape 方块形状
     * @param targetPoint 目标点 
     * @param exists 已存在的方块
     */
    static canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
        const targetSquarePoints: Point[] = shape.map(it => {
            return {
                x: it.x + targetPoint.x,
                y: it.y + targetPoint.y
            }
        })
        // 边界判断
        let result = targetSquarePoints.some(p => (p.x < 0 || p.x > GameConfig.panelSize.width - 1 ||
            p.y < 0 || p.y > GameConfig.panelSize.height - 1))
        if (result) {
            return false
        }
        // 判断是否与已有的方块重叠
        result = targetSquarePoints.some(p => exists.some(sq => sq.point.x === p.x && sq.point.y === p.y))
        if (result) {
            return false
        }
        return true
    }

    static move(terise: SquareGroup, targetPoint: Point, exists: Square[]): boolean
    static move(terise: SquareGroup, direction: Direction, exists: Square[]): boolean
    /**
     * 移动方块
     * @param terise 方块实例
     * @param targetPointOrDirection 移动目标点或移动方向
     * @param exists 已存在的数组
     */
    static move(terise: SquareGroup, targetPointOrDirection: Point | Direction, exists: Square[]): boolean {
        if (isPoint(targetPointOrDirection)) {
            if (this.canIMove(terise.shape, targetPointOrDirection, exists)) {
                terise.centerPoint = targetPointOrDirection
                return true
            }
            return false
        } else {
            const direction = targetPointOrDirection;
            let targetPoint: Point;
            if (direction === Direction.down) {
                targetPoint = {
                    x: terise.centerPoint.x,
                    y: terise.centerPoint.y + 1
                }
            } else if (direction === Direction.left) {
                targetPoint = {
                    x: terise.centerPoint.x - 1,
                    y: terise.centerPoint.y
                }
            } else {
                targetPoint = {
                    x: terise.centerPoint.x + 1,
                    y: terise.centerPoint.y
                }
            }
            return this.move(terise, targetPoint, exists)
        }
    }

    /**
     * 将方块移动到不能移动为止
     * @param terise 方块
     * @param direction 移动方向
     * @param exists 已存在的数组
     */
    static moveDirectly(terise: SquareGroup, direction: Direction, exists: Square[]) {
        while (this.move(terise, direction, exists)) { }
    }

    /**
     * 判断是否可以旋转
     * @param terise 方块
     * @param exists 已存在的方块
     */
    static rotate(terise: SquareGroup, exists: Square[]): boolean {
        const newShape = terise.afterRotateShage();
        if (this.canIMove(newShape, terise.centerPoint, exists)) {
            terise.rotate();
            return true;
        } else {
            return false;
        }
    }
}
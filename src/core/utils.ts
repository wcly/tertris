/**
 * 根据最小值和最大值得到该范围内的随机值（无法取到最大值）
 * @param min 最小值
 * @param max 最大值
 */
export function getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}
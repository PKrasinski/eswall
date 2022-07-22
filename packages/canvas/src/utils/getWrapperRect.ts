import Konva from "konva";
import { IRect } from "konva/lib/types";
import { Wall } from "../Wall";

export function getWrapperRect (wall: Wall, nodes: Konva.Node[], padding: number = 0) : IRect {
    let top: number = 0
    let left: number = 0
    let right: number = 0
    let bottom: number = 0

    nodes.forEach(node => {
        const { x, y, width, height } = node.getClientRect()
        if (!top || (y < top)) top = y
        if (!left || (x < left)) left = x
        if (!right || (x + width > right)) right = x + width
        if (!bottom || (y + height > bottom)) bottom = y + height
    })

    return {
        width: (right - left ) / wall.scaleX() + padding * 2,
        height: (bottom - top) / wall.scaleX() + padding * 2,
        x: (left - wall.x()) / wall.scaleX() - padding,
        y: (top - wall.y()) / wall.scaleX() - padding
    }
}
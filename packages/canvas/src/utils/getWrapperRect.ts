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
        width: (right - left + padding * 2) / wall.scaleX(),
        height: (bottom - top + padding * 2) / wall.scaleX(),
        x: (left - padding - wall.x()) / wall.scaleX(),
        y: (top - padding - wall.y()) / wall.scaleX()
    }
}
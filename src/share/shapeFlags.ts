export const enum ShapeFlags  {
    ELEMENT = 1 << 0,
    STATEFUL_COMPONENT = 1 << 1,
    TEXT_CHILDREN = 1 << 2,
    ARRAY_CHILDREN = 1 << 3

}


export function isStatefulComponent(shapeFlag:ShapeFlags) {
    return shapeFlag & ShapeFlags.STATEFUL_COMPONENT
}

export function setStatefulComponent(shapeFlag:ShapeFlags) {
    
    return shapeFlag | ShapeFlags.STATEFUL_COMPONENT
}

export function isElement(shapeFlag:ShapeFlags) {
    return shapeFlag & ShapeFlags.ELEMENT
}

export function setElement(shapeFlag:ShapeFlags) {
    return shapeFlag | ShapeFlags.ELEMENT
}

export function isTextChildren(shapeFlag:ShapeFlags) {
    return shapeFlag & ShapeFlags.TEXT_CHILDREN
}

export function setTextChildren(shapeFlag:ShapeFlags) {
    return shapeFlag | ShapeFlags.TEXT_CHILDREN
}

export function isArrayChildren(shapeFlag:ShapeFlags) {
    return shapeFlag & ShapeFlags.ARRAY_CHILDREN
}

export function setArrayChildren(shapeFlag:ShapeFlags) {
    return shapeFlag | ShapeFlags.ARRAY_CHILDREN
}



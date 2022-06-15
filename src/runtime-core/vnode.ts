import { isObject, isString } from "../share/index"
import { setArrayChildren, setElement, setStatefulComponent, setTextChildren, ShapeFlags } from "../share/shapeFlags"

export function createVNode(type,props?,children?) {
   const vnode = {
    type,
    props,
    children,
    shapeFlag: 0
   }
   if(Array.isArray(children)) {
    vnode.shapeFlag = setArrayChildren(vnode.shapeFlag)
   } else if (isString(children)) {

    vnode.shapeFlag = setTextChildren(vnode.shapeFlag)
   }
   confirmShapeFlags(vnode)
   return vnode
}

function confirmShapeFlags(vnode) {
    
    if(isObject(vnode.type)) {
        vnode.shapeFlag = setStatefulComponent(vnode.shapeFlag)
        
    } else if(isString(vnode.type)) {
        vnode.shapeFlag = setElement(vnode.shapeFlag)
    }
}
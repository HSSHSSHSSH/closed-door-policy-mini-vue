import { isObject, isString } from "../share/index"
import { setArrayChildren, setElement, setStatefulComponent, setTextChildren, ShapeFlags } from "../share/shapeFlags"

export function createVNode(type,props?,children?) {
   const vnode = {
    type,
    props,
    children,
    el:null,
    shapeFlag: getShapeFlag(type)
   }
   if(Array.isArray(children)) {
    vnode.shapeFlag = setArrayChildren(vnode.shapeFlag)
   } else if (isString(children)) {

    vnode.shapeFlag = setTextChildren(vnode.shapeFlag)
   }
   return vnode
}


function getShapeFlag(type) {
    return isString(type) ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
  }
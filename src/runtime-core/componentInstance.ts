import { setStatefulComponent } from "../share/shapeFlags"
import { patch } from "./render"
import { createVNode } from "./vnode"


export function createComponentInstance(vnode) {
    const instance = {
        vnode,
        type: vnode.type,
        shapeFlag: vnode.shapeFlag,
        setupState: {},
        props: {},
        slots: []
    }
    return instance
}

export function setupComponentInstance(instance) {
    //init setup
    setupStatefulComponent(instance)
    //init props

    //init slots
}

function setupStatefulComponent(instance) {
    const {vnode} = instance
    if(!vnode.type.setup) return 
    instance.setupState = vnode.type.setup()
    instance.render = instance.type.render
    console.log('111');
    
}

export function setupRenderEffect(instance,initialVNode,container) {
    console.log('222');
    
   const subTree = instance.render()

   patch(subTree,container)
}
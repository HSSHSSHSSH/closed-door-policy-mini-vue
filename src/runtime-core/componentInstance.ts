import { isObject } from "../share/index"
import { setStatefulComponent } from "../share/shapeFlags"
import { publicInstanceHandlers } from "./componentPublicInstance"
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
    const component = instance.type
    const {setup} = component
    if(setup) {
      const setupResult = setup()
      handleSetupResult(instance,setupResult)
    }
    // if(!vnode.type.setup) return 
    // instance.setupState = vnode.type.setup()
    // instance.render = instance.type.render
    
}

function handleSetupResult(instance:any,setupResult:any) {
    if(isObject(setupResult)) {  //setup是对象，则挂载到Instance的setupState属性上
       instance.setupState = setupResult
       instance.proxy = new Proxy(instance,publicInstanceHandlers)
    }
    //todo setup是渲染函数

    //将statefulComponent的render挂载到instance的render属性上
    finishComponentSetup(instance)
}
function finishComponentSetup(instance:any) {
    const component = instance.type
    instance.render = component.render
}


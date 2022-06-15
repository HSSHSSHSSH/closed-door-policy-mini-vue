import { isArrayChildren, isElement, isStatefulComponent, isTextChildren, ShapeFlags } from "../share/shapeFlags"
import { createComponentInstance, setupComponentInstance, setupRenderEffect } from "./componentInstance"


export function render(vnode,container) {
    
    patch(vnode,container)
}


export function patch(vnode,container) {
    //判断vnode的类型
    
    // stateful component 类型
    if(isStatefulComponent(vnode.shapeFlag)) {
        processComponent(vnode,container)
    } else if(isElement(vnode.shapeFlag)){
        //element类型
        processElement(vnode,container)
    }
}

function processComponent(vnode: any, container: any) {
    /**
     * 初始化stateful component  
     * 类似将所有component转化为vnode进行操作 
     * 处理 stateful component时  将其转化为 component instance进行操作
     */

    mountComponent(vnode,container)
    //更新component
}
function processElement(vnode: any, container: any) {
    //初始化element
    mountElement(vnode,container)
}

function mountComponent(initialVNode: any, container: any) {
    const instance = createComponentInstance(initialVNode)
    

    //初始化instance
    setupComponentInstance(instance)

    //获取instance的子组件
    setupRenderEffect(instance,initialVNode,container)


}

function mountElement(vnode: any, container: any) {
    //根据type渲染标签
    const {type,props,children,shapeFlag} = vnode
    const el = document.createElement(type)
    //挂载props中的属性
    setAttributes(props,el)
    //处理children中的子组件
    // if(Array.isArray(children)) {
    //     mountChildren(children,el)
    // } else {

    // }
    if(isTextChildren(shapeFlag)) {
        el.textContent = children
    } else if (isArrayChildren(shapeFlag)) {
        mountChildren(children,el)
    }
    container.append(el)
}



function setAttributes(props: any,el) {
    const isOn = (key: string) => /^on[A-Z]/.test(key)
    for(const key in props) {
        const val = props[key]
        if(isOn(key)) {  //注册事件
          el.addEventListener(key,val)
        } else {
            el.setAttribute(key,val)
        }
    }
}

function mountChildren(children: any, container: any) {
    children.forEach(el => {
        patch(el,container)
    })
}


import { render } from "./render"
import { createVNode } from "./vnode"

export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
           //创建虚拟节点
           const vnode = createVNode(rootComponent)
        
           //处理虚拟节点
           render(vnode,rootContainer)
        }
    }
}
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function isStatefulComponent(shapeFlag) {
    return shapeFlag & 2 /* ShapeFlags.STATEFUL_COMPONENT */;
}
function setStatefulComponent(shapeFlag) {
    return shapeFlag | 2 /* ShapeFlags.STATEFUL_COMPONENT */;
}
function isElement(shapeFlag) {
    return shapeFlag & 1 /* ShapeFlags.ELEMENT */;
}
function setElement(shapeFlag) {
    return shapeFlag | 1 /* ShapeFlags.ELEMENT */;
}
function isTextChildren(shapeFlag) {
    return shapeFlag & 4 /* ShapeFlags.TEXT_CHILDREN */;
}
function setTextChildren(shapeFlag) {
    return shapeFlag | 4 /* ShapeFlags.TEXT_CHILDREN */;
}
function isArrayChildren(shapeFlag) {
    return shapeFlag & 8 /* ShapeFlags.ARRAY_CHILDREN */;
}
function setArrayChildren(shapeFlag) {
    return shapeFlag | 8 /* ShapeFlags.ARRAY_CHILDREN */;
}

function createComponentInstance(vnode) {
    const instance = {
        vnode,
        type: vnode.type,
        shapeFlag: vnode.shapeFlag,
        setupState: {},
        props: {},
        slots: []
    };
    return instance;
}
function setupComponentInstance(instance) {
    //init setup
    setupStatefulComponent(instance);
    //init props
    //init slots
}
function setupStatefulComponent(instance) {
    const { vnode } = instance;
    if (!vnode.type.setup)
        return;
    instance.setupState = vnode.type.setup();
    instance.render = instance.type.render;
    console.log('111');
}
function setupRenderEffect(instance, initialVNode, container) {
    console.log('222');
    const subTree = instance.render();
    patch(subTree, container);
}

function render(vnode, container) {
    patch(vnode, container);
}
function patch(vnode, container) {
    //判断vnode的类型
    // stateful component 类型
    if (isStatefulComponent(vnode.shapeFlag)) {
        processComponent(vnode, container);
    }
    else if (isElement(vnode.shapeFlag)) {
        //element类型
        processElement(vnode, container);
    }
}
function processComponent(vnode, container) {
    /**
     * 初始化stateful component
     * 类似将所有component转化为vnode进行操作
     * 处理 stateful component时  将其转化为 component instance进行操作
     */
    mountComponent(vnode, container);
    //更新component
}
function processElement(vnode, container) {
    //初始化element
    mountElement(vnode, container);
}
function mountComponent(initialVNode, container) {
    const instance = createComponentInstance(initialVNode);
    //初始化instance
    setupComponentInstance(instance);
    //获取instance的子组件
    setupRenderEffect(instance, initialVNode, container);
}
function mountElement(vnode, container) {
    //根据type渲染标签
    const { type, props, children, shapeFlag } = vnode;
    const el = document.createElement(type);
    //挂载props中的属性
    setAttributes(props, el);
    //处理children中的子组件
    // if(Array.isArray(children)) {
    //     mountChildren(children,el)
    // } else {
    // }
    if (isTextChildren(shapeFlag)) {
        el.textContent = children;
    }
    else if (isArrayChildren(shapeFlag)) {
        mountChildren(children, el);
    }
    container.append(el);
}
function setAttributes(props, el) {
    const isOn = (key) => /^on[A-Z]/.test(key);
    for (const key in props) {
        const val = props[key];
        if (isOn(key)) { //注册事件
            el.addEventListener(key, val);
        }
        else {
            el.setAttribute(key, val);
        }
    }
}
function mountChildren(children, container) {
    children.forEach(el => {
        patch(el, container);
    });
}

function isObject(value) {
    return value !== undefined && typeof (value) == "object";
}
function isString(value) {
    return typeof value === 'string';
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        shapeFlag: 0
    };
    if (Array.isArray(children)) {
        vnode.shapeFlag = setArrayChildren(vnode.shapeFlag);
    }
    else if (isString(children)) {
        vnode.shapeFlag = setTextChildren(vnode.shapeFlag);
    }
    confirmShapeFlags(vnode);
    return vnode;
}
function confirmShapeFlags(vnode) {
    if (isObject(vnode.type)) {
        vnode.shapeFlag = setStatefulComponent(vnode.shapeFlag);
    }
    else if (isString(vnode.type)) {
        vnode.shapeFlag = setElement(vnode.shapeFlag);
    }
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            //创建虚拟节点
            const vnode = createVNode(rootComponent);
            //处理虚拟节点
            render(vnode, rootContainer);
        }
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

exports.createApp = createApp;
exports.h = h;

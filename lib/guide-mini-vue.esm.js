function isStatefulComponent(shapeFlag) {
    return shapeFlag & 2 /* ShapeFlags.STATEFUL_COMPONENT */;
}
function isElement(shapeFlag) {
    return shapeFlag & 1 /* ShapeFlags.ELEMENT */;
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

function isObject(value) {
    return value !== undefined && typeof (value) == "object";
}
function isString(value) {
    return typeof value === 'string';
}

const publicPropertiesMap = {
    $el: (i) => i.vnode.el
};
const publicInstanceHandlers = {
    get(target, key) {
        const { setupState } = target;
        if (key in setupState) {
            return setupState[key];
        }
        const publicGetter = publicPropertiesMap[key];
        if (publicGetter) {
            return publicGetter(target);
        }
    }
};

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
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
    // if(!vnode.type.setup) return 
    // instance.setupState = vnode.type.setup()
    // instance.render = instance.type.render
}
function handleSetupResult(instance, setupResult) {
    if (isObject(setupResult)) { //setup是对象，则挂载到Instance的setupState属性上
        instance.setupState = setupResult;
        instance.proxy = new Proxy(instance, publicInstanceHandlers);
    }
    //todo setup是渲染函数
    //将statefulComponent的render挂载到instance的render属性上
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const component = instance.type;
    instance.render = component.render;
}

function render(vnode, container) {
    patch(vnode, container);
}
function patch(vnode, container) {
    //判断vnode的类型
    const { shapeFlag } = vnode;
    // stateful component 类型
    if (isStatefulComponent(shapeFlag)) {
        processComponent(vnode, container);
    }
    else if (isElement(shapeFlag)) {
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
    // todo 更新component
}
function processElement(vnode, container) {
    //初始化element
    mountElement(vnode, container);
}
function mountComponent(initialVNode, container) {
    /**
     * 类似以component 为模板创建对应的vnode
     * 在此以 statefulComponent为模板创建对应的instance
     */
    const instance = createComponentInstance(initialVNode);
    //初始化instance
    setupComponentInstance(instance);
    //获取instance的子组件
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
    instance.vnode.el = subTree.el;
}
function mountElement(vnode, container) {
    //根据type渲染标签
    const { type, props, children, shapeFlag } = vnode;
    const el = vnode.el = document.createElement(type);
    //挂载props中的属性
    setAttributes(props, el);
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

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        el: null,
        shapeFlag: getShapeFlag(type)
    };
    if (Array.isArray(children)) {
        vnode.shapeFlag = setArrayChildren(vnode.shapeFlag);
    }
    else if (isString(children)) {
        vnode.shapeFlag = setTextChildren(vnode.shapeFlag);
    }
    return vnode;
}
function getShapeFlag(type) {
    return isString(type) ? 1 /* ShapeFlags.ELEMENT */ : 2 /* ShapeFlags.STATEFUL_COMPONENT */;
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

export { createApp, h };

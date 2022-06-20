
const publicPropertiesMap = {
    $el: (i) =>  i.vnode.el
} 
export const publicInstanceHandlers = {
    get(target,key) {
        const {setupState} = target
        if(key in setupState) {
            return setupState[key]
        }
        
       const publicGetter = publicPropertiesMap[key]
       
       if(publicGetter) {
           return publicGetter(target)
       }
    }
   }
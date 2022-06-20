import {h} from '../../lib/guide-mini-vue.esm.js'
window.self = null
export const App = {
    render() {
        window.self = this
        return h(
            'div',
            {
                class: 'red'
            },
            this.message
        )
    },
    setup() {
        return {
            message: 'hsh mini-vue'
        }
    }
}
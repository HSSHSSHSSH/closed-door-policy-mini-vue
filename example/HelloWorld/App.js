import {h} from '../../lib/guide-mini-vue.esm.js'
export const App = {
    render() {
        return h(
            'div',
            {
                class: 'red'
            },
            'my own mini-vue'
        )
    },
    setup() {
        return 'hello world'
    }
}
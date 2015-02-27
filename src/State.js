import State from './lib/state'

const state = new State({
    newInput: {
        value: ''
    },
    title: 'Index',
    values: []
})

export default state
export const newInputCursor = state.cursor(['newInput'])
export const valuesCursor = state.cursor(['values'])
const initialState = {};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return state = action.payload;
        case 'ADD_TASK':
            state[Object.keys(state).length] = action.payload;
            return state = {...state}
        case 'DELETE_TASK':
            delete state[Object.keys(state).find(key => state[key].task_id === action.payload)]
            return state = {...state}
        case 'UPDATE_TASK':
            let key = Object.keys(state).find(key => state[key].task_id === action.payload.task_id)
            switch (action.payload.update_type) {
                case 'content':
                    state[key].content = action.payload.value
                    break;
                case 'check':
                    state[key].status = action.payload.value
                    break;
                case 'star':
                    state[key].starred = action.payload.value
                    state = Object.values(state).sort((a, b) => b.starred - a.starred)
                    // console.log(...Object.values(state).sort((a,b)=>b.starred-a.starred))
                    break;
                default:
                    return;
            }
            return state = {...state}
        default:
            return state;
    }
}

export const activeTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_TASK':
            return state = action.payload;
        default:
            return state;
    }
}

export const taskContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TASK_CONTENT':
            return state = action.payload;
        default:
            return state;
    }
}
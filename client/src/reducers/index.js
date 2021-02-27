import {tasksReducer,activeTaskReducer,taskContentReducer} from './tasks';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    tasks: tasksReducer,
    activeTask: activeTaskReducer,
    taskContent: taskContentReducer
});

export default allReducers;
import { ACTION_TYPES } from '../actions/actionTypes';

const {
  ADD_TODO,
  TOGGLE_TODO,
} = ACTION_TYPES;


export default function tasks(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        tasks: [
          ...state.tasks,
          {
            text: action.text,
            completed: false,
          },
        ],
      });
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        tasks: state.tasks.map((task, index) => {
          if (index === action.index) {
            return Object.assign({}, task, {
              completed: !task.completed,
            });
          }
          return tasks;
        }),
      });
    default:
      return state;
  }
}

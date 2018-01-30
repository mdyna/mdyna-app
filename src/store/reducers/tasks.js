import ACTION_TYPES from '../actions/actionTypes';

const {
  ADD_TASK,
  TOGGLE_TASK,
} = ACTION_TYPES;


export default function tasks(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return Object.assign({}, state, {
        tasks: [
          ...state,
          {
            text: action.text,
            completed: false,
          },
        ],
      });
    case TOGGLE_TASK:
      return Object.assign({}, state, {
        tasks: state.map((task, index) => {
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

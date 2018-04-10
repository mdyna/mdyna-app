import ACTION_TYPES from '../actions/actionTypes';

const {
  ADD_TASK,
  TOGGLE_TASK,
} = ACTION_TYPES;


export default function tasks(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          id: state.length + 1,
          title: action.task.title,
          color: action.task.color,
          text: action.task.text,
          completed: false,
        },
      ];
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

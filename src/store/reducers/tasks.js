import ACTION_TYPES from '../actions/actionTypes';

const {
  ADD_TASK,
  TOGGLE_TASK,
  GENERATE_LINK,
} = ACTION_TYPES.TASK;


export default function tasks(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          taskId: (state.length + 1) || 1,
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
    case GENERATE_LINK:
      return state.map((task) => {
        if (task.taskId === action.index) {
          return {
            ...task,
            taskId: action.keys.taskId,
            shortLink: action.keys.shortLink,
          };
        }
        return task;
      });
    default:
      return state;
  }
}

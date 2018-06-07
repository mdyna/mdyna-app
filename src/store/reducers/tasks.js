import ACTION_TYPES from '../actions/actionTypes';

const {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  GENERATE_LINK,
  SAVE_TASK,
} = ACTION_TYPES.TASK;


export default function tasks(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          taskId: (state && state[state.length - 1] && state[state.length - 1].taskId + 1) || 1,
          completed: false,
          ...action.task,
        },
      ];
    case REMOVE_TASK:
      return state.filter(task => task.taskId !== action.task.taskId);
    case SAVE_TASK:
      return state.map((task) => {
        if (task.taskId === action.task.taskId) {
          return action.task;
        }
        return task;
      });
    case TOGGLE_TASK:
      return state.map((task) => {
        if (task.taskId === action.task.taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
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

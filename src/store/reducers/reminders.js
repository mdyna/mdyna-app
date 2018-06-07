import ACTION_TYPES from '../actions/actionTypes';

const {
  ADD_REMINDER,
  REMOVE_REMINDER,
  COMPLETE_REMINDER,
  FAIL_REMINDER,
} = ACTION_TYPES.REMINDERS;


export default function reminders(state = {
  daily: [],
  weekly: [],
  monthly: [],
}, action) {
  /* eslint-disable */
  const reminderFrequency = action?.task?.repeatAlert;
  switch (action.type) {
    case ADD_REMINDER:
      return [
        ...state,
        {
          taskId: (state && state[state.length - 1] && state[state.length - 1].taskId + 1) || 1,
          title: action.task.title,
          color: action.task.color,
          text: action.task.text,
        },
      ];
    case REMOVE_REMINDER:
      return state.filter(task => task.taskId !== action.task.taskId);
    case COMPLETE_REMINDER:
      return state.map((task) => {
        if (task.taskId === action.task.taskId) {
          return action.task;
        }
        return task;
      });
    case FAIL_REMINDER:
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

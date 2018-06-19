import ACTION_TYPES from '../actions/actionTypes';

const {
  ADD_REMINDER,
  REMOVE_REMINDER,
  COMPLETE_REMINDER,
  FAIL_REMINDER,
} = ACTION_TYPES.REMINDER;


export default function reminders(state = {
  daily: [],
  weekly: [],
  monthly: [],
}, action) {
  const reminderFrequency = action?.task?.repeatAlert?.toLowerCase() || 'Weekly';
  const reminderId =
  (
    state &&
    state[reminderFrequency] &&
    state[reminderFrequency][state.length - 1] &&
    state[reminderFrequency][state.length - 1].taskId + 1
  ) || 1;
  switch (action.type) {
    case ADD_REMINDER:
      if (reminderFrequency === 'daily') {
        return {
          ...state,
          daily: [
            ...state.daily,
            {
              reminderId,
              ...action.task,
            },
          ],
        };
      } else if (reminderFrequency === 'weekly') {
        return {
          ...state,
          weekly: [
            ...state.weekly,
            {
              reminderId,
              ...action.task,
            },
          ],
        };
      } else if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: [
            ...state.monthly,
            {
              reminderId,
              ...action.task,
            },
          ],
        };
      }
      break;
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
    default:
      return state;
  }
  return state;
}

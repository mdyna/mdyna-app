import ACTION_TYPES from '../actions/actionTypes';
import unNest from '../../utils/nest';

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
  let reminderFrequency = unNest(action, 'task.repeatAlert') || 'weekly';
  reminderFrequency = reminderFrequency.toLowerCase();
  const startDate = unNest(action, 'task.startDate') || new Date();
  const text = unNest(action, 'task.text') || '';
  const title = unNest(action, 'task.title') || 'Reminder';
  const color = unNest(action, 'task.color') || '#1DE9B6';
  const reminderStats = unNest(action, 'task.reminderStats') || {};
  const reminderId =
  (
    state &&
    state[reminderFrequency] &&
    state[reminderFrequency][state.length - 1] &&
    state[reminderFrequency][state.length - 1].taskId + 1
  ) || 1;
  const reminder = {
    reminderId,
    startDate,
    color,
    reminderFrequency,
    text,
    title,
    reminderStats,
  };
  switch (action.type) {
    case ADD_REMINDER:
      if (reminderFrequency === 'daily') {
        return {
          ...state,
          daily: [
            ...state.daily,
            reminder,
          ],
        };
      } else if (reminderFrequency === 'weekly') {
        return {
          ...state,
          weekly: [
            ...state.weekly,
            reminder,
          ],
        };
      } else if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: [
            ...state.monthly,
            reminder,
          ],
        };
      }
      break;
    case REMOVE_REMINDER:
      return state.filter(savedReminder => savedReminder.reminderId !== reminder.reminderId);
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

import ACTION_TYPES from '../actions/actionTypes';
import unNest from '../../utils/nest';

const {
  ADD_REMINDER,
  REMOVE_REMINDER,
  COMPLETE_REMINDER,
  FAIL_REMINDER,
  SAVE_REMINDER,
  SNOOZE_REMINDER,
} = ACTION_TYPES.REMINDER;

export default function reminders(
  state = {
    daily: [],
    weekly: [],
    monthly: [],
  },
  action,
) {
  function addReminder(subState, reminder) {
    return [...subState, reminder];
  }

  function saveReminder(subState, reminder) {
    return [
      ...subState.filter(d => d.reminderId !== unNest(action, 'reminder.reminderId')),
      reminder,
    ];
  }

  function completeReminder(subState, reminder, reminderStats) {
    return [
      ...subState.filter(d => d.reminderId !== unNest(action, 'reminder.reminderId')),
      {
        ...reminder,
        reminderStats: {
          ...reminderStats,
          completed: reminderStats.completed + 1 || 1,
          consecutive: reminderStats.consecutive + 1 || 1,
          record:
            reminderStats.record > reminderStats.consecutive + 1
              ? reminderStats.record
              : reminderStats.consecutive + 1 || 1,
          lastCompletedDate: new Date(),
          lastAlertDate: new Date(),
        },
      },
    ];
  }

  function failReminder(subState, reminder, reminderStats) {
    return [
      ...subState.filter(d => d.reminderId !== unNest(action, 'reminder.reminderId')),
      {
        ...reminder,
        reminderStats: {
          ...reminderStats,
          failed: reminderStats.failed + 1 || 1,
          consecutive: 0,
          lastAlertDate: new Date(),
        },
      },
    ];
  }

  function snoozeReminder(subState, reminder, reminderStats) {
    return [
      ...subState.filter(d => d.reminderId !== unNest(action, 'reminder.reminderId')),
      {
        ...reminder,
        reminderStats: {
          ...reminderStats,
          snooze: reminderStats.snooze + 1,
          lastAlertDate: new Date(),
        },
      },
    ];
  }

  let reminderFrequency =
    unNest(action, 'reminder.reminderFrequency') || unNest(action, 'reminder.repeatAlert') || '';
  reminderFrequency = reminderFrequency.toLowerCase();
  const startDate = unNest(action, 'reminder.startDate') || new Date();
  const text = unNest(action, 'reminder.text') || '';
  const title = unNest(action, 'reminder.title') || 'Reminder';
  const color = unNest(action, 'reminder.color') || '#1DE9B6';
  const reminderStats = unNest(action, 'reminder.reminderStats') || {};
  const reminderId =
    unNest(action, 'reminder.reminderId') ||
    (state &&
      state[reminderFrequency] &&
      state[reminderFrequency][state[reminderFrequency].length - 1] &&
      state[reminderFrequency][state[reminderFrequency].length - 1].reminderId + 1) ||
    1;
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
          daily: addReminder(state.daily, reminder),
        };
      } else if (reminderFrequency === 'weekly') {
        return {
          ...state,
          weekly: addReminder(state.weekly, reminder),
        };
      } else if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: addReminder(state.monthly, reminder),
        };
      }
      break;
    case SAVE_REMINDER:
      if (reminderFrequency === 'daily') {
        return {
          ...state,
          daily: saveReminder(state.daily, reminder),
        };
      }
      if (reminderFrequency === 'weekly' || !reminderFrequency) {
        return {
          ...state,
          weekly: saveReminder(state.weekly, reminder),
        };
      }
      if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: saveReminder(state.monthly, reminder),
        };
      }
      break;
    case REMOVE_REMINDER:
      if (reminderFrequency === 'daily') {
        return {
          ...state,
          daily: state.daily.filter(
            savedReminder => savedReminder.reminderId !== reminder.reminderId,
          ),
        };
      }
      if (reminderFrequency === 'weekly') {
        return {
          ...state,
          weekly: state.weekly.filter(
            savedReminder => savedReminder.reminderId !== reminder.reminderId,
          ),
        };
      }
      if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: state.monthly.filter(
            savedReminder => savedReminder.reminderId !== reminder.reminderId,
          ),
        };
      }
      break;
    case COMPLETE_REMINDER:
      if (reminderFrequency === 'daily') {
        return {
          ...state,
          daily: completeReminder(state.daily, reminder, reminderStats),
        };
      }
      if (reminderFrequency === 'weekly') {
        return {
          ...state,
          weekly: completeReminder(state.weekly, reminder, reminderStats),
        };
      }
      if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: completeReminder(state.monthly, reminder, reminderStats),
        };
      }
      break;
    case FAIL_REMINDER:
      if (reminderFrequency === 'daily') {
        return {
          ...state,
          daily: failReminder(state.daily, reminder, reminderStats),
        };
      }
      if (reminderFrequency === 'weekly') {
        return {
          ...state,
          weekly: failReminder(state.weekly, reminder, reminderStats),
        };
      }
      if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: failReminder(state.monthly, reminder, reminderStats),
        };
      }
      break;
    case SNOOZE_REMINDER:
      if (reminderFrequency === 'daily') {
        return {
          ...state,
          daily: snoozeReminder(state.daily, reminder, reminderStats),
        };
      }
      if (reminderFrequency === 'weekly') {
        return {
          ...state,
          weekly: snoozeReminder(state.weekly, reminder, reminderStats),
        };
      }
      if (reminderFrequency === 'monthly') {
        return {
          ...state,
          monthly: snoozeReminder(state.monthly, reminder, reminderStats),
        };
      }
      break;
    default:
      return state;
  }
  return state;
}

import ACTION_TYPES from '../actions/actionTypes';
import unNest from '../../utils/nest';

const {
  ADD_TASK,
  REMOVE_TASK,
  COMPLETE_TASK,
  FAIL_TASK,
  SAVE_TASK,
  SNOOZE_TASK,
} = ACTION_TYPES.TASK;

export default function tasks(
  state = {
    daily: [],
    weekly: [],
    monthly: [],
  },
  action,
) {
  function addTask(subState, task) {
    return [...subState, task];
  }

  function saveTask(subState, task) {
    return [
      ...subState.filter(d => d.taskId !== unNest(action, 'task.taskId')),
      task,
    ];
  }

  function completeTask(subState, task, taskStats) {
    return [
      ...subState.filter(d => d.taskId !== unNest(action, 'task.taskId')),
      {
        ...task,
        taskStats: {
          ...taskStats,
          completed: taskStats.completed + 1 || 1,
          consecutive: taskStats.consecutive + 1 || 1,
          record:
            taskStats.record > taskStats.consecutive + 1
              ? taskStats.record
              : taskStats.consecutive + 1 || 1,
          lastCompletedDate: new Date(),
          lastAlertDate: new Date(),
        },
      },
    ];
  }

  function failTask(subState, task, taskStats) {
    return [
      ...subState.filter(d => d.taskId !== unNest(action, 'task.taskId')),
      {
        ...task,
        taskStats: {
          ...taskStats,
          failed: taskStats.failed + 1 || 1,
          consecutive: 0,
          lastAlertDate: new Date(),
        },
      },
    ];
  }

  function snoozeTask(subState, task, taskStats) {
    return [
      ...subState.filter(d => d.taskId !== unNest(action, 'task.taskId')),
      {
        ...task,
        taskStats: {
          ...taskStats,
          snooze: taskStats.snooze + 1 || 1,
          lastAlertDate: new Date(),
        },
      },
    ];
  }

  let taskFrequency =
    unNest(action, 'task.taskFrequency') ||
    unNest(action, 'task.repeatAlert') ||
    'weekly';
  taskFrequency = taskFrequency.toLowerCase();
  const startDate = unNest(action, 'task.startDate') || new Date();
  const text = unNest(action, 'task.text') || '';
  const title = unNest(action, 'task.title') || 'Task';
  const color = unNest(action, 'task.color') || '#1DE9B6';
  const taskStats = unNest(action, 'task.taskStats') || {};
  const taskId =
    unNest(action, 'task.taskId') ||
    (state &&
      state[taskFrequency] &&
      state[taskFrequency][state[taskFrequency].length - 1] &&
      state[taskFrequency][state[taskFrequency].length - 1].taskId + 1) ||
    1;
  const task = {
    taskId,
    startDate,
    color,
    taskFrequency,
    text,
    title,
    taskStats,
    noteId: null,
  };
  switch (action.type) {
    case ADD_TASK:
      if (taskFrequency === 'daily') {
        return {
          ...state,
          daily: addTask(state.daily, task),
        };
      } else if (taskFrequency === 'weekly' || !taskFrequency) {
        return {
          ...state,
          weekly: addTask(state.weekly, task),
        };
      } else if (taskFrequency === 'monthly') {
        return {
          ...state,
          monthly: addTask(state.monthly, task),
        };
      }
      break;
    case SAVE_TASK:
      if (taskFrequency === 'daily') {
        return {
          ...state,
          daily: saveTask(state.daily, task),
        };
      }
      if (taskFrequency === 'weekly' || !taskFrequency) {
        return {
          ...state,
          weekly: saveTask(state.weekly, task),
        };
      }
      if (taskFrequency === 'monthly') {
        return {
          ...state,
          monthly: saveTask(state.monthly, task),
        };
      }
      break;
    case REMOVE_TASK:
      if (taskFrequency === 'daily') {
        return {
          ...state,
          daily: state.daily.filter(
            savedTask => savedTask.taskId !== task.taskId,
          ),
        };
      }
      if (taskFrequency === 'weekly') {
        return {
          ...state,
          weekly: state.weekly.filter(
            savedTask => savedTask.taskId !== task.taskId,
          ),
        };
      }
      if (taskFrequency === 'monthly') {
        return {
          ...state,
          monthly: state.monthly.filter(
            savedTask => savedTask.taskId !== task.taskId,
          ),
        };
      }
      break;
    case COMPLETE_TASK:
      if (taskFrequency === 'daily') {
        return {
          ...state,
          daily: completeTask(state.daily, task, taskStats),
        };
      }
      if (taskFrequency === 'weekly') {
        return {
          ...state,
          weekly: completeTask(state.weekly, task, taskStats),
        };
      }
      if (taskFrequency === 'monthly') {
        return {
          ...state,
          monthly: completeTask(state.monthly, task, taskStats),
        };
      }
      break;
    case FAIL_TASK:
      if (taskFrequency === 'daily') {
        return {
          ...state,
          daily: failTask(state.daily, task, taskStats),
        };
      }
      if (taskFrequency === 'weekly') {
        return {
          ...state,
          weekly: failTask(state.weekly, task, taskStats),
        };
      }
      if (taskFrequency === 'monthly') {
        return {
          ...state,
          monthly: failTask(state.monthly, task, taskStats),
        };
      }
      break;
    case SNOOZE_TASK:
      if (taskFrequency === 'daily') {
        return {
          ...state,
          daily: snoozeTask(state.daily, task, taskStats),
        };
      }
      if (taskFrequency === 'weekly') {
        return {
          ...state,
          weekly: snoozeTask(state.weekly, task, taskStats),
        };
      }
      if (taskFrequency === 'monthly') {
        return {
          ...state,
          monthly: snoozeTask(state.monthly, task, taskStats),
        };
      }
      break;
    default:
      return state;
  }
  return state;
}

import ACTION_TYPES from '../actions/actionTypes';

const { ADD_TASK, REMOVE_TASK, TOGGLE_TASK, GENERATE_LINK, SAVE_TASK } = ACTION_TYPES.TASK;

const addTaskId = taskList =>
  (taskList &&
    taskList[taskList.length - 1] &&
    taskList[taskList.length - 1].taskId &&
    taskList[taskList.length - 1].taskId + 1) ||
  (taskList && taskList.length) ||
  1;
const saveTaskId = (task, taskList) => task.taskId || addTaskId(taskList);
export default function tasks(state = [], action) {
  switch (action.type) {
    case ADD_TASK:
      return [
        ...state,
        {
          ...action.task,
          taskId: addTaskId(state),
          completed: false,
          reminderId: null,
        },
      ];
    case REMOVE_TASK:
      return state.filter(task => task.taskId !== action.task.taskId);
    case SAVE_TASK:
      return state.map((task) => {
        if (action.task.taskId) {
          if (task.taskId === action.task.taskId) {
            return action.task;
          }
        }
        return { taskId: saveTaskId(action.task, state), reminderId: null, ...task };
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

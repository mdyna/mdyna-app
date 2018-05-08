import ACTION_TYPES from './actionTypes';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export const addTask = task => ({
  type: ACTION_TYPES.TASK.ADD_TASK,
  task,
});

export const removeTask = task => ({
  type: ACTION_TYPES.TASK.REMOVE_TASK,
  task,
});

export const saveTask = task => ({
  type: ACTION_TYPES.TASK.SAVE_TASK,
  task,
});

export const toggleEditor = () => ({
  type: ACTION_TYPES.TASK_EDITOR.TOGGLE_EDITOR,
});

export const setVisibilityFilter = filter => ({
  type: ACTION_TYPES.SET_VISIBILITY_FILTER,
  filter,
});

export const toggleTask = task => ({
  type: ACTION_TYPES.TASK.TOGGLE_TASK,
  task,
});

export const generateTaskLink = (keys, index) => ({
  type: ACTION_TYPES.TASK.GENERATE_LINK,
  keys,
  index,
});

export const changeTaskSetting = (prop, value) => ({
  type: ACTION_TYPES.TASK_EDITOR.ON_CHANGE,
  prop,
  value,
});

export const editTask = task => ({
  type: ACTION_TYPES.TASK_EDITOR.EDIT_TASK,
  task,
});

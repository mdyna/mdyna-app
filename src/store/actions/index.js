import ACTION_TYPES from './actionTypes';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

let nextTodoId = 0;
export const addTask = (task) => {
  nextTodoId += 1;
  return {
    type: ACTION_TYPES.ADD_TASK,
    id: nextTodoId,
    task,
  };
};

export const setVisibilityFilter = filter => ({
  type: ACTION_TYPES.SET_VISIBILITY_FILTER,
  filter,
});

export const toggleTask = id => ({
  type: ACTION_TYPES.TOGGLE_TASK,
  id,
});


export const changeTaskProp = (prop, value) => ({
  type: ACTION_TYPES.TASK_EDITOR.ON_CHANGE,
  prop,
  value,
});

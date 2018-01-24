
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

let nextTodoId = 0;
export const addTodo = (text) => {
  nextTodoId += 1;
  return {
    type: 'ADD_TASK',
    id: nextTodoId,
    text,
  };
};

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TASK',
  id,
});

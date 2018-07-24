import ACTION_TYPES from './actionTypes';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export const addNote = note => ({
  type: ACTION_TYPES.TASK.ADD_TASK,
  note,
});

export const addReminder = reminder => ({
  type: ACTION_TYPES.REMINDER.ADD_REMINDER,
  reminder,
});

export const saveReminder = reminder => ({
  type: ACTION_TYPES.REMINDER.SAVE_REMINDER,
  reminder,
});

export const completeReminder = reminder => ({
  type: ACTION_TYPES.REMINDER.COMPLETE_REMINDER,
  reminder,
});

export const failReminder = reminder => ({
  type: ACTION_TYPES.REMINDER.FAIL_REMINDER,
  reminder,
});

export const snoozeReminder = reminder => ({
  type: ACTION_TYPES.REMINDER.SNOOZE_REMINDER,
  reminder,
});

export const removeReminder = reminder => ({
  type: ACTION_TYPES.REMINDER.REMOVE_REMINDER,
  reminder,
});

export const removeNote = note => ({
  type: ACTION_TYPES.TASK.REMOVE_TASK,
  note,
});

export const saveNote = note => ({
  type: ACTION_TYPES.TASK.SAVE_TASK,
  note,
});

export const toggleEditor = () => ({
  type: ACTION_TYPES.TASK_EDITOR.TOGGLE_EDITOR,
});

export const setVisibilityFilter = filter => ({
  type: ACTION_TYPES.SET_VISIBILITY_FILTER,
  filter,
});

export const toggleNote = note => ({
  type: ACTION_TYPES.TASK.TOGGLE_TASK,
  note,
});

export const generateNoteLink = (keys, index) => ({
  type: ACTION_TYPES.TASK.GENERATE_LINK,
  keys,
  index,
});

export const changeNoteSetting = (prop, value) => ({
  type: ACTION_TYPES.TASK_EDITOR.ON_CHANGE,
  prop,
  value,
});

export const editNote = note => ({
  type: ACTION_TYPES.TASK_EDITOR.EDIT_TASK,
  note,
});

export const toggleWhiteMode = () => ({
  type: ACTION_TYPES.TOGGLE_WHITE_MODE,
});

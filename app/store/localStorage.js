export const getLocalState = () => {
  const settings = window.userStorage.get('settings');
  const userState = window.cardStorage.get('state');

  return {
    ...userState,
    filters: {
      order: settings.order,
      sorting: settings.sorting,
    },
    style: {
      whiteMode: settings.whiteMode,
    },
    settings: {
      cwd: settings.cwd,
    },
  };
};

export const saveState = (state, settings) => {
  try {
    window.userStorage.set('settings', settings);
    window.cardStorage.set('state', state);
  } catch (err) {
    /* eslint-disable-next-line  */
    console.log(err);
  }
};

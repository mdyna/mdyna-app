export const getLocalState = () => {
  const settings = window.userStorage.get('settings');
  const userState = window.cardStorage.get('state');

  return {
    ...userState,
    filters: {
      order: settings && settings.order,
      sorting: settings && settings.sorting,
    },
    style: {
      whiteMode: settings && settings.whiteMode,
    },
    settings: {
      cardsPerPage: settings && settings.cardsPerPage,
      cwd: settings && settings.cwd,
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

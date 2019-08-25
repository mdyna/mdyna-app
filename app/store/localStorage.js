export const getLocalState = () => {
  const settings = window.userStorage.get('settings');
  const userState = window.cardStorage.get('state');
  const { boards } = userState;
  const boardNames = userState.boardNames || [];
  for (let i = 0; i < boardNames.length; i += 1) {
    const boardName = boardNames[i];
    boards.boards[boardName] = {};
  }
  return {
    ...userState,
    boards,
    filters: {
      order: settings && settings.order,
      sorting: settings && settings.sorting,
    },
    style: {
      whiteMode: settings && settings.whiteMode,
    },
    settings: {
      codeTheme: settings && settings.codeTheme,
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

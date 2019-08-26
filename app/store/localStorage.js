export const getLocalState = () => {
  const settings = window.userStorage.get('settings');
  const userState = window.cardStorage.get('state');
  const userBoards = (settings && settings.userBoards) || {
    INBOX: {
      cards: 'all',
      name: 'INBOX',
    },
  };
  const boards = userState && userState.boards;
  const boardNames = (userBoards
    && Object.keys(userBoards).map(d => userBoards[d].name)) || ['INBOX'];

  return {
    ...userState,
    boards: {
      ...boards,
      boardNames,
      boards: userBoards,
    },
    filters: {
      order: settings && settings.order,
      sorting: settings && settings.sorting,
      activeBoard: settings && settings.activeBoard,
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

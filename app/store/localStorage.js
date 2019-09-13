export const getLocalState = () => {
  const settings = window.userStorage.get('settings');
  const userState = window.cardStorage.get('state');
  const boards = userState && userState.boards;
  const boardNames = boards && boards.boardNames;
  const boardList = {};
  for (let i = 0; i < boardNames.length; i += 1) {
    const name = boardNames[i];
    if (!boardList[name]) {
      boardList[name] = {
        name,
        cards: [],
      };
    }
  }

  return {
    ...userState,
    boards: {
      ...boards,
      boardNames,
      boardList,
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

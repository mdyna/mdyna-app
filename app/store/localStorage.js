export const getLocalState = () => {
  const settings = window.userStorage.get('settings');
  const userState = window.cardStorage.get('state');
  const favs = userState && userState.favs;
  const boards = userState && userState.boards;

  return {
    ...userState,
    favs,
    boards,
    filters: {
      order: settings && settings.order,
      sorting: settings && settings.sorting,
      activeBoard: settings && settings.activeBoard,
    },
    style: {
      theme: settings && settings.theme,
    },
    settings: {
      codeTheme: settings && settings.codeTheme,
      githubUserName: settings && settings.githubUserName,
      gistId: settings && settings.gistId,
      deletedCards: settings && settings.deletedCards,
      githubPassword: settings && settings.githubPassword,
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

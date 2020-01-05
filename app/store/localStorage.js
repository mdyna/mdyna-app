export const getLocalState = () => {
  const settings = JSON.parse(window.localStorage.getItem('settings'));
  const userState = JSON.parse(window.localStorage.getItem('state'));
  if (userState && settings) {
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
        whiteMode: settings && settings.whiteMode,
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
  }
  return {};
};

export const saveState = (state, settings) => {
  try {
    window.localStorage.setItem('settings', JSON.stringify(settings));
    window.localStorage.setItem('state', JSON.stringify(state));
  } catch (err) {
    /* eslint-disable-next-line  */
    console.log(err);
  }
};

export const getLocalState = () => {
  const localState = window.storage.get('state');
  return localState;
};

export const saveState = (state) => {
  try {
    window.storage.set('state', state);
  } catch (err) {
    /* eslint-disable-next-line  */
    console.log(err);
  }
};

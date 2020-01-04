const logger = require('electron-log');

function loadLabels(cards) {
  const labels = [];
  if (cards && cards.length) {
    for (let i = 0; i < cards.length; i += 1) {
      const card = cards[i];
      const cardLabels = card.labels;
      const labelTitleMaps = labels.map(l => l.title);
      if (cardLabels && cardLabels.length) {
        for (
          let cardLabelIndex = 0;
          cardLabelIndex < cardLabels.length;
          cardLabelIndex += 1
        ) {
          const labelTitle = cardLabels[cardLabelIndex].title;
          const labelIndex = labelTitleMaps.indexOf(labelTitle);
          if (labelIndex === -1) {
            labels.push({
              title: labelTitle,
              count: 1,
            });
          } else if (labels && labels[labelIndex]) {
            labels[labelIndex].count += 1;
          }
        }
      }
    }
  }
  return labels;
}

function loadBoards(boards) {
  logger.log('LOADING BOARDS', boards);
  const boardNames = ['INBOX'];
  for (let i = 0; i < boards.length; i += 1) {
    const { name } = boards[i];
    if (name) {
      boardNames.push(name);
    }
  }

  return {
    boardList: [...new Set(boards)],
    boardNames: [...new Set(boardNames)],
  };
}

function loadFavs(favs) {
  logger.log('LOADING FAVS', favs);
  if (favs && favs.length) {
    return [...new Set(favs)];
  }
  return [];
}
// To avoid being garbage collected

module.exports = {
  loadBoards,
  loadFavs,
  loadLabels,
};

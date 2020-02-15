
export const NEW_CARD_TEMPLATE = {
  title: '',
  board: 'INBOX',
  text: `
  ## New card
  ### Shortcuts
  - ESC to **Discard Changes**
  - Ctrl+Enter to **Save Changes**
  - Double click on card to **Edit**
  - A to **Add**
`,
};

const getCardText = (title = NEW_CARD_TEMPLATE.title, text = NEW_CARD_TEMPLATE.text) => {
  if (title && text) {
    return `# ${title}
${text}`;
  }
  if (title && !text) {
    return `# ${title}`;
  }
  return text;
};
export default getCardText;

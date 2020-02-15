
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


export const getCardContent = (card) => {
  const {
    isEditing, text, title, editingText, editingTitle,
  } = card;
  return !isEditing
    ? { title, text }
    : { title: editingTitle, text: editingText };
};

const getCardText = (title = NEW_CARD_TEMPLATE.title, text = NEW_CARD_TEMPLATE.text) => `# ${title}
${text}`;

export default getCardText;

export default function assertNoteChanges(newNote, oldNote) {
  const noteProps = Object.keys(newNote);
  for (let i = 0; i < noteProps.length; i += 1) {
    const setting = noteProps[i];
    if (!oldNote[setting] || oldNote[setting] !== newNote[setting]) {
      return true;
    }
  }
  return false;
}

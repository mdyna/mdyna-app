const codeRegExp = new RegExp(/(?:```[a-z]*)(\n[\s\S]*)(?:\n```)/g);
const backticksRegExp = new RegExp(/(?:```[a-z]*)/g);

export default {
  codeRegExp,
  backticksRegExp,
};

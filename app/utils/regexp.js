const codeRegExp = new RegExp(/`{3}[\s\S]*?`{3}/g);
const backticksRegExp = new RegExp(/(?:```[a-z]*)/g);

export default {
  codeRegExp,
  backticksRegExp,
};

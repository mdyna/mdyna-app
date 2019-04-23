const codeRegExp = new RegExp(/`{3}[\s\S]*?`{3}/g);
const backticksRegExp = new RegExp(/(?:```[a-z]*)/g);
const extractTasksFromMarkdownRegExp = new RegExp(/^(- \[( |X)\]([^\n]+)*)/gm);

export default {
  codeRegExp,
  extractTasksFromMarkdownRegExp,
  backticksRegExp,
};

export default function ApplyTheme(theme) {
  const titleBarTitle = document.getElementById('titlebar');
  titleBarTitle.style.color = theme.text;
  titleBarTitle.style.background = theme.background;
}

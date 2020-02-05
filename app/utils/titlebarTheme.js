export default function ApplyTheme(theme) {
  const titleBarTitle = document.getElementById('titlebar');
  titleBarTitle.style.color = theme.text;
  titleBarTitle.style.background = theme.background;
  const rootElement = document.getElementById('root');
  rootElement.style.background = theme.background;
  const css = `
  ::-webkit-scrollbar-thumb  {
    background: ${theme.brand}
    }`;
  const scrollbarStyles = document.getElementById('scrollbar-style');
  if (scrollbarStyles) {
    scrollbarStyles.innerHTML = css;
  } else {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.setAttribute('id', 'scrollbar-style');
    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
  }
}

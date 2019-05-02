const tooltips = {
  keyboard: {
    title: 'Keyboard Shortcuts',
    text: `
- **A** - Add New Note
- **Left Arrow** - Previous Cards
- **Right Arrow** - Next Cards
- **Ctrl+P** - Quick Search
- **Ctrl+Enter** - Submit Note *while in editor*`,
  },
  markdown: {
    title: 'Markdown Guide',
    text: `
## Titles
- # Title
- ## Sub-Title
- ### Sub-sub-title ^^

## Formatting
- *Italic*
- **bold**
- ~~strikethrough~~

## Lists
- 1. Ordered List
* * OR - Unordered List
- - [ ] Task List

## Other

- \`inline code\`
- Code Snipet
\`\`\`javascript
code snippet
\`\`\`
- > quote
- [ Link Description ]( <URL> )
    `,
  },
};

export default tooltips;

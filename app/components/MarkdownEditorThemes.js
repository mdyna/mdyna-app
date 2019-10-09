export const CODE_THEMES = {
  'Atom One Dark': 'AOD',
  'Atom One Light': 'AOL',
  Dracula: 'DRA',
  Hopscoth: 'HPS',
  Monokai: 'MNK',
  'Solarized Dark': 'SLD',
  'Solarized Light': 'SLL',
  'Tomorrow Night Blue': 'TNB',
  Xterm: 'XTR',
};

export const codeThemes = {
  TNB: {
    codeComment: '#7285b7',
    codeTag: '#ff9da4',
    codeNumber: '#ffc58f',
    codeAttr: '#ffeead',
    codeString: '#d1f1a9',
    codeStatement: '#d1f1a9',
    code: '#fff',
    codeBackground: '#002451',
    codeProperty: '#bbdaff',
    codeFunction: '#bbdaff',
    codeKeyword: '#ebbbff',
    codeSelector: '#ff9da4',
  },
  XTR: {
    codeComment: '#969896',
    code: '#eaeaea',
    codeClass: '#da0000',
    codeKeyword: '#00ffff',
    codeNumber: '#ff0000',
    codeStatement: '#ff0000',
    codeSelector: '#fff000',
    codeString: '#00ff00',
    codeTag: '#000fff',
    codeFunction: '#000fff',
    codeProperty: '#000fff',
    codeAttr: '#ff00ff',
    codeBackground: '#000',
  },
  SLL: {
    code: '#657b83',
    codeTag: '#b58900',
    codeNumber: '#2aa198',
    codeString: '#2aa198',
    codeStatement: '#2aa198',
    codeComment: '#93a1a1',
    codeAttr: '#b58900',
    codeEntity: '#b58900',
    codeFunction: '#cb4b16',
    codeProperty: '#cb4b16',
    codeSelector: '#cb4b16',
    codeKeyword: '#859900',
    codeBackground: '#fdf6e3',
  },
  SLD: {
    code: '#839496',
    codeTag: '#b58900',
    codeNumber: '#2aa198',
    codeString: '#2aa198',
    codeStatement: '#2aa198',
    codeComment: '#586e75',
    codeEntity: '#859900',
    codeAttr: '#b58900',
    codeFunction: '#cb4b16',
    codeProperty: '#cb4b16',
    codeSelector: '#cb4b16',
    codeKeyword: '#859900',
    codeBackground: '#002b36',
  },
  HPS: {
    codeBackground: '#322931',
    code: '#b9b5b8',
    codeTag: '#dd464c',
    codeNumber: '#fd8b19',
    codeString: '#8fc13e',
    codeStatement: '#fdcc59',
    codeComment: '#989498',
    codeEntity: '#859900',
    codeAttr: '#fd8b19',
    codeFunction: '#1290bf',
    codeProperty: '#cb4b16',
    codeSelector: '#c85e7c',
    codeKeyword: '#c85e7c',
  },
  MNK: {
    codeBackground: '#272822',
    code: '#ddd',
    codeString: '#a6e22e',
    codeNumber: '#bf79db',
    codeTag: '#a6e22e',
    codeComment: '#75715e',
    codeAttr: '#bf79db',
    codeFunction: '#f92672',
    codeSelector: '#f92672',
    codeKeyword: '#f92672',
    codeStatement: '#f92672',
    codeEntity: '#a6e22e',
    codeProperty: '#a6e22e',
  },
  DRA: {
    codeBackground: '#282a36',
    code: '#f8f8f2',
    codeString: '#f1fa8c',
    codeNumber: '#f1fa8c',
    codeTag: '#8be9fd',
    codeComment: '#6272a4',
    codeAttr: '#f1fa8c',
    codeFunction: '#ff79c6',
    codeSelector: '#f8f8f2',
    codeKeyword: '#8be9fd',
    codeStatement: '#f1fa8c',
    codeEntity: '#ff79c6',
    codeProperty: '#ff79c6',
  },
  AOL: {
    codeBackground: '#fafafa',
    code: '#383a42',
    codeString: '#50a14f',
    codeNumber: '#986801',
    codeTag: '#4078f2',
    codeComment: '#a0a1a7',
    codeAttr: '#50a14f',
    codeFunction: '#4078f2',
    codeSelector: '#986801',
    codeKeyword: '#986801',
    codeStatement: '#986801',
    codeEntity: '#c18401',
    codeProperty: '#c18401',
  },
  AOD: {
    codeBackground: '#282c34',
    code: '#abb2bf',
    codeString: '#98c379',
    codeNumber: '#d19a66',
    codeTag: '#56b6c2',
    codeComment: '#5c6370',
    codeAttr: '#d19a66',
    codeFunction: '#c678dd',
    codeSelector: '#e06c75',
    codeKeyword: '#c678dd',
    codeStatement: '#e06c75',
    codeEntity: '#e06c75',
    codeProperty: '#56b6c2',
  },
};

export const getCodeTheme = codeTheme => codeThemes[CODE_THEMES[codeTheme]];

export const getEditorTheme = palette => ({
  fontFamily:
    '\'Metric\', \'Segoe UI\',Roboto,Oxygen, Ubuntu,Cantarell,\'Open Sans\',\'Helvetica Neue\',sans-serif',
  fontFamilyMono:
    '\'Fira Code\', \'SFMono-Regular\',Consolas,\'Liberation Mono\', Menlo, Courier,monospace',
  fontWeight: 400,
  fontSize: 18,
  zIndex: 100,
  link: palette.neutral[0],
  placeholder: '#B1BECC',
  textSecondary: '#4E5C6E',
  textLight: palette.neutral[0],
  selected: palette.neutral[0],
  codeComment: '#6a737d',
  codePunctuation: '#5e6687',
  codeNumber: '#d73a49',
  codeProperty: '#c08b30',
  codeTag: '#3d8fd1',
  codeString: '#032f62',
  codeSelector: '#6679cc',
  codeAttr: '#c76b29',
  codeEntity: '#22a2c9',
  codeKeyword: '#d73a49',
  codeFunction: '#6f42c1',
  codeStatement: '#22a2c9',
  codePlaceholder: '#3d8fd1',
  codeInserted: '#202746',
  codeImportant: '#c94922',

  background: 'transparent',
  text: palette.neutral[0],
  code: palette.neutral[0],

  toolbarBackground: palette.dark[0],
  toolbarInput: palette.neutral[0],
  toolbarItem: palette.brand,

  blockToolbarBackground: palette.dark[1],
  blockToolbarTrigger: palette.dark[1],
  blockToolbarTriggerIcon: palette.brand,
  blockToolbarItem: palette.brand,

  tableDivider: palette.neutral,
  tableSelected: palette.brand,
  tableSelectedBackground: '#E5F7FF',

  quote: palette.neutral,
  codeBackground: palette.neutral,
  codeBorder: palette.neutral[0],
  horizontalRule: palette.neutral,
  imageErrorBackground: palette.neutral,
});

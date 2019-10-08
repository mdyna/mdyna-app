import MdynaPalette from './mdyna.palette.json';
import WhitePalette from './mdyna-white.palette.json';

const ThemeBuilder = colors => colors && {
  global: {
    colors: {
      brand: colors.brand,
      background: colors.background,
      focus: colors.brand,
      accent: colors.accent,
      dark: colors.dark,
      light: colors.light,
      text: colors.text,
      neutral: colors.neutral,
      border: {
        dark: colors.brand,
        light: colors.text,
      },
      'accent-1': colors.accent[0],
      'accent-2': colors.accent[1],
      'accent-3': colors.accent[2],
      'neutral-1': colors.neutral[0],
      'neutral-2': colors.neutral[1],
      'dark-1': colors.dark[0],
      'dark-2': colors.dark[1],
      'dark-3': colors.dark[2],
      control: {
        dark: colors.dark[0],
        light: colors.light[0],
      },
      hover: {
        color: {
          dark: colors.dark[0],
          light: colors.light[0],
        },
      },
      'light-1': colors.light[0],
      'light-2': colors.light[1],
    },
    font: {
      family: '\'Metric\', Arial, sans-serif',
      face: `@font-face {
              font-family: "Metric";
              src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Regular.woff") format('woff');
            }
            @font-face {
              font-family: "Metric";
              src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Bold.woff") format('woff');
              font-weight: 700;
            }
            @font-face {
              font-family: "Metric";
              src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Semibold.woff") format('woff');
              font-weight: 600;
            }
            @font-face {
              font-family: "Metric";
              src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Light.woff") format('woff');
              font-weight: 100;
            }`,
    },
    drop: {
      background: 'transparent',
    },
  },
  focus: {
    border: {
      color: colors.brand,
    },
  },
  button: {
    colors: {
      text: colors.brand,
    },
  },
  icon: {
    brand: colors.brand,
  },
  input: {
    colors: {
      brand: colors.brand,
      accent: [colors.accent[0], colors.accent[1]],
      text: colors.brand,
    },
  },
  textInput: {
    suggestions: {
      extend: {
        borderRadius: 10,
        background: colors.dark[0],
        button: {
          borderRadius: 5,
        },
      },
    },
  },
  layer: {
    background: colors.background,
    color: colors.text,
  },
  menu: {
    extend: {
      borderRadius: 10,
      button: {
        borderRadius: 5,
        margin: 3,
      },
    },
  },
  collapsible: {
    extend: {
      height: 0,
    },
  },
  select: {
    container: {
      extend: {
        background: colors.dark[0],
      },
    },
    icons: {
      color: colors.brand,
    },
  },
};

export default ThemeBuilder;

export const getPalette = whiteMode => (whiteMode ? WhitePalette : MdynaPalette);

export const getTheme = whiteMode => (whiteMode ? ThemeBuilder(WhitePalette) : ThemeBuilder(MdynaPalette));

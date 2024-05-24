/**
 * com/smartone/theme/DefaultTheme
 **/
import { createTheme, Theme, ThemeOptions } from "@material-ui/core";
import createBreakpoints, {
  Breakpoint,
  Breakpoints,
  BreakpointsOptions,
  BreakpointValues,
} from "@material-ui/core/styles/createBreakpoints";
import { TypographyStyleOptions } from "@material-ui/core/styles/createTypography";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { isRem } from "@smt/util/CssUtils";

const COLOR_PRIMARY = "#ff0217";
const DIVIDER_COLOR = "#ccc";
const TEXT_COLOR_PRIMARY = "#333";
const TEXT_COLOR_SECONDARY = "#9E9E9E";
const TEXT_COLOR_LIGHT = "#707070";
const TEXT_COLOR_LIGHTER = "#ccc";
// button
// -> secondary
const BUTTON_BG_SECONDARY = "#f8f8f8";
const BUTTON_BG_SECONDARY_HOVER = "#d8d8d8";
const BUTTON_COLOR_SECONDARY = TEXT_COLOR_PRIMARY;

const COLOR_LOADING_MODAL = "#f8f8f8";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    loadingModal: PaletteColor;
  }
  interface PaletteOptions {
    loadingModal: PaletteOptions["primary"];
  }
}
declare module "@material-ui/core/styles/createPalette" {
  interface TypeText {
    light: string;
    lighter: string;
  }
}

declare module "@material-ui/core/styles/createTheme" {
  export interface Theme {
    $product: {
      detail: {
        "addon-selector": {
          "group-order": (
            | "optional_premium"
            | "required_premium"
            | "screen_replace"
          )[];
          "screen-replace-group-col": number;
          "optional-premium-group-col": number;
          "required-premium-group-col": number;
        };
      };
    };
    "$sticky-header"?: {
      [key in Breakpoint]: {
        top: string;
      };
    };
  }
}
// currently, no way to add more breakpoints
export function getDefaultTheme(p: {isEng?: boolean} & Record<any,any>) {
	const {isEng=true, ...customTheme} = p;
  const customBreakpoints: BreakpointsOptions = {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 1024,
      xl: 1366,
      //,
      //xxl: 1600,
      //xxxl: 1920
    },
  };

  const themeWithBreakpoints = createTheme({
    breakpoints: customBreakpoints,
  });
  const breakpoints = themeWithBreakpoints.breakpoints;

  const getButton = function (
    size: "small" | "medium" | "large"
  ): CSSProperties {
    const fontSizes = {
      small: "1.4rem",
      medium: "1.6rem",
      large: "1.8rem",
    };
    return {
      fontFamily:
        '"titling-gothic-fb-narrow", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif',
      fontWeight: 500,
      fontSize: fontSizes[size],
      /*,
			 [breakpoints.up("md")]: {
				 fontSize: "1.8rem"
			 }*/
    };
  };
  const getBody1 = function () {
    return {
      fontFamily:
        '"titling-gothic-fb-narrow", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif',
      fontWeight: isEng ? 300 : 400,
      fontSize: "1.4rem",
      [breakpoints.up("md")]: {
        fontSize: "1.4rem",
      },
    };
  };
  const getBody2 = function () {
    return {
      fontFamily:
        '"titling-gothic-fb-narrow", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif',
      fontWeight: isEng ? 300 : 400,
      fontSize: "1.6rem",
      [breakpoints.up("md")]: {
        fontSize: "1.8rem",
      },
    };
  };

  const getSubtitle1 = function (): TypographyStyleOptions {
    return {
      fontFamily:
        '"titling-gothic-fb-narrow", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif',
      fontWeight: 500,
      fontSize: "1.6rem",
      lineHeight: 1.4,
      [breakpoints.up("md")]: {
        fontSize: "1.8rem",
      },
    };
  };
  const getSubtitle2 = function (): TypographyStyleOptions {
    return {
      fontFamily:
        '"titling-gothic-fb-narrow", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif',
      fontWeight: 500,
      fontSize: "1.8rem",
      lineHeight: 1.4,
      [breakpoints.up("md")]: {
        fontSize: "2.4rem",
      },
    };
  };

  const getCaption = function (): TypographyStyleOptions {
    return {
      fontFamily:
        '"titling-gothic-fb-narrow", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif',
      fontWeight: isEng ? 300 : 400,
      fontSize: "1.2rem",
      lineHeight: 1.4,
      [breakpoints.up("md")]: {
        fontSize: "1.2rem",
      },
    };
  };

  const defaultTheme: ThemeOptions = {
    breakpoints: customBreakpoints,
    // change the default props
    overrides: {
      MuiAccordionSummary: {
          root: {
              "padding": "0"
          },
          content: {
              flexGrow: "initial",
              position: "relative",
              margin: "20px 0 0",
              "&:before, &:after": {
                  "content": "''",
                  "position": "absolute",
                  "top": "50%",
                  "marginTop": "-1px",
                  "display": "inline-block",
                  "height": "2px",
                  "width": "10px",
                  "right": "-26px",
                  "background": "#9E9E9E",
                  "webkitTransformOrigin": "50% 50%",
                  "mozTransformOrigin": "50% 50%",
                  "msTransformOrigin": "50% 50%",
                  "oTransformOrigin": "50% 50%",
                  "transformOrigin": "50% 50%",
                  "webkitBackfaceVisibility": "hidden",
                  "backfaceVisibility": "hidden",
                  "webkitTransition": "width 0.3s, -webkit-transform 0.3s",
                  "mozTransition": "width 0.3s, -moz-transform 0.3s",
                  "transition": "width 0.3s, transform 0.3s"
              },
              "&:before": {
                  "webkitTransform": "rotate(-45deg)",
                  "mozTransform": "rotate(-45deg)",
                  "msTransform": "rotate(-45deg)",
                  "oTransform": "rotate(-45deg)",
                  "transform": "rotate(-45deg)",
              },
              "&:after": {
                  "webkitTransform": "rotate(45deg)",
                  "mozTransform": "rotate(45deg)",
                  "msTransform": "rotate(45deg)",
                  "oTransform": "rotate(45deg)",
                  "transform": "rotate(45deg)",
                  "right": "-20px"
              },
              "&.Mui-expanded:before": {
                  "webkitTransform": "rotate(45deg)",
                  "mozTransform": "rotate(45deg)",
                  "msTransform": "rotate(45deg)",
                  "oTransform": "rotate(45deg)",
                  "transform": "rotate(45deg)",
              },
              "&.Mui-expanded:after": {
                  "webkitTransform": "rotate(-45deg)",
                  "mozTransform": "rotate(-45deg)",
                  "msTransform": "rotate(-45deg)",
                  "oTransform": "rotate(-45deg)",
                  "transform": "rotate(-45deg)",
              }
          },
      },
      MuiAccordionDetails: {
          root: {
              "padding": "0"
          }
      },
    },
    props: {
      MuiCheckbox: {
        color: "primary",
      },
      MuiRadio: {
        color: "primary",
      },
    },
    palette: {
      divider: DIVIDER_COLOR,
      primary: {
        main: COLOR_PRIMARY,
      },
      loadingModal: {
        main: COLOR_LOADING_MODAL,
      },
      text: {
        primary: TEXT_COLOR_PRIMARY,
        secondary: TEXT_COLOR_SECONDARY,
        light: TEXT_COLOR_LIGHT,
        lighter: TEXT_COLOR_LIGHTER,
      },
    },
    typography: {
      htmlFontSize: 10,
      /*
			 allVariants: {
				 color: TEXT_COLOR_PRIMARY
			 },*/
      body1: getBody1(),
      body2: getBody2(),

      // Tell Material-UI what the font-size on the html element is.
      h1: getHeading(breakpoints, "3rem", "6rem"),
      h2: getHeading(breakpoints, "2.0rem", "4.0rem"),
      h3: getHeading(breakpoints, "2.4rem", "3.4rem"),
      h4: getHeading(breakpoints, "2.0rem", "2.8rem"),
      h5: getHeading(breakpoints, "1.8rem", "2.0rem"),
      h6: getHeading(breakpoints, "1.6rem", "1.8rem"),

      subtitle1: getSubtitle1(),
      subtitle2: getSubtitle2(),

			caption: getCaption()
    },
    zIndex: {
      mobileStepper: 1000,
      speedDial: 1050,
      appBar: 9999,
      drawer: 10000,
      modal: 10001,
      snackbar: 10002,
      tooltip: 10003,
    },
  };
  // define font-size in "rem" based on html font size 10px for easy coding
  const defaultHtmlFontSize = 10;
  // "htmlFontSize" in custom theme would NOT affect our default theme's font size
  // it would only affect default mui styles
  // need to scale font size in our default theme
  const htmlFontSize: number | undefined = getHtmlFontSize(customTheme);
  if (htmlFontSize === undefined) {
    console.log(
      "No custom htmlFontSize, assume it is " + defaultHtmlFontSize + "."
    );
  } else {
    console.log(
      "Custom htmlFontSize is " +
        htmlFontSize +
        " (default is " +
        defaultHtmlFontSize +
        ")"
    );
    if (htmlFontSize != defaultHtmlFontSize) {
      console.log("Do font size transformation");
      transformHtmlFontSize(defaultTheme, defaultHtmlFontSize, htmlFontSize);
    }
  }

  const result =
    typeof customTheme == "undefined"
      ? createTheme(defaultTheme)
      : createTheme(defaultTheme, customTheme);
  //console.log(JSON.stringify(result));

  return result;
}

// helping
function getHtmlFontSize(customTheme: object | undefined): number | undefined {
  if (customTheme && "typography" in customTheme) {
    const typography = (customTheme as any).typography;
    if (typography && "htmlFontSize" in typography) {
      const htmlFontSize = (typography as any).htmlFontSize;
      if (typeof htmlFontSize == "number") {
        return htmlFontSize as number;
      }
    }
  }
  return undefined;
}
function transformHtmlFontSize(
  theme: ThemeOptions,
  defaultHtmlFontSize: number,
  customHtmlFontSize: number
) {
  function loopObject(obj: any) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (typeof element == "object") {
          obj[key] = loopObject(element);
        } else {
          if (key == "fontSize" && typeof element == "string") {
            obj[key] = applyHtmlFontSize(
              element,
              defaultHtmlFontSize,
              customHtmlFontSize
            );
          }
        }
      }
    }
    return obj;
  }
  return loopObject(theme as any);
}
function applyHtmlFontSize(
  style: string,
  defaultHtmlFontSize: number,
  customHtmlFontSize: number
) {
  return isRem(style)
    ? `calc((${style}) * ${defaultHtmlFontSize} / ${customHtmlFontSize})`
    : style;
}
function getHeading(
  breakpoints: Breakpoints,
  mobileFontSize: string,
  desktopFontSize: string
) {
  return {
    fontFamily:
      '"titling-gothic-fb-condensed", "Noto Sans TC", "MHei", "微軟正黑體", "Microsoft JhengHei", sans-serif',
    fontWeight: 500,
    fontSize: mobileFontSize,
    [breakpoints.up("md")]: {
      fontSize: desktopFontSize,
    },
  };
}
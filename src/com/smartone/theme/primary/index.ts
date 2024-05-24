import createBreakpoints from '@smt/theme/util/createBreakpoint';
const breakpoint = createBreakpoints({});

export type BreakpointDefaults = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TypographyDefaults = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'subTitle1' | 'font';

export type BreakpointValues = { [key in BreakpointDefaults]: number };

export type TypographyValue = {
    [key: string]: string;
};

export type TypographyValues = { [key in TypographyDefaults]: TypographyValue };

export interface ZIndex {
    mobileStepper: number;
    speedDial: number;
    appBar: number;
    drawer: number;
    modal: number;
    snackbar: number;
    tooltip: number;
}

export interface Theme {
    breakpoints: any;
    zIndex: ZIndex;
    typography: TypographyValues;
    color: {};
} 

export const themePrimary: Theme = {
    breakpoints: breakpoint,
    // breakpoints: {
    //     keys: ['xs', 'sm', 'md', 'lg', 'xl'],
    //     values: {
    //         xs: 0,
    //         sm: 600,
    //         md: 900,
    //         lg: 1200,
    //         xl: 1536,
    //     },
    // },
    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
    typography: {
        font: {
            titlingGothicFBNarrowTC: '"NotoSansCondBold","Noto Sans","Noto Sans TC","MHei","微軟正黑體","Microsoft JhengHei",sans-serif',
            titlingGothicFBNarrowEN: '"titling-gothic-fb-condensed","Noto Sans","Noto Sans TC","MHei","微軟正黑體","Microsoft JhengHei",sans-serif',
        },
        h1: {
            fontSize: '6rem',
        },
        h2: {
            fontSize: '4rem',
        },
        h3: {
            fontSize: '2.4rem',
        },
        h4: {
            fontSize: '2.2rem',
        },
        h5: {
            fontSize: '2rem',
        },
        h6: {
            fontSize: '1.8rem',
        },
        p: {
            fontSize: '1.6rem',
        },
        subTitle1: {
            fontSize: '1.4rem',
        },
    },
    color: {
        smtTheme: '#FF0000',
        text: {
            black: '#000000',
            gray: '#666666',
						grayLight: '#cccccc'
        },
    },
};

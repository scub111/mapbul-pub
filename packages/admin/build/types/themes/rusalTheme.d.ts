export interface IStyledProps {
    theme?: ITheme;
}
export interface ITheme {
    palette: IPalette;
    container: IBaseContainer;
}
export interface IPalette {
    Basic1000: string;
    Basic900: string;
    Basic800: string;
    Basic700: string;
    Basic500: string;
    Basic400: string;
    Basic300: string;
    Basic200: string;
    Basic100: string;
    Purple800: string;
    Purple600: string;
    Purple500: string;
    Blue: string;
    Red: string;
    Red500: string;
    Orange500: string;
    Green500: string;
    StandardBlack: string;
    StandardWhite: string;
    Shadow: string;
    Background: string;
    Green: string;
    Black: string;
    BlackTxt: string;
}
export interface IBaseContainer {
    minWidth?: string;
    maxWidth?: string;
}
export declare const rusalTheme: any;

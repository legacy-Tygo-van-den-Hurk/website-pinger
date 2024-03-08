import Terminal from "./Terminal";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FORE-, and BACKGROUND COLOR CLASS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** An enum to represent the colors that a String can have as a foreground. */
export enum ForegroundColor {
    reset = "\u001b[0m",
    black = "\u001b[30m",
    red = "\u001b[31m",
    green = "\u001b[32m",
    yellow = "\u001b[33m",
    blue = "\u001b[34m",
    magenta = "\u001b[35m",
    cyan = "\u001b[36m",
    white = "\u001b[37m",
    default = ""
}

/** An enum to represent the colors that a String can have as a background. */
export enum BackgroundColor {
    reset = "\u001b[0m",
    black = "\u001b[40m",
    red = "\u001b[41m",
    green = "\u001b[42m",
    yellow = "\u001b[43m",
    blue = "\u001b[44m",
    magenta = "\u001b[45m",
    cyan = "\u001b[46m",
    white = "\u001b[47m",
    default = ""
}

/** An enum for the styles. */
enum Style { reset = "\u001b[0m" }

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PAINTED STRING CLASS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/**
 * A class for strings that have a background color, or a foreground color.
 */
export default class PaintedString extends String {

    /**
     * The foreground color this string has.
     */
    public readonly foreground:ForegroundColor;

    /** 
     * The background color this string has.
     */
    public readonly background:BackgroundColor;

    /** 
     * The text this painted string has.
     */
    public readonly text:string;

    /**
     * Creates a new PaintedString.
     * 
     * @param { string } text the text to paint
     * @param { ForegroundColor } foreground the foreground color
     * @param { BackgroundColor } background the background color
     */
    public constructor(text:string, foreground:ForegroundColor, background:BackgroundColor) {
        super();

        this.text = text;
        this.foreground = foreground;
        this.background = background;
    }

    /** 
     * Returns the colored string.
     */
    public toString() {
        if (! Terminal.getPrintsColor()) return this.text;
        else return (
            `${this.foreground}${this.background}${this.text}${Style.reset}`
        );
    }

    /** 
     * Paints a string a certain fore-, and background.
     */
    public static createFrom(text:string, foreground:ForegroundColor, background:BackgroundColor):PaintedString  {
        return (new PaintedString(text, foreground, background));
    }

    /** 
     * Paints a string as if it is a method.
     */
    public static paintAsClass(text:string):PaintedString {
        return (this.createFrom(
            text,
            ForegroundColor.green,
            BackgroundColor.default
        ));
    }

    /**
     * Paints a string as if it is a method.
     */
    public static paintAsMethod(text:string):PaintedString {
        return (this.createFrom(
            text,
            ForegroundColor.yellow,
            BackgroundColor.default
        ));
    }

    /** 
     * Paints a string as if it is a variable.
     */
    public static paintAsVariable(text:string):PaintedString {
        return (this.createFrom(
            text,
            ForegroundColor.blue,
            BackgroundColor.default
        ));
    }
}
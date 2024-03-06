/** A class that bundles all the Terminal Functions together. */
export default abstract class Terminal {

    /** An object that store the escape codes for printing colors in the console. */
    public static readonly colors = {

        /** Resets the color settings of the terminal back to default. */
        reset:   "\u001b[0m",

        /** An object that store the escape codes for the foreground colors. */
        foreground : {
            black:   "\u001b[30m",
            red:     "\u001b[31m",
            green:   "\u001b[32m",
            yellow:  "\u001b[33m",
            blue:    "\u001b[34m",
            magenta: "\u001b[35m",
            cyan:    "\u001b[36m",
            white:   "\u001b[37m",
        },

        /** An object that store the escape codes for the background colors. */
        background : {
            black:   "\u001b[40m",
            red:     "\u001b[41m",
            green:   "\u001b[42m",
            yellow:  "\u001b[43m",
            blue:    "\u001b[44m",
            magenta: "\u001b[45m",
            cyan:    "\u001b[46m",
            white:   "\u001b[47m",
        }
    }

    /** Stores wether or not the Terminal is printing in color. */
    private static printsColor:boolean = true;

    /** Toggles the ability of the Terminal to print color. */
    public static togglePrintsColor():void  {
        Terminal.printsColor = (! Terminal.printsColor);
    }
    
    /** Returns wether or not the Terminal prints in color. */
    public static getPrintsColor():boolean  {
        return (Terminal.printsColor);
    }

    /** Sets the ability to print color to the provided argument. */
    public static setPrintsColor(newState:boolean):void  {
        Terminal.printsColor = (newState);
    }

    /**
     * Returns a string of the following format: `[YYYY-MM-DD @ HH:mm:ss]`.
     * 
     * Starting with the date:
     * - Where `YYYY` is a 4 character string containing the year as a number.
     * - Where `MM` is a 2 character string containing the the month as a number.
     * - Where `DD` is a 2 character string containing the the day of the month as a number.
     * 
     * Following the time:
     * - Where `HH` is a 2 character string with the hours as a number. 
     * - Where `mm` is a 2 character string with the minutes as a number.
     * - Where `ss` is a 2 character string with the seconds as a number.
     * 
     * @param time 
     * @returns 
     */
    private static getTimeBlock(time?:Date):string {
        if (! time) time = new Date();

        const YYYY:string = (`${time.getFullYear()}`);
        const MM:string = ( (time.getMonth() < 10) ? (`0${time.getMonth()}`) : (`${time.getMonth()}`) );
        const DD:string = ( (time.getMonth() < 10) ? (`0${time.getMonth()}`) : (`${time.getMonth()}`) );

        const HH:string = ( (time.getHours() < 10) ? (`0${time.getHours()}`) : (`${time.getHours()}`) );
        const mm:string = ( (time.getMinutes() < 10) ? (`0${time.getMinutes()}`) : (`${time.getMinutes()}`) );
        const ss:string = ( (time.getSeconds() < 10) ? (`0${time.getSeconds()}`) : (`${time.getSeconds()}`) );

        const dateString:string = (`${YYYY}-${MM}-${DD}`);
        const timeString:string = (`${HH}:${mm}:${ss}`);

        const coloredDateString:string = Terminal.paintString(dateString, Terminal.colors.foreground.cyan, "");
        const coloredTimeString:string = Terminal.paintString(timeString, Terminal.colors.foreground.cyan, "");
        
        return (
            `[${coloredDateString} @ ${coloredTimeString}]`
        );
    }

    /** Paints a String a foreground color, and a background color. */
    public static paintString(text:string, foreground:string, background:string):string  {
        
        var reset = Terminal.colors.reset;
        /** Setting the foreground, and the background to the empty string if the terminal doesn't print in color. */ {
            if (! Terminal.printsColor) foreground = ""; 
            if (! Terminal.printsColor) background = ""; 
            if (! Terminal.printsColor) var reset = ""; 
        }
        
        return (
            `${foreground}${background}${text}${reset}`
        );
    }


    private static privateLog(symbol:string, argument?:any):void {

        if (argument === null || argument === undefined) {
            console.log();
            return;
        }

        if ((typeof argument).toLowerCase() === "string" && argument?.trim().length === 0) {
            console.log();
            return;
        }
     
        const message:string = (`${symbol} ${Terminal.getTimeBlock()} : ${argument}`);
        if (symbol.toLowerCase().includes("error")) console.error(message);
        else if (symbol.toLowerCase().includes("warning")) console.warn(message);
        else console.log(message);
    }

    /** Prints a line to the Terminal. */
    public static println(argument?:any):void  {

        const symbol:string = Terminal.paintString("[ MESSAGE ]", 
            Terminal.colors.foreground.black, 
            Terminal.colors.background.white
        );
        
        Terminal.privateLog(symbol, argument);
    }

    /** Prints a warning line to the Terminal. */
    public static warn(argument:any):void  {

        const symbol:string = Terminal.paintString("[ WARNING ]", 
            Terminal.colors.foreground.black, 
            Terminal.colors.background.yellow
        );

        Terminal.privateLog(symbol, argument);
    }

    /** Prints an Error line to the Terminal. */
    public static error(argument:any):void  {

        const symbol:string = Terminal.paintString("[  ERROR  ]", 
            Terminal.colors.foreground.black, 
            Terminal.colors.background.red
        );

        Terminal.privateLog(symbol, argument);
    }

    /** Prints an Error line to the Terminal. */
    public static urgent(argument:any):void  {

        const symbol:string = Terminal.paintString("[  URGENT ]", 
            Terminal.colors.foreground.black, 
            Terminal.colors.background.magenta
        );

        Terminal.privateLog(symbol, argument);
    }

    /** Prints an Error line to the Terminal. */
    public static success(argument:any):void  {

        const symbol:string = Terminal.paintString("[ SUCCESS ]", 
            Terminal.colors.foreground.black, 
            Terminal.colors.background.green
        );

        Terminal.privateLog(symbol, argument);
    }

    /** Prints an Error line to the Terminal. */
    public static event(argument:any):void  {

        const symbol:string = Terminal.paintString("[  EVENT  ]", 
            Terminal.colors.foreground.black, 
            Terminal.colors.background.blue
        );

        Terminal.privateLog(symbol, argument);
    }
}

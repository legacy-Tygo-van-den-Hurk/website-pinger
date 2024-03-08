import PaintedString, { BackgroundColor, ForegroundColor } from "./PaintedString"
import DateAndTime from "./DateAndTime";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TERMINAL CLASS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** A class that bundles all the Terminal Functions together. */
export default abstract class Terminal {

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PRINTING COLOR ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

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
    
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BEING VERBAL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    private static verbal:boolean = false;
    
    /** Toggles the ability of the Terminal to print non-warning, non-event, or non-error messages. */
    public static toggleVerbal():void  {
        Terminal.verbal = (! Terminal.verbal);
    }

    /** Returns wether or not the Terminal prints non-warning, non-event, or non-error messages. */
    public static getVerbal():boolean  {
        return (Terminal.verbal);
    }

    /** Sets the ability to print non-warning, non-event, or non-error messages to the provided argument. */
    public static setVerbal(newState:boolean):void  {
        Terminal.verbal = (newState);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ PRINTING MESSAGES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

    /**
     * Print the symbol, and the argument to the console.
     */
    private static privateLog(symbol:String, argument?:any):void {

        /** if the message to log was empty, then insert an empty line */ {
            if (argument === null || argument === undefined && Terminal.verbal) {
                console.log();
                return;
            }
    
            if ((typeof argument).toLowerCase() === "string" && argument?.trim().length === 0 && Terminal.verbal) {
                console.log();
                return;
            }
        }
     
        /** Print the message to the appropriate console */ {
            const message:string = (`${symbol} ${DateAndTime.getDateAndTime()} : ${argument}`);
            if (symbol.toLowerCase().includes("error")) console.error(message);
            else if (symbol.toLowerCase().includes("warning")) console.warn(message);
            else if (symbol.toLowerCase().includes("event")) console.log(message);
            else if (symbol.toLowerCase().includes("urgent")) console.log(message);
            else if (Terminal.verbal) console.log(message);
        }
    }

    /** 
     * Prints a line to the Terminal.
     */
    public static println(argument?:any):void  {

        const symbol:PaintedString = PaintedString.createFrom("[ MESSAGE ]", 
            ForegroundColor.black, 
            BackgroundColor.white
        );
        
        Terminal.privateLog(symbol, argument);
    }

    /** 
     * Prints a warning line to the Terminal.
     */
    public static warn(argument:any):void  {

        const symbol:PaintedString = PaintedString.createFrom("[ WARNING ]", 
            ForegroundColor.black, 
            BackgroundColor.yellow
        );

        Terminal.privateLog(symbol, argument);
    }

    /** 
     * Prints an Error line to the Terminal.
     */
    public static error(argument:any):void  {

        const symbol:PaintedString = PaintedString.createFrom("[  ERROR  ]", 
            ForegroundColor.black, 
            BackgroundColor.red
        );

        Terminal.privateLog(symbol, argument);
    }

    /**
     * Prints an Error line to the Terminal.
     */
    public static urgent(argument:any):void  {

        const symbol:PaintedString = PaintedString.createFrom("[  URGENT ]", 
            ForegroundColor.black, 
            BackgroundColor.magenta
        );

        Terminal.privateLog(symbol, argument);
    }

    /** 
     * Prints an Error line to the Terminal. 
     */
    public static success(argument:any):void  {

        const symbol:PaintedString = PaintedString.createFrom("[ SUCCESS ]", 
            ForegroundColor.black, 
            BackgroundColor.green
        );

        Terminal.privateLog(symbol, argument);
    }

    /**
     * Prints an Error line to the Terminal.
     */
    public static event(argument:any):void  {

        const symbol:PaintedString = PaintedString.createFrom("[  EVENT  ]", 
            ForegroundColor.black, 
            BackgroundColor.blue
        );

        Terminal.privateLog(symbol, argument);
    }
}

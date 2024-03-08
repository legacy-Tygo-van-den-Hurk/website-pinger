import PaintedString, { BackgroundColor, ForegroundColor } from "./PaintedString"


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DATE AND TIME CLASS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** An interface of what a date and time block will look like. */
export default class DateAndTime {

    /** Stores the date of the object. */
    private readonly date:PaintedString;

    /** Stores the time of the object. */
    private readonly time:PaintedString;

    /**
     * Creates a new date and time object.
     * 
     * @pre the date, and time must both be in their respective formates. See below for more info.
     * @param { PaintedString } date the date in `YYYY-MM-DD` format.
     * @param { PaintedString } time the time in `HH-mm-ss` format.
     */ 
    public constructor(date:PaintedString, time:PaintedString) {

        /* Pre-Condition Guard-Statements */ {
            if (! new RegExp('\\d\\d\\d\\d-\\d\\d-\\d\\d').test(date.text)) throw new Error(
                `${PaintedString.paintAsClass("DateAndTime")}.${PaintedString.paintAsMethod("constructor")}(` +
                `${PaintedString.paintAsVariable("date")}:${PaintedString.paintAsClass("PaintedString")}, ` +
                `${PaintedString.paintAsVariable("time")}:${PaintedString.paintAsClass("PaintedString")}` +
                `).${PaintedString.paintAsVariable("pre")} was violated, ` + 
                `the date (${PaintedString.paintAsVariable(date.text)}) ` +
                `is not of the formate ${PaintedString.paintAsVariable("/\\d\\d\\d\\d-\\d\\d-\\d\\d/")}`
            );
            
            if (! new RegExp('\\d\\d:\\d\\d:\\d\\d').test(time.text)) throw new Error(
                `${PaintedString.paintAsClass("DateAndTime")}.${PaintedString.paintAsMethod("constructor")}(` +
                `${PaintedString.paintAsVariable("date")}:${PaintedString.paintAsClass("PaintedString")}, ` +
                `${PaintedString.paintAsVariable("time")}:${PaintedString.paintAsClass("PaintedString")}` +
                `).${PaintedString.paintAsVariable("pre")} was violated, ` + 
                `the time (${PaintedString.paintAsVariable(time.text)}) ` +
                `is not of the formate ${PaintedString.paintAsVariable("/\\d\\d:\\d\\d:\\d\\d/")}`
            );
        }

        this.date = date;
        this.time = time;
    };

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
     * @param { Date, undefined } time the Date object of from what to create the date and time object.
     * @returns a new DateAndTime Object
     */
    public static getDateAndTime(time?:Date):DateAndTime {
        
        const foreground:ForegroundColor = ForegroundColor.cyan;
        const background:BackgroundColor = BackgroundColor.default;

        if (! time) time = new Date();

        var coloredDateString:PaintedString;
        /* Creating a painted string of the  */ {
            const YYYY:string = (`${time.getFullYear()}`);
            const MM:string = ( (time.getMonth() < 10) ? (`0${time.getMonth()}`) : (`${time.getMonth()}`) );
            const DD:string = ( (time.getMonth() < 10) ? (`0${time.getMonth()}`) : (`${time.getMonth()}`) );
    
            const dateString:string = (`${YYYY}-${MM}-${DD}`);
    
            coloredDateString = PaintedString.createFrom(dateString, foreground, background);
        }
        
        var coloredTimeString:PaintedString;
        /* */ {
            const HH:string = ( (time.getHours() < 10) ? (`0${time.getHours()}`) : (`${time.getHours()}`) );
            const mm:string = ( (time.getMinutes() < 10) ? (`0${time.getMinutes()}`) : (`${time.getMinutes()}`) );
            const ss:string = ( (time.getSeconds() < 10) ? (`0${time.getSeconds()}`) : (`${time.getSeconds()}`) );
    
            const timeString:string = (`${HH}:${mm}:${ss}`);
    
            coloredTimeString = PaintedString.createFrom(timeString, foreground, background);
        }
        
        return (new DateAndTime(coloredDateString, coloredTimeString));
    }

    /**
     * returns a string of the object.
     */
    public toString():string {
        return (`[${this.date} @ ${this.time}]`);
    }
}
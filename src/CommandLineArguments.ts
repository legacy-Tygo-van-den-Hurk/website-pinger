import { Command } from "commander";
import Terminal from "./Terminal";

/** The command line parser. */
const program = new Command();

/* Defining the name, description, version, etc. of the application */ {
    (program
        .name("website-pinger")
        .description("An application to make sure that certain domains are up.")
        .version("0.8.0")
        .usage("[Options] ...")
    );
}

/** The shape the command line arguments must take. */
export interface CommandLineArguments { // TODO keep up-to-date with the options below:
    // Terminal options:
    verbose?:boolean,
    monochrome?:boolean,
    // The service provider (and authentication):
    serviceProvider?:string|null,
    user?:string|null,
    password?:string|null,
    recipient?:string[]|null,
    // Server options:
    port?:number,
    domains?:string[],
    interval?:string|null
}

/* Defining the command line arguments*/ {
    ( program
        // Terminal options:
        .option(
            "-v, --verbose", 
            "Print all messages to the terminal. If not provided, " +
            "then only warnings, events, and errors will be printed."
        ).option(
            "-m, --monochrome", 
            "Print all messages without color. If not provided, then"
        )
        // The service provider (and authentication):
        .option( 
            "-S, --service-provider [value]", 
            "sets the service provider"
        ).option(
            "-U, --user [value]", 
            "sets the user for the service provider"
        ).option(
            "-P, --password [value]", 
            "sets the password for the service provider"
        ).option(
            "-R, --recipient [value]", 
            "sets the recipient for alerts", 
            (value:string, previous:string[]) => {
                if (!previous) return [value];
                previous.push(value);
                return previous;
            }
        ) 
        // Server options:
        .option(
            "-p, --port [number]", 
            "sets the port that the application should listen to", 
            parseInt
        ).option(
            "-d, --domain [value]", 
            "adds a domain to check", 
            (value:string, previous:string[]) => {
                if (!previous) return [value];
                previous.push(value);
                return previous;
            }
        ).option(
            "-i, --interval [value]", 
            "sets the interval to check the domains"
        )
    );
}

//// /* Defining the commands*/ {
////     program.command("split")
////         .description("Split a string into substrings and display as an array")
////         .argument("<string>", "string to split")
////         .option("--first", "display just the first substring")
////         .option("-s, --separator <char>", "separator character", ",")
////         .action((str, options) => {
////     });
//// }

/** The class to deal with command line arguments. */
export default abstract class CommandLineArgumentsParser {

    /** The options that the parser has found last time it parsed */
    private static parsedOptions:CommandLineArguments;

    /** Parses the given options to the process. */
    public static getArguments():CommandLineArguments {

        /* if it has already been parsed once, then return a copy of that */ {
            if (CommandLineArgumentsParser.parsedOptions)
                return ({...CommandLineArgumentsParser.parsedOptions});
        }

        /* Parsing the arguments, saving that result, and returning it. */ {
            program.parse(process.argv);
            const options = (program.opts());
            options.domains = options.domain;
            delete options.domain;
            CommandLineArgumentsParser.parsedOptions = options;
            Terminal.event("Command line Arguments Loaded");
            Terminal.println(CommandLineArgumentsParser.parsedOptions);
            return ({...CommandLineArgumentsParser.parsedOptions});
        }
    }
}
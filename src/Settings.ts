import CommandLineArgumentsParser from "./CommandLineArguments";
import PaintedString from "./PaintedString"
import Terminal from "./Terminal";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETTINGS INTERFACES ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** The shape that the config.json will have */
export interface SettingsType {
    // Terminal options:
    verbal?:boolean,
    monochrome?:boolean,
    // The service provider (and authentication):
    email?:EmailSettingsType,
    // Server options:
    domains?:String[],
    interval?:string,
    port?:number,
};

/** The shape that the email settings will have. */
export interface EmailSettingsType {
    service?:string,
    authentication?:EmailAuthenticationSettingsType, 
    options?:EmailOptionsSettingsType
};

/* The shape that the email authentication settings will have. */
export interface EmailAuthenticationSettingsType {
    user?:string,
    password?:string
}

/* The shape that the email option settings will have. */
export interface EmailOptionsSettingsType {
    from?:string,
    to?:string
};

/** What each settings will be called */
export interface SettingNames {
    readonly verbal:"verbal",
    readonly monochrome:"monochrome",
    readonly email:EmailSettingNames,
    readonly domains:"domains",
    readonly interval:"interval",
    readonly port:"port"
}

/** What each email setting will be called */
interface EmailSettingNames {
    readonly service:"email.service",
    readonly authentication:EmailAuthenticationSettingNames,
    readonly option:EmailOptionSettingNames
}

/** What each email authorization setting will be called */
interface EmailAuthenticationSettingNames {
    readonly user:"email.authentication.user",
    readonly password:"email.authentication.password"
}

/** What each email option setting will be called */
interface EmailOptionSettingNames {
    readonly from:"email.options.from",
    readonly to:"email.options.to",
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DEFAULT SETTINGS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** The default for each setting. */
const defaultSettings:SettingsType = {
    // Terminal options:
    verbal : false,
    monochrome : false                                                                  ,
    // The service provider (and authentication):
    email : {
        service : "",
        authentication : {
            user : "",
            password : ""
        }, 
        options : {
            from : "",
            to : ""
        }
    },
    // Server options:
    domains : [],
    interval : "* * * * *",
    port : 3000,
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SETTINGS CLASS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/** A class to handle and store the settings */
export default abstract class Settings {

    /** Stores the settings */
    private static settings:SettingsType|null;

    /** Initializes the Settings object. */
    public static initialize():void {

        if (Settings.settings) throw new Error(
            `${PaintedString.paintAsClass("Settings")}.${PaintedString.paintAsMethod("initialize")}(` +
            `):${PaintedString.paintAsClass("void")}.${PaintedString.paintAsVariable("pre")}, ` +
            "the settings have already been initialized."
        );

        const settingsFromCommandLine = CommandLineArgumentsParser.getArguments();

        var settingsFromFile;
        /** Loading the settings from the config.json file. */ {
            try { settingsFromFile = require("../config/config.json"); } catch (e) { Terminal.error(e); }
            Terminal.event(`Loaded settings from ${PaintedString.paintAsMethod("config.json")}`);
            Terminal.println(settingsFromFile);
        }

        this.settings = {...defaultSettings, ...settingsFromFile, ...settingsFromCommandLine};

        /** Printing an update */ {
            Terminal.println(
                `${PaintedString.paintAsClass("Settings")}.${PaintedString.paintAsMethod("initialize")}() : `+
                `Combined the settings from the ${PaintedString.paintAsMethod("config.json")} with the settings from ` +
                `Combined the settings from the ${PaintedString.paintAsClass("CommandLineArgumentsParser")}.`);
            Terminal.println(this.settings);
        }
    }

    /** Gets the value of a certain setting. */
    public static getSetting(settingName:SettingNames):string|number|boolean {
        if (! Settings.settings) throw new Error(
            `${PaintedString.paintAsClass("Settings")}.${PaintedString.paintAsMethod("getSetting")}(` +
            `${PaintedString.paintAsVariable("settingName")}:${PaintedString.paintAsClass("SettingNames")}` +
            `):${PaintedString.paintAsClass("string")}|${PaintedString.paintAsClass("number")}|` +
            `${PaintedString.paintAsClass("boolean")}, ` +
            "the settings have not been retrieved yet."
        );

        throw new Error(
            `${PaintedString.paintAsClass("Settings")}.${PaintedString.paintAsMethod("getSetting")}(` +
            `${PaintedString.paintAsVariable("settingName")}:${PaintedString.paintAsClass("SettingNames")}` +
            `):${PaintedString.paintAsClass("string")}|${PaintedString.paintAsClass("number")}|` +
            `${PaintedString.paintAsClass("boolean")}, ` +
            "has not been implemented yet."
        );
    }

    /** Sets a certain setting to a certain value. */
    public static setSetting(settingName:SettingNames, settingValue:string|number|boolean):void {
        if (! Settings.settings) throw new Error(
            `${PaintedString.paintAsClass("Settings")}.${PaintedString.paintAsMethod("getSetting")}(` +
            `${PaintedString.paintAsVariable("settingName")}:${PaintedString.paintAsClass("SettingNames")}, ` +
            `${PaintedString.paintAsVariable("settingValue")}:${PaintedString.paintAsClass("SettingNames")}` +
            `|${PaintedString.paintAsClass("string")}|${PaintedString.paintAsClass("number")}` +
            `|${PaintedString.paintAsClass("boolean")}):${PaintedString.paintAsClass("void")}` +
            "the settings have not been retrieved yet."
        );
    }
}

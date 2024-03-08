import { EmailSettingsType, EmailAuthenticationSettingsType, EmailOptionsSettingsType } from "./Settings";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodeMailer from "nodemailer";
import Terminal from "./Terminal";
import PaintedString, { BackgroundColor, ForegroundColor } from "./PaintedString"

/** A class used to sent emails. */
export default class Mailer {
    
    /** The settings that the mailer should use. */
    private settings:EmailSettingsType;

    /** Returns the settings of the mailer object. */
    public getSettings():EmailSettingsType {
        return ({...this.settings});
    }

    /** The transporter that will be used to sent emails. */
    private transporter:nodeMailer.Transporter<SMTPTransport.SentMessageInfo>;

    /** returns the transporter. */
    public getTransporter() {
        return ({...this.transporter});
    }

    /** The instance of the mailer object */
    private static instance:Mailer;

    /** Creates a new Mailer instance of this singleton class */    
    private constructor(settings:EmailSettingsType) {
        
        /** Pre-Condition Guard-Statements */ {
            if (! settings) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "settings was undefined. ");
            if (! settings.service) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "");
            if (! settings.authentication) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "settings.authentication was undefined. ");
            if (! settings.authentication.password) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "settings.authentication.password was undefined. ");
            if (! settings.authentication.user) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "settings.authentication.user was undefined. ");
            if (! settings.options) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "settings.options was undefined. ");
            if (! settings.options.from) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "settings.options.from was undefined. ");
            if (! settings.options.to) throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${("constructor")}(` + 
                `${PaintedString.paintAsVariable("settings")}:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `).${PaintedString.paintAsVariable("pre")} violated, ` +
                "settings.options.to was undefined. "
            );
        }

        this.settings = settings;

        this.transporter = nodeMailer.createTransport({
            service: this?.settings?.service,
            auth: {
                user: this?.settings?.authentication?.user,
                pass: this?.settings?.authentication?.password
            }
        });
    }

    /**
     * Returns an instance of the mailer object. Can throw an error.
     * 
     * @param { EmailSettingsType } settings the settings for the Mailer.
     * @returns an instance of the mailer object.
     */
    public static getInstance(settings?:EmailSettingsType):Mailer {
        
        // There are 4 possible situations:
        // (1) There is no instance, and an argument was provided    -> (succes) Create a new instance.
        // (2) There is no instance, and no arguments were provided  -> (error)  so no new one can be created
        // (3) There is an instance, and no arguments were provided  -> (succes) return the instance
        // (4) There is an instance, and an argument was provided    -> (error)  there is already an instance 
        //                                                                       so no new one can be provided.

        if ((! Mailer.instance) || (settings !== undefined)) {
            if (settings !== undefined) Mailer.instance = new Mailer(settings); // required by the compiler
            return Mailer.instance;
        }

        if ((! Mailer.instance) || (! settings)) throw new Error(
            "Mailer.getInstance(?EmailSettingsType).pre got violated, " +
            "no settings were provided, but there is no default Mailer to return."
        );

        if ((Mailer.instance) || (! settings)) return Mailer.instance;

        if ((Mailer.instance) || (settings)) throw new Error(
            "Mailer.getInstance(?EmailSettingsType).pre got violated, " +
            "settings were provided, but there is already an instance " +
            "of the Mailer object so no new one can be created."
        );

        /* Throw an error because the case list wasn't exhaustive. */ {
            throw new Error(
                `${PaintedString.paintAsClass("Mailer")}.${PaintedString.paintAsMethod("getInstance")}(`+
                `${PaintedString.paintAsVariable("settings")}?:${PaintedString.paintAsClass("EmailSettingsType")}` +
                `):${PaintedString.paintAsClass("Mailer")}.${PaintedString.paintAsVariable("post")}` +
                `was not upheld. - ${PaintedString.createFrom(
                    "This should not happen", ForegroundColor.red, BackgroundColor.default
                )}. - The case list was not exhaustive enough. There were more options then: ` +
                "there was/wasn't an instance + there was/wasn't an argument provided. " +
                `${PaintedString.paintAsClass("Mailer")} = ${
                    PaintedString.paintAsVariable(`${Mailer.instance}`)}, and ` +
                `${PaintedString.paintAsClass("EmailSettingsType")} = ${
                    PaintedString.paintAsVariable(`${settings}`)
                }. This should not happen, but since I cannot exclude the possibility, this error is here.`
            );
        }
    }

    /** Sends an email that the following website is down. Can throw an error. */
    public sentAlertAbout(domain:string):void {

        var mailOptions = {
            from: this?.settings?.options?.from,
            to: this?.settings?.options?.to,
            subject: `${domain} is down!`,
            text: (
                `Hey there, \n` +
                `\n` +
                `You asked us to watch over ${domain} to see if it is up. ` +
                `Unfortunately, that domain appears to be down. Please check it out. \n` +
                `\n` +
                `https://${domain}/\n` +
                `\n` +
                `This email was sent to you because your email ` +
                `is listed as the recipient for a piece of software called website-pinger. ` +
                `To stop receiving these emails, you'll have to report this email address.\n ` +
                `\n` +
                `Have a nice day!`
            )
        };

        this.transporter.sendMail(mailOptions, (error:Error|null, info:SMTPTransport.SentMessageInfo) => {
            
            if (error) throw error;
            
            Terminal.success(`Alert email about ${domain} sent: ${info.response}`);
        }); 
    }
}
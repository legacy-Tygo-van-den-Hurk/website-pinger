import dotenv from "dotenv";
import Terminal from "./Terminal";
import PaintedString, { BackgroundColor, ForegroundColor } from "./PaintedString"
import express, { Express, Request, Response } from "express";
import path from "path";
import Settings, { SettingNames } from "./Settings";
import { deepMergeObjects, mergeDeep } from "./utilities";

const first = {
    thing1 : 1,
    thing2 : 2,
    thingy : "should be overwritten",
    array : [
        1, 2,
    ],
    far : {
        deep : {
            x : "x"
        }
    }
}

const second = {
    thing3 : 3,
    thing4 : 4,
    thingy : "x",
    array : [
        3, 4, {
            yeah : 1, 
            something : [
                { }
            ]
        }
    ],
    far : {
        deep : {
            y : "y"
        },
        hang : 1
    }
}

const three = deepMergeObjects(first, second);
console.log();
console.log("three");
console.log(three);

console.log();
const four = mergeDeep(first, second);
console.log("four");
console.log(four);

console.log();
console.log("three...something");
console.log(three.array[2].something);

console.log();
console.log("four...something");
console.log(four.array[2].something);

process.exit();

dotenv.config();        // Loads variables from the environment into the process environment.
Settings.initialize();  // Loads the variables from the CLI and config.json into the settings Class

Terminal.println(`Application is booting up`);

Terminal.println(`loaded environment variables into the process`);

/** The port on which the application will be running. */
const port = process.env.PORT || 3000;

Terminal.println(`loaded requested port (${PaintedString.createFrom(
    `${port}`, ForegroundColor.blue, BackgroundColor.default
)}) to run on...`);

/** The express app. */
const app:Express = express();

Terminal.println(`created express app`);

/* Logging every request on the terminal */ {
    app.use((request:Request, response:Response, next:Function) => {
        const requestIP6Address = (request.socket.remoteAddress);
        const paintedRequestIP6Address = PaintedString.createFrom(`${requestIP6Address}`,
            ForegroundColor.blue, BackgroundColor.default);
        const requestURL = PaintedString.createFrom(`${request.url}`,
            ForegroundColor.blue, BackgroundColor.default); 
        Terminal.event(`Request from ${paintedRequestIP6Address} to get \"${requestURL}\"!`);
        next();
    });
}

Terminal.println(`set up a logger for connections`);

/* Making express use .ejs files. */ {
    const pathToAssets = (path.join(__dirname, "..", "public"));
    app.use(express.static(pathToAssets));
    Terminal.println(`configured to server to serve static files from:\n${PaintedString.createFrom(pathToAssets, ForegroundColor.blue, BackgroundColor.default)}...`);
    
    const pathToViews = (path.join(__dirname, "..", "views", "pages"));
    app.set('views', pathToViews);
    app.engine('.ejs', require('ejs').__express);
    app.set('view engine', 'ejs');
    Terminal.println(`configured to server to use EJS...`);
} 

/* Returning hello world if the express works */ {
    app.get("/", (request:Request, response:Response) => {
        response.send(
            `So unfortunately \".ejs\" files still don\'t work...\n`
        );
    });
}

/* Dealing with the login */ {
    app.get("/login", (request:Request, response:Response) => {
        const requestIP_Address = (request.socket.remoteAddress);
        const paintedRequestIP_Address = PaintedString.createFrom(`${requestIP_Address}`,
            ForegroundColor.blue, BackgroundColor.default); //Terminal.colors.background.white
        Terminal.event(`request from ${paintedRequestIP_Address} to get \"/login\"!`);
        response.send(`you're getting \"/login\".`);
    }).post('/login', (request:Request, response:Response) => {
        const { username, password } = request.body;
        const requestIP_Address = (request.socket.remoteAddress);
        const paintedRequestIP_Address = PaintedString.createFrom(`${requestIP_Address}`,
            ForegroundColor.blue, BackgroundColor.default); //Terminal.colors.background.white
        Terminal.event(
            `request from ${paintedRequestIP_Address} to log in as \"${username}\" using password \"${password}\"!`
        );

        //// // Check if the username and password match the ones in the config
        //// const userNameMatches = (username === Settings.getSetting("username"));
        //// const passwordMatches = (password ===  Settings.getSetting("passwordHash"));
        //// if (userNameMatches && passwordMatches) response.status(200).send('Login successful');
        //// else response.status(401).send('Invalid username or password');
    });
}

/* Starting the Express app and listen for incoming requests on the specified port */ {
    app.listen(port, () => {
        Terminal.success(`Server has started up.`);
        const url = PaintedString.createFrom(`http://localhost:${port}`, 
            ForegroundColor.yellow, BackgroundColor.default);
        Terminal.println(`Server is running at ${url}.`);
    });
}

Terminal.println();
Terminal.println("Testing of the printing with color:");
Terminal.println();
Terminal.error("Test!");
Terminal.warn("Test!");
Terminal.println("Test!");
Terminal.success("Test!");
Terminal.event("Test!");
Terminal.urgent("Test!");
Terminal.togglePrintsColor();
Terminal.println();
Terminal.println("Testing of the printing without color:");
Terminal.println();
Terminal.error("Test!");
Terminal.warn("Test!");
Terminal.println("Test!");
Terminal.success("Test!");
Terminal.event("Test!");
Terminal.urgent("Test!");
Terminal.togglePrintsColor();
Terminal.println();
Terminal.println("the actual application:");
Terminal.println();
const port = process.env.PORT || 3000;

// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Terminal from "./Terminal";

dotenv.config();



const app: Express = express();


app.get("/", (request: Request, response: Response) => {

    const requestIP_Address = (request.socket.remoteAddress);
    const paintedRequestIP_Address = Terminal.paintString(` ${requestIP_Address} `,
        Terminal.colors.foreground.black, 
        Terminal.colors.background.white);
    Terminal.println(`request from ${paintedRequestIP_Address}!`);
    response.send("Hello, World!");
});

// Start the Express app and listen for incoming requests on the specified port
app.listen(port, () => {

    console.log("\nwith color:");
    
    Terminal.println("some message");
    Terminal.error(`test error`);
    Terminal.warn(`test warning`);
    Terminal.success(`test success`);
    Terminal.event(`test event`);
    Terminal.urgent(`test urgent`);

    console.log("\nwithout color:");
    Terminal.togglePrintsColor();

    Terminal.println(`some message`);
    Terminal.error(`test error`);
    Terminal.warn(`test warning`);
    Terminal.success(`test success`);
    Terminal.event(`test event`);
    Terminal.urgent(`test urgent`);

    console.log("\nactual application:\n");
    Terminal.togglePrintsColor();
    Terminal.println(`Server is running at http://localhost:${port}`);

});

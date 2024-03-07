> pings all websites in a JSON file once every interval, and sents an email when one of the websites are down, and tells you which one.

# Website Pinger
This repository contains a basic TypeScript Express application that utilizes Node.js for server-side functionality. It is configured with Nodemon for automatic server restarts during development and uses ts-node for TypeScript execution.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/): Ensure that Node.js, preferably version 16 or higher, is installed on your system, as this project utilizes the latest versions of TypeScript and Nodemon.
- [npm](https://www.npmjs.com/): npm is the package manager for Node.js and comes with the Node.js installation.
- [ts-node](https://www.npmjs.com/package/ts-node): this is used to run TypeScript code directly on node without precompiling it.

## Installation

Clone the repository to your local machine:

```BASH
git clone https://github.com/St-H123/website-pinger.git
```

Navigate to the project directory:

```BASH
cd website-pinger/
```

Install the project dependencies including TypeScript and Nodemon:

```BASH
npm i
```

## Configuration
Before starting the server for development, or build the source code for production, you'll have to configure the server. You can configure the server using the `config/config.json`.

### Server Settings
These are the settings in the `config.json` you should configurate:
- `port`: the port the server should run on.
- `interval`: the interval on which the server should check the domains on.
- `domains`: the domains the server should check.
- `email`: The settings for the email part of the application/
  - `service`: the service provider that will be sending the emails.
  - `authentication`: the credentials the server should use. Containing the `username`, and `password`. Considering the sensitive nature of a password, it also possible to provide the password as a command line argument. Look at [the CLI argument section](#command-line-arguments) for more information.
  - `options`: dictates who to sent to email to, and where to sent the email from.  

This is an example `config.json`:
```JSON
{
    "port" : 3000,
    "interval": "0 * * * *",
    "domains": [
        "tygo.van.den.hurk.dev"
    ],
    "email" : {
        "service": "provider",
        "authentication": {
            "user": "example@domain.com",
            "password": "password"
        },
        "options": {
            "from": "example@domain.com",
            "to": "recipient@example.com"
        }
    }
}
```

## Usage

For development purposes, you can run the application using Nodemon to automatically restart the server when changes are detected. Execute the following command:

```BASH
npm run dev
```

This will start the server at `http://localhost:3000` by default. You can change the port in the `src/index.ts` file or create an `.env` file to manage the environment-specific variables separately.

For production, you can build the TypeScript files and then start the server. Run the following commands:

```BASH
npm run build
npm start
```

### Command line arguments
This application can take a few arguments:
- \[`-h`, `--help`\]: provides a help message.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
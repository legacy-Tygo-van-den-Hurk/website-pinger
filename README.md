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

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.
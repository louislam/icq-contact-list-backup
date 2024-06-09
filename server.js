const express = require("express");
const { getAsset, isSea } = require('node:sea');
const fs = require('fs').promises;

async function main() {
    const app = express();

    app.get("/", async (req, res) => {
        res.send(await asset('index.html', 'utf8'));
    });

    app.get("/index.js", async (req, res) => {
        res.header('Content-Type', 'application/javascript');
        res.send(await asset('index.js', 'utf8'));
    });

    app.get("/index.css", async (req, res) => {
        res.header('Content-Type', 'text/css');
        res.send(await asset('index.css', 'utf8'));
    });

    app.get("/list", async (req, res) => {
        if (process.env.NODE_ENV === "development") {
            // Allow CORS in development
            res.header('Access-Control-Allow-Origin', '*');
        }

        res.header('Content-Type', 'application/json');

        let list = [];

        try {
            // Read dir "json"
            const files = await fs.readdir('json');
            for (const file of files) {
                const content = await fs.readFile(`json/${file}`, 'utf8');
                list.push(JSON.parse(content));
            }

        } catch (e) {
            console.error(e.message);
            list = [];
        }

        res.send(JSON.stringify(list));
    });

    let port = 3500;

    while (true) {
        try {
            await listen(app, port);
            break;
        } catch (e) {
            console.error(e.message);
            port++;
        }
    }
}

function listen(app, port) {
    return new Promise((resolve, reject) => {
        app.listen(port, "localhost", () => {
            console.log(`Please go to http://localhost:${port}`);
            resolve();
        }).on("error", reject);
    });
}

async function asset(filename) {
    if (isSea()) {
        return getAsset(filename, 'utf8');
    } else {
        return await fs.readFile(`dist/${filename}`, 'utf8');
    }
}

main();




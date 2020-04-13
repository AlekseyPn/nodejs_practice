const http = require("http");
const fs = require("fs");
const path = require("path");

const routes = {
    "/": "index.html",
    "/about": "about.html",
};

const apiResponseMock = {
    "/api/users": [{
        name: "Alex",
        age: 29
    }, {name: "Anna", age: 26}]
};

let ViewNotFound = null;
fs.readFile(path.join(__dirname, "views", "404.html"), "utf-8", (err, data) => {
    if (err) throw e;
    ViewNotFound = data;
});

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        if (req.url.includes("api")) {
            if (apiResponseMock[req.url]) {
                res.writeHead(200, {
                    "Content-Type": "text/json"
                });
                res.end(JSON.stringify(apiResponseMock[req.url]))
            } else {
                res.writeHead(404, "API route not found");
                res.end(ViewNotFound ? ViewNotFound : "")
            }
            return;
        }

        if (routes[req.url]) {
            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            fs.readFile(path.join(__dirname, "views", routes[req.url]), "utf-8", (err, data) => {
                if (err) res.end(err);
                res.end(data);
            });
        }
    }

    if (req.method === "POST") {
        const body = [];

        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        req.on("data", data => {
            body.push(Buffer.from(data));
        });

        req.on("end", () => {
            const message = body.toString().split("=")[1];
            res.end(`
                <h1>Ваше сообщение: ${message}</h1>
            `)
        });
    }
});

server.listen("3000", () => {
    console.log("Server is running...");
});
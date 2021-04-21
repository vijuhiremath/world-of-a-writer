import express from "express";
import path from "path";
import * as http from "http";

const app = express();
const port = 8000; // default port to listen

app.set("views", path.join(__dirname, "/"));

app.use("/scripts", express.static(path.join(__dirname, "views/scripts")));

app.use("/", express.static(path.join(__dirname, "views/"), {
    index: "index.html"
}));

// Set the port
app.set("port", port);

// Start the webserver
http.createServer(app).listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running on ${port}`);
});

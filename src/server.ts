import express from "express";
import path from "path";
import { renderToString } from 'react-dom/server';
import { App } from "./components/App";
const app = express();
const port = 8000; // default port to listen

// // Configure Express to use EJS
// app.set('views', __dirname + '/views');
// app.set( "view engine", "html" );

// define a route handler for the default home page
app.set( "views", path.join( __dirname, "views"));
app.set("view engine","jade")

app.get( "/", ( req, res ) => {
    // render the index template
    res.render('index');
} );


// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );

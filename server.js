/**
* @project GitLab - https://obrymec.github.io/gitlab_home_page_clone/
* @fileoverview Defines server configs with expressjs.
* @author Obrymec - obrymecsprinces@gmail.com
* @supported DESKTOP, MOBILE
* @created 2021-09-21
* @updated 2023-06-09
* @file server.js
* @type {Server}
* @version 0.0.1
*/

// Node dependencies.
import {fileURLToPath} from "url";
import path from "path";

// Plugin dependencies.
import express from "express";
	
// Attributes.
const __filename = fileURLToPath (import.meta.url);
const __dirname = path.dirname (__filename);
const app = express ();
const port = 5000;

// Configurations.
app.use (express.static (__dirname));

// Root or unknown link.
app.get (
	"/*", (_, res) => res.sendFile (`${__dirname}/index.html`)
);

// Starts the server.
app.listen (port, err => {
	// Whether an error is thrown.
	if (err) console.error ("Server Error: ", err);
	// Otherwise.
  else console.log ("Server started at port: ", port);
});

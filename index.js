/*
 * DEPS
 */
const express                       = require("express");
const port                          = 1337;
const app                           = express();
const http                          = require("http").Server(app);

/*
 *   CONFIG
 */
 require("./middleware/auth.js");
 require("./config/server.js")(app);
 //require("./config/db.js");

/*
 *   ROUTES
 */

const routes                        = require("./routes/index.js");
const sockets                       = require("./sockets/index.js");

app.use("/libraries", express.static(__dirname + "/libraries"));
app.use("/", routes);


/*
 *   START SERVER
 */
http.listen(port, () => {
  console.log(`working on ${port}`);
});

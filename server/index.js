/*
 * DEPS
 */
const express                       = require("express");
const port                          = 1337;
const app                           = express();
const http                          = require("http").Server(app);
const io                            = require("socket.io")(http);

/*
 *   CONFIG
 */
require("../config/server.js")(app);

/*
 *   ROUTES
 */

const routes                        = require("./routes/routes.js")(io);

app.use("/libraries", express.static(__dirname + "/libraries"));
app.use("/", routes);


/*
 *   START SERVER
 */
http.listen(port, () => {
  console.log(`working on ${port}`);
});

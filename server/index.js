/*
 * DEPS
 */
const express                       = require("express");
const port                          = 1337;
const app                           = express();
//const io                            = require("socket.io")(http);

/*
 *   MIDDLEWARE
 */

//require("./middleware/auth.js");
//require("./middleware/logger.js")(app);

/*
 *   CONFIG
 */
require("../config/server.js")(app);
//require("./config/db.js");

/*
 *   ROUTES
 */

///const userRoutes                     = require("./routes/user/index.js");
const basicRoutes                    = require("./routes/basicRoutes.js");

app.use("/", basicRoutes);
//app.use("/", trackRoutes);

/*
 *   START SERVER
 */

app.listen(port, () => {
  console.log(`working on ${port}`);
});

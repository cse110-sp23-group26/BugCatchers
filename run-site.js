express = require("express");
app=express();
app.use(express.static("./src"));
app.listen(8080);
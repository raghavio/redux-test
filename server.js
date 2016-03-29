var express = require('express');
var app = express();
var APP_DIR = __dirname + "/src/client/"
app.get("/", function(request, respone){
  respone.sendFile(APP_DIR + "index.html");
});

app.use(express.static(APP_DIR + "public"));
app.listen(8080);

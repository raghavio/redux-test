var express = require('express');
var app = express();
app.get("/", function(request, respone){
  respone.sendFile(__dirname + "/index.html");
});

app.use(express.static('static'));
app.listen(8080);

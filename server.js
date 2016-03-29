var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var APP_DIR = __dirname + "/src/client/"
app.get("/", function(request, respone) {
  respone.sendFile(APP_DIR + "index.html");
});

app.get("/api/data", function(request, response) {
  fs.readFileAsync("data.json").then(function(content) {
    response.setHeader('Content-Type', 'application/json');
    response.send(content);
  }).catch(function(error) {
    console.log(error);
  });
});

app.post("/api/receive", function(request, response) {
  fs.writeFileAsync("data.json", request.body.data).then(function(resp) {
      response.send("Done");
  }).catch(function(error) {
    response.send("Error");
  });
});


app.use(express.static(APP_DIR + "public"));

app.listen(8080);

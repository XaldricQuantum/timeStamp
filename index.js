// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let date = new Date();
  let gmtDate = date.toUTCString();
  let epochDate = date.getTime();
  res.json({"unix": epochDate, "utc": gmtDate});
})

app.get("/api/:strDate" , function(req, res) {
  const {strDate} = req.params;
  console.log(strDate);
  
  let date 
  if (/^\d+$/.test(strDate)) {
    let numDate = Number(strDate);
    date = new Date(numDate)
  } else {
    date = new Date(strDate);
  }
  if (date.toString() !== "Invalid Date"){
  } else if (!strDate) {
    date = new Date();
  } else {
    res.json({error: "Invalid Date"})
  }
  // let date = new Date();
  let gmtDate = date.toUTCString();
  let epochDate = date.getTime();
  res.json({"unix": epochDate, "utc": gmtDate});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

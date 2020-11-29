const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) =>{

const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data = {
  members: [
    {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName,
      LNAME: lastName
    }
  }
]
};

const jsonData = JSON.stringify(data);

const url = "https://us7.api.mailchimp.com/3.0/lists/158391ceb4";

const options = {
  url: "https://us7.api.mailchimp.com/3.0/lists/158391ceb4",
  method: "POST",
  headers: {
    Authorization:  "auth d588b96bbfb770f310927a426d020f18-us7"
  },
  body: jsonData
}

const request = https.request(url, options, function(response) {
if( response.statusCode === 200 ){
  res.sendFile(__dirname + "/success.html");

}else{
    res.sendFile(__dirname + "/failure.html");
}
  response.on("data", function(data) {
    console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server started!"));
//  function() {
//   console.log(" Server is running on port 3000");
// });

// APIkey
// d588b96bbfb770f310927a426d020f18-us7
// List id
// 158391ceb4

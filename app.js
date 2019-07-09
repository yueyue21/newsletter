//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");

const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
//imaging the signup.html is inside the public folder
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: { FNAME: firstName, LNAME: lastName }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/1e7eb553f8",
    method: "POST",
    headers: {
      Authorization: "Chrisyin1 4ae374564ee676a8df97434f17452490-us3"
    },
    body: jsonData
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

  // res.write("Hi " + firstName + lastName);
  // res.send();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});


//listen heroku with process.env.PORT, local at 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});

//4ae374564ee676a8df97434f17452490-us3

//id
//1e7eb553f8

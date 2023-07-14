
const express = require("express");
const bodyParser = require("body-parser");
// const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/SignUp.html");
})

app.post("/", function (req, res) {
    const fname = req.body.first_name;
    const lname = req.body.last_name;
    const e_mail = req.body.email;


            mailchimp.setConfig({
                apiKey: "0e43fff2efabea2542e3917a163e5048-us21",
                server: "us21"
            });
            

            const listId = "657177b1a3";
            const subscribingUser = {
            firstName:  fname,
            lastName: lname,
            email: e_mail
            };

            async function run() {
            const response = await mailchimp.lists.addListMember(listId, {
                email_address: subscribingUser.email,
                status: "subscribed",
                merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
                }
            });
        }
 run()
      .then(()=>res.sendFile(__dirname+"/success.html"))
      .catch(()=>res.sendFile(__dirname+"/failure.html"));
 
             
});

app.post("/failure",function(req,res){
     res.redirect("/");
})

app.listen(3000, function (req, res) {
    console.log("Server listening at port 3000");
})


// API KEY :-  0e43fff2efabea2542e3917a163e5048-us21
// LIST ID :-   657177b1a3



 
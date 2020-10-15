const express=require("express");
const request = require('request');
const bodyparser=require("body-parser");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
  const fname=req.body.fname;
  const lname= req.body.lname;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  const jsondata=JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/0f3c1d6d42";
  const options={
    method:"POST",
    auth:"muskan26:31d24fe4c6db586ec4a601f5b82fa1af-us2",

  }

  const request = https.request(url,options,function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();

});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
  console.log("HIIIII");
});

//31d24fe4c6db586ec4a601f5b82fa1af-us2

//auidence id
//0f3c1d6d42

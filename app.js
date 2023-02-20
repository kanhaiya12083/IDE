const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res){
    const first=req.body.fname;
    const last=req.body.lname;
    const email=req.body.email;
    const data={
        lists:[{
            email_address:email,
                status:"pending",
                merge_fields :{
                    FNAME:first,
                    LNAME:last
                }
            }
        ]
            
    };
    const jsonData=JSON.stringify(data);
    const url="https://us10.api.mailchimp.com/3.0/lists/f94fb159c0/members?skip_merge_validation=false";
    const options={
        method:"POST",
        auth:"key:78b640a61c65bfdb05d3df09b0c5f4b3-us10"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
           res.send("Sucess"); 
        }
        else{
            res.send("error");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end();
});
app.listen(process.env.PORT||3000,function(){
    console.log("server");
});



// 78b640a61c65bfdb05d3df09b0c5f4b3-us10
// f94fb159c0
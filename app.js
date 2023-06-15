const express = require("express");

const https= require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine', 'ejs');

let search_loc="mumbai";

app.get("/",(req,res)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?q="+search_loc+"&appid=a66b1df6dfe9b0f353181789edc2641c&units=metric";
    https.get(url,(response)=>{
        response.on("data",(data)=>{
          let weatherdata=JSON.parse(data);
           let temperature= weatherdata.main.temp;
           let cityname=weatherdata.name;
           let icon= weatherdata.weather[0].icon;
           let humidity= weatherdata.main.humidity;
           let speed=weatherdata.wind.speed;
           let status=weatherdata.weather[0].main;
           let url="https://openweathermap.org/img/wn/"+icon+"@2x.png";
           res.render("index",{url:url, temp:temperature,main:status,loc:cityname,humidity:humidity,speed:speed});
        })
    })
})

app.post("/",(req,res)=>{
    search_loc=req.body.location;
    res.redirect("/");
})

app.listen("3000",()=>{
    console.log("server started...");
})
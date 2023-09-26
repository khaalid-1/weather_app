

const express= require("express")
const bodyParser=require("body-parser")
 
const https=require("https")
const app=express();

app.use(bodyParser.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")

})

app.post("/",function(req,res){
    const apiKey="e0f900c6113cfcdf5077ded2d4ec2bb8";
    const query=req.body.city
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    https.get(url,function(rs){

        rs.on("data",function(data){
            const weataherData=JSON.parse(data)



            const temp=weataherData.main.temp
            const ds=weataherData.weather[0].description
            const icon =weataherData.weather[0].icon
            const img=`https://openweathermap.org/img/wn/${icon}.png`
        
            res.write(`<P> current wedather is ${ds}</p>`)
            res.write(`<h1> the tempreature of current weather is  ${temp}</h1>`)
            res.write(`<img src='${img}' >`)
        })
    })

})


app.listen(3000,function(){
    console.log("server is listening in port 3000")
})
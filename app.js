const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")
const { imageUrl } = require("faker/lib/image")
app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})
app.post("/",function(req,res){
    const city = req.body.city
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid=4795ecd82059b1b4bf412333fa56e643"
    https.get(url,function(response){
        console.log(response)
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            console.log(weatherdata)
            const temp = weatherdata.main.temp
            const description = weatherdata.weather[0].description
            console.log(description)
            const icon = weatherdata.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("The description of the weather is "+description)            
            res.write("<h1>The weather of "+city+ " is "+ temp+ " degree celsius</h1>")
            res.write("<img src="+imageUrl+">")
            res.send()
        })
        

    })

})
/*app.get("/",function(req,res){

    const url ="https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=4795ecd82059b1b4bf412333fa56e643"
    https.get(url,function(response){
        response.on("data",function(data ){
            const weatherdata =JSON.parse(data)
            console.log(weatherdata)
            const temp = weatherdata.main.temp
            const description = weatherdata.weather[0].description
            console.log(temp)
            console.log(description)
            const icon = weatherdata.weather[0].icon
            const imageUrl =" http://openweathermap.org/img/wn/"+icon +"@2x.png"
            res.write("<h1>The weather condition is " + description+"</h1>")
            res.write("<h1>The Temperature of Paris is "+temp+"Celsius</h1>")
            res.write("<img  src ="+imageUrl+">")
            res.send()
       })
    }) 

})*/
app.listen(3000,function(req,res){
    console.log("started at port 3000")
})
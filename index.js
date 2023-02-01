const express = require("express");
const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');
const items = [];

app.get("/",(req,res)=>{
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const day = today.toLocaleDateString("en-US",options);
    res.render('list',{whichDay : day,newListItems : items});
})

app.post("/",(req,res)=>{
    items.push(req.body.newToDo);
    res.redirect("/");
})
 
app.listen(3000,"127.0.0.1",()=>{
    console.log("Success!");
})

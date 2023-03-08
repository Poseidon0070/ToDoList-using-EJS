const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');

mongoose.connect("mongodb://0.0.0.0:27017/ToDoList",{useNewUrlParser : true})

const itemSchema = new mongoose.Schema({
    name : String
});

const Item = mongoose.model("Item",itemSchema);

const item1 = new Item({
    name : "Eat"
});
const item2 = new Item({
    name : "Sleep"
});
const item3 = new Item({
    name : "Code"
});

const defaultList = [item1, item2, item3];

const items = [];
const works = [];

app.get("/",(req,res)=>{
    var today = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const day = today.toLocaleDateString("en-US",options);

    Item.find((err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        if(data.length == 0){
            Item.insertMany(defaultList,(err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Successfully inserted..")
            })
            res.redirect("/");
        }else{
            res.render('list',{listTitle : day,newListItems : data});
        }
    })
})
app.get("/work",(req,res)=>{
    res.render('list',{listTitle : "Works",newListItems : works});
})

app.post("/",(req,res)=>{
    const itemName = req.body.newItem;
    const new_item = new Item({
        name : itemName
    })
    new_item.save();
    res.redirect("/");
})

 
app.listen(3000,"127.0.0.1",()=>{
    console.log("Success!");
})


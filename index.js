const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://iamnandita:Nandita%401@cluster0.ljvezbx.mongodb.net/todolistDB?retryWrites=true&w=majority");

const itemsSchema=new mongoose.Schema({
  name:String,
});

const Item=mongoose.model("Item",itemsSchema); 

app.get("/", function(req, res) {

  Item.find({}).then(function(foundItems){
    res.render("list", { listTitle: "Today", newListItems: foundItems });
  })
  .catch(function(err){
    console.log(err);
  });
});

app.post("/", function(req, res){
  const newItem=req.body.newItem
  //ADIING NEW ITEM IN DB
  const item=new Item({
    name:newItem,
  })
    item.save();
    res.redirect("/")  
  }
);

app.post("/delete",function(req,res){
  let checkedId=req.body.checked
  
    Item.findByIdAndRemove({_id:checkedId}).exec()
    res.redirect("/")
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

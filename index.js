const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/includes")));
app.use(express.urlencoded({extended:true}));

let datas = [
    {
        id:uuidv4(),
        name:"vignesh",
        email:"vigu@gmail.com"
    },
    {
        id:uuidv4(),
        name:"sushanth",
        email:"sushanth@gmail.com"
    },
    {
        id:uuidv4(),
        name:"shreyas",
        email:"shreyas@gmail.com"
    },
    {
        id:uuidv4(),
        name:"sudin",
        email:"sudin@gmail.com"
    }
]
app.listen(port,()=>{
    console.log("Listening to port 3000");
})


app.get("/",(req,res)=>{
    res.render("home.ejs",{datas});
})



app.get("/post",(req,res)=>{
    res.render("post.ejs");
})

app.post("/posts",(req,res)=>{
    let {name,email} =  req.body;
    let id = uuidv4();
    datas.push({id,name,email});
    res.redirect("/");
})


app.get("/post/show/:id",(req,res)=>{
    let {id} = req.params;
    let dataContent =datas.find((d) => id === d.id);
    res.render("show.ejs",{dataContent});
})


app.get("/post/edit/:id",(req,res)=>{
    let {id} = req.params;
    let dataContent =datas.find((d) => id === d.id);
    res.render("edit.ejs",{dataContent})
})

app.patch("/post/:id",(req,res)=>{
    let {id} = req.params;
    let newEmail = req.body.email;
    let dataContent = datas.find((d)=> id === d.id);
    dataContent.email = newEmail;
    res.redirect("/");
})
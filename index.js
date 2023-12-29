import express from "express";
import bodyParser from "body-parser";
import { render } from "ejs";

const app = express();
const port = 3000;

let array = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req, res)=>{

    res.render("index.ejs", {data:array});
});

app.get("/about",(req, res)=>{
    res.render("about.ejs");
});

app.post("/submit",(req, res)=>{
    let message = req.body["comment"]; 
    let message1 = message.toLowerCase().trim();
        if(array.includes(message1)){
            res.send("this message already exist");
        }else{
            array.push(message1);    
            res.render("index.ejs", {data:array});
        }
    });

app.post("/edit", (req, res)=>{
    let p = req.body['position'];  
    
    res.render("edit.ejs",{
        commentText : array[p],
        position: p
    });
    
});

app.post("/update", (req, res)=>{
    let message = req.body["uComment"]; 
    let message1 = message.toLowerCase().trim();
    switch(req.body.choice){
        case "update":

            if(array.includes(message1)){
                res.send("this message already exist");
            }else{
                array[req.body['position']]= req.body['uComment'];
                res.redirect("/");
            }
            
            break;

        case "delete":
            array.splice(req.body['position'],1);
            res.redirect("/");
            break;
        default:
            break;
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
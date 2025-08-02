    const express = require("express");
    const app =  express();
    const port = 8080;

    app.use(express.urlencoded({extended:true}));
    const{ v4:uuidv4 }=require('uuid');

    const methodoverride = require("method-override");
    app.use(methodoverride("_method"));

    const path = require("path");
    // const { useId } = require("react");
    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"views"));

    app.use(express.static(path.join(__dirname,"public")));

    let posts = [
        {
            id:uuidv4(),
            username : "apnacollege",
            content :"i love coding"
        },
        {
            id:uuidv4(),
            username : "sanjeev kumar",
            content :"Am a student"
        },
        {
            id:uuidv4(),
            username :"karthik kumar",
            content : "mine another name"   
        }
    ]

    app.get("/posts",(req,res)=>{
        res.render("index.ejs",{posts});
    })

    app.get("/posts/new",(req,res)=>{
        
        res.render("new.ejs")
    })

    app.post("/posts", (req, res) => {
        const { username, content } = req.body;
        let id = uuidv4();
        posts.push({ id,username, content });  // add post to array
        res.redirect("/posts");             // show updated posts
    });

  app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    if (post) {
        post.content = newcontent;
        console.log(post); 
        res.redirect("/posts");  // only redirect
    } else {
        res.status(404).send("Post not found");
    }
});

    app.get("/posts/:id/edit",(req,res)=>{
        let {id} = req.params;
        let post = posts.find((p)=>id===p.id);
        res.render("edit.ejs",{post});
    })
    app.get("/posts/:id", (req, res) => {
        let{id} = req.params;
        let post = posts.find((p)=>id === p.id);
        if(!post){
            return res.status(404).send("Post not found");
        }else{
            res.render("show",{post});
        }
                
    });
    
    app.delete("/posts/:id",(req,res)=>{
        let{id} = req.params;
        posts = posts.filter((p)=>id !== p.id);   // remove matching post
        // res.send("delete success");
        res.redirect("/posts");
    })
    app.listen(port,()=>{
        console.log(`listening to the port ${port}`);
    })
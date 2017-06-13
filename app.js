var bodyParser = require("body-parser"),
    express = require("express"),
    mongoose = require("mongoose"),
    app = express();
    
mongoose.connect("mongodb://localhost/blogapp");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type:Date, 
        default:Date.now
    },
    description: String
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title : "Test Blog",
    image: "http://forkliftsystems.com.au/wp-content/uploads/2015/04/placeholder-1000x400-800x400.png",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    description:"Lorem ipsum awaits you.."
});

//RESTful Routes

app.get("/", function(req, res) {
    res.redirect("/blogs")
})

app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log("ERROR");
        }else{
            res.render("index",{blogs:blogs});
        }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server is up and running");
})


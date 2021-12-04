var express = require('express');
var cors = require('cors');
var bodyparser = require("body-parser");
var bcryptjs = require("bcryptjs");
var corsOptions = {
    origin: "http://localhost:3000"
};
const app = express();
app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/backend_db", {
    usenewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Suceesfully connected to MongoDb.")
}).catch(err => {
    console.log("Connection Error", err);
    process.exit();
});

app.listen(8000, (err) => {
    if (err) console.log("failed");
    console.log("Listening on port 8000");
});

var User = require('./index');
const secret = "This is a secret string";
// verify signup()
var checkDuplicateUsers = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(200).send("Username already taken");
        }
        else {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(200).send("Email already taken");
            }
        }
        next();
    }
    catch (e) {
        res.send({ message: e });
        return;
    }
}
var signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 8),
        Age: req.body.age
    });
    user.save((err, user) => {
        if (err) {
            res.send({ message: err });
            return;
        }
        res.send("User was registered succesfully");
    });
}
var signin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            res.send("User not found SignUP first");
            return;
        }
        var passwordIsvalid = bcryptjs.compareSync(req.body.password, user.password);
        if (!passwordIsvalid) {
            res.send({ accessToken: null, message: "InvalidPassword!" });
            return;
        }
        var token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 86400
        });
        res.send({
            username: user.username,
            email: user.email,
            password: user.password,
            age: user.Age,
            acceessToken: token
        })
    }
    catch (e) {
        res.send(e);
        return;
    }
}
var verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.send({ message: "No token provided!" });
        return;
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    })
}

var content = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if(user) return res.send(user.todos); 
        else res.send("user not found");
    }catch(e){
        return res.send({message : e});
    }
}
var addtodo = async (req, res) => {
    try {
        //console.log(req.body);
        const user = await User.findOne({ username : req.body.username });
        if(user){ 
            //console.log("HI");
            let t = req.body.task.toString();
            if(!user.todos.includes(req.body.task)){
                user.todos.push(t);
                user.save((err) => {
                    if (err){
                    //console.log("HI");
                    return res.send({message : err});
                    }
                return res.send('Added a task to Todo list');
                });
            }
            else{
                return res.send("Task previously exists");
            }
        }
        else{
            res.send("User not found");
        }
    }
    catch(e){
        //console.log("HI");
        return res.send({message : e}); 
    }
}
var updatetodo = async(req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        if(user){
            if(user.todos.length > 0){
                for(let i = 0; i < user.todos.length; i++){
                    if(user.todos[i] === req.body.tobeupdated.toString()){
                        user.todos[i] = req.body.newtodo.toString();
                        user.save((err) => {
                            if (err){
                                return res.send({message : err});
                            }
                        })        
                        res.send("Updated TODO");
                    }       
                }
                    res.send("Requested task not found");
                }
                else {
                    return res.send("NO tasks"); 
                }
            }
            
        else {
            res.send("User not found");
        }
    }
    catch(e){
        res.send({message : e});
    }
}
var deletetodo = async(req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        if(user){
            for(let i = 0; i < user.todos.length; i++)
                if(user.todos[i] === req.body.task.toString()){
                    user.todos.splice(i, 1);
                    user.save((err) =>{
                        if(err) res.send({message : err});
                    });
                    res.send("DELETED SUCCESFULLY");
                }
            res.send("Task not found");
        }
        else res.send("Requested user not found");
    }
    catch(err){
        res.send({message : err});
    }
}
app.post("/api/auth/signup", checkDuplicateUsers, signup);
app.post("/api/auth/signin", signin);
app.post("/api/auth/signin/addtodo", verifyToken, addtodo);
(app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
}

app.post("/api/auth/signin/updatetodo", verifyToken, updatetodo);
app.post("/api/auth/signin/deletetodo", verifyToken, deletetodo);
app.get("/api/test/user", verifyToken, content);
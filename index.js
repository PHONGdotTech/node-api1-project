// implement your API here
const express = require("express");
const Users = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.status(200).json({name: "hellos"})
})

// add user
server.post("/api/users", (req, res)=>{
    console.log(req.body)
    if (!req.body.name || !req.body.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})}
        else {
            const newUser = req.body;
            Users.insert(newUser)
            .then(user =>{
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({errorMessage: "something went wrong adding a user"})
            }) 
         }
})

// get all users
server.get("/api/users", (req, res)=>{
    Users.find()
    .then(users => {
        res.status(200).json({users})
    })
    .catch(err => {
        res.status(500).json({errorMessage: "something went wrong getting all users"})
    })
})

// get a user by id
server.get(`/api/users/:id`, (req, res)=>{
    const {id} = req.params;
    Users.findById(6)
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "something went wrong getting a specific user by ID"})
    })
})

// remove a user with specified id
server.delete(`/api/users/:id`, (req, res)=>{
    Users.remove(req.params.id)
    .then(removed => {
        res.status(200).json(removed)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "something went wrong deleteing a user by ID"})
    })
})

// update a user with specified id
server.put(`/api/users/:id`, (req, res)=>{
    Users.update(req.params.id, req.body)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => {
        res.status(500).json({errorMessage: "something went wrong updating a user by ID"})
    })
})

const port = 5000;
server.listen(port, ()=> console.log("Server is running on port", port))
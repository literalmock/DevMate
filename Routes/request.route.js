const auth = require('../middleware/auth');
const connectionRequest = require('../models/connectionRequests');
const Router = require('express').Router();
const User = require("../models/user");

Router.post("/sent/:status/:userId", auth , async (req,res)=>{
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status.toLowerCase();
    const allowedStatus = ["interested","ignore"]
    const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
    
    // validate toUserId format
    if(!ObjectIdRegex.test(toUserId)){
        return res.status(400).send("Invalid User ID format");
    }

    //validate status
    console.log(toUserId,fromUserId)
   if(toUserId===fromUserId.toString()){
        return res.status(400).send(" Sender and Receiver Id can'nt be same ");
   } 
    if(!allowedStatus.includes(status)){
        return res.status(400).send("Invalid Request found");
    }
    // request redundancy
    const redundancycheck = await connectionRequest.findOne({
        $or: [
            {fromUserId , toUserId},
            {fromUserId: toUserId , toUserId: fromUserId}
        ]
    });
    const trial = await connectionRequest.findOne({toUserId})
    if(redundancycheck){
        return res.send("User request already exist")
    }

    // check if toUserId exists
    const checkUserId = await User.findById(toUserId)
    if (!checkUserId){
        return res.send("User Does'nt exist")
    }

    const con_request = new connectionRequest({
        fromUserId,toUserId,status
    })

    await con_request.save();
    res.json({"message": `successfullly added request to ${toUserId}` })
});

Router.post("/review/:status/:requestUserId", auth , async (req,res)=>{
    const currUserId = req.user._id;
    const status = req.params.status.toLowerCase();
    const requestUserId = req.params.requestUserId;
    const isAllowed = ["accepted","rejected"]
    if(!isAllowed.includes(status)){
        return res.status(400).send({message : "status not allowed"})
    }
    const con_request = await connectionRequest.findOne({
        fromUserId: requestUserId, toUserId: currUserId 
    })
    if (!con_request){
        res.send("No connection request found")
    }
    if(con_request.status !== "interested"){
        return res.status(400).send("Request already reviewed")
    }
    
    con_request.status = status;
    await con_request.save();

    return res.send(`Connection request ${status} successfully`)
});

module.exports = Router;
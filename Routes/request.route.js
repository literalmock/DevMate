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


module.exports = Router;
const auth = require("../middleware/auth");
const Router = require("express").Router();
const connectionRequest = require("../models/connectionRequests")
const User = require("../models/user.js")

Router.get('/requests/received',auth,async (req,res)=> {
    const loggedInUserId = req.user._id;

    const avail_req =  await connectionRequest.find({
        toUserId: loggedInUserId,
        status: "interested"
    }).populate('fromUserId',"name username email ")
    if (!avail_req){
        return res.send("No Requests found")
    }
    // let userreqs = []
    // for(let req of avail_req){
    //     let temp = req.fromUserId;
    //     let user = await User.findById(temp)
    //     userreqs.push(user.name)
    // }
    filter_avail_req = avail_req.map((row)=> (row.fromUserId))
    res.status(200).json({
        message : "data fetched successfully",
        data :  filter_avail_req
    })
});

Router.get('/connections',auth,async (req,res)=> {
    const loggedInUserId = req.user._id;
    const connections = await connectionRequest.find({
        $or : [{toUserId: loggedInUserId, status: "accepted"},
            {fromUserId: loggedInUserId, status: "accepted"}]
    }).populate("toUserId","name email").populate("fromUserId", "name email");

    if (!connections){
        res.send("No connections found")
    }
    let correct_connections = connections.map(n => {
        if (n.toUserId.equals(loggedInUserId)){
            console.log("tr")
            return n.fromUserId
        }
        if(n.fromUserId.equals(loggedInUserId)){
            console.log("downtr")
            return n.toUserId
        }
    })
    res.status(200).json({message: "Successfully fetched connections ",
        connections: correct_connections
    })

}
);

module.exports = Router;
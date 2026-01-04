const auth = require("../middleware/auth");
const Router = require("express").Router();
const connectionRequest = require("../models/connectionRequests")
const User = require("../models/user.js")

const USER_SAFE_DATA = "name username email phoneno age gender photoURL about skills createdAt "
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
            return n.fromUserId
        }
        if(n.fromUserId.equals(loggedInUserId)){
            return n.toUserId
        }
    })
    res.status(200).json({message: "Successfully fetched connections ",
        connections: correct_connections
    })
}
)
Router.get('/feed',auth,async (req,res)=>{
    // User 
    // 1. Show request from existing ids in db
    // 2. don't show logged in user profile/self profile
    // 3. don't show already ignored/interested/accepted/rejected profile
    // 4.  
    const loggedInUserId = req.user._id;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 5 ;
    let skip = (page-1)*limit
    // --we can also use fetch("/user/connections")
    const dontShowprofile = await connectionRequest.find({
        $or: [{fromUserId: loggedInUserId},
            {toUserId:loggedInUserId}]
    })
    // .populate("fromUserId","name username").populate("toUserId","name username")
    const dns = new Set();
    dns.add(loggedInUserId)
    dontShowprofile.map((n)=>{
        if ((n.fromUserId._id).equals(loggedInUserId)){
            dns.add(n.toUserId._id)
        }else{
           dns.add(n.fromUserId._id) 
        }
    })
    const dnsArray = [...dns];
    const users = await User.find({
         _id: { $nin: dnsArray }
    })
    .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit)

    res.status(200).send(users)
    // const getrelevantaccount = User.find({
        
    // })
    
}
)

module.exports = Router;
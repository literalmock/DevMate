const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  toUserId: { type: mongoose.Schema.Types.ObjectId, required: true,message: "Invalid format" },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignore", "accepted", "rejected", "interested"],
      message: "{VALUE} is incorrect status type",
    },
  },
},
  {
    timestamps: true
  }
);

const connectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequest;

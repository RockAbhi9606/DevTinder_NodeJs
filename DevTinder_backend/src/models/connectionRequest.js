const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
}, {
    timestamps: true
}
);

//compound indexing 1 means ascending and -1 means descending.
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 })

connectionRequestSchema.pre('save', function (next) {
    const connectionRequest = this;

    //Check if the fromUserId is same as the toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Invalid self connection Request!");
    }
    next();
});

module.exports = new mongoose.model("ConnectionRequest", connectionRequestSchema);

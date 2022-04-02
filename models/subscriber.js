import mongoose from "mongoose"

const subscriberSchema=new mongoose.Schema({
    HWID:{
        type: String,
        required: true
    },
    custType:{
        type: String,
        required: true
    },
    lastDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})


export default mongoose.model('Subscriber',subscriberSchema)
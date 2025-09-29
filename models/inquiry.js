const mongoose = require('mongoose')

const inquirySchema = new mongoose.Schema({

    listings: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: false,
    },
    name:{
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
MediaSourceHandle.exports = Inquiry;
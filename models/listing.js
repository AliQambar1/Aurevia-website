const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    make:{
        type: String,
        required: true,
    },
    modelyear:{
        type: Number,
        required: true,
     },
    spec:{
        type: String,
        required: true,
        enum: ['GCC', 'EU', 'US'],
    },
    price:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ['Available', 'Sold'],
    },

    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    notes: {
    type: String,
  },

});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

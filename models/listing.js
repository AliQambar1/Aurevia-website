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
        min: 0,
    },
    status:{
        type: String,
        required: true,
        enum: ['Available', 'Sold'],
    },
    notes: {
    type: String,
  },

});

const Listing = mongoose.model('Listing', listingSchema);
module.exports

module.exports = Listing;

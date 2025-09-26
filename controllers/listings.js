const express = require('express');
const router = express.Router();
const Listing = require('../models/listing')

//Getrout for listing
router.get('/', async (req, res) =>{
    try{
        const listings = await Listing.find({});
        console.log(listings);
        res.render("Aurevia/index.ejs", {listings: listings});
    }catch(error){
        console.error(error)
        res.redirect("/");
    }
});

module.exports = router;

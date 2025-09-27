const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/user')
const isAdmin = require('../middleware/is-admin');

//Get rout for listing
router.get('/', async (req, res) =>{
    try{
        const listings = await Listing.find({});
        console.log(listings);
        res.render("listings/index.ejs", {listings: listings});
    }catch(error){
        console.error(error)
        res.redirect("/");
    }
});

router.get('/new', isAdmin ,async(req, res)=>{
try{
    res.render("listings/new.ejs")
}catch(error){
    console.error(error);
    res.redirect('/listings')
}
});

router.post('/', isAdmin, async (req, res) => {
try {
    await Listing.create(req.body);
    console.log(req.body);
    res.redirect('/listings');
 }catch(error) {
    console.error(error);
    res.redirect('/listings/new');
    }
});

router.get('/:listingId', async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId); 
        res.render('listings/show.ejs', { listing });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

router.delete("/:listingId", async (req, res) => {
  try {
     await Listing.findByIdAndDelete(req.params.listingId);
      res.redirect("/listings");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get('/:listingId/edit', isAdmin, async (req, res) =>{
    try{
        const currentListing = await Listing.findByIdAndUpdate(req.params.listingId);
        res.render('listings/edit.js', {
           listing: currentListing, 
        });
        
    } catch(error){
        console.log(error)
        res.redirect('/')
    }
});


module.exports = router;

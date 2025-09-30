const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');
const User = require('../models/user')
const isAdmin = require('../middleware/is-admin');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

//Get rout for listing
router.get('/', async (req, res) =>{
    try{
      let filter = {};
      if (req.query.status){
        filter.status = req.query.status;
      }
        const listings = await Listing.find(filter);
        console.log(listings);
        res.render("listings/index.ejs", {listings: listings});
    }catch(error){
        console.error(error)
        res.redirect("/");
    }
});

// New Form
router.get('/new', isAdmin ,async(req, res)=>{
try{
    res.render("listings/new.ejs")
}catch(error){
    console.error(error);  
    res.redirect('/listings')
}
});

// Creat lsiting & adding image
router.post('/', isAdmin, upload.array('images', 10), async (req, res) => {
try {
    const imagePaths = req.files.map(file => file.filename);
    const newListing = new Listing({
      ...req.body,
      images: imagePaths
    });
    await newListing.save();
    res.redirect('/listings');
 }catch(error) {
    console.error(error);
    res.redirect('/listings/new');
    }
});


// Show one listing
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

// Delet listing
router.delete("/:listingId", isAdmin ,async (req, res) => {
  try {
     const listing = await Listing.findByIdAndDelete(req.params.listingId);
      res.redirect("/listings");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Edit form
router.get('/:listingId/edit', isAdmin, async (req, res) => {
    try {
    const currentListing = await Listing.findById(req.params.listingId);
    res.render("listings/edit.ejs", { listing: currentListing });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Update Listing and images
router.put('/:listingId', isAdmin, upload.array('images', 10), async (req, res) => {
   try {
    const listing = await Listing.findById(req.params.listingId);

    if (req.files.length > 0) {
      const newImages = req.files.map(file => file.filename);
      listing.images.push(...newImages);
    }
    listing.make = req.body.make;
    listing.modelyear = req.body.modelyear;
    listing.spec = req.body.spec;
    listing.exterior = req.body.exterior
    listing.exterior = req.body.exterior
    listing.price = req.body.price;
    listing.status = req.body.status;
    listing.notes = req.body.notes;
    await listing.save();
    res.redirect(`/listings/${req.params.listingId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Delete image
router.delete('/:listingId/images/:imageName', isAdmin, async (req, res) => {
  try {
    const { listingId, imageName } = req.params;
    const listing = await Listing.findById(listingId);
    listing.images = listing.images.filter(img => img !== imageName);
    await listing.save();
    res.redirect(`/listings/${listingId}/edit`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});



module.exports = router;
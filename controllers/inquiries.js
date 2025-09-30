const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');
const Listing = require('../models/listing');

router.get('/new', async(req,res) =>{
    try{
        const listingId = req.query.listingId;
        res.render('inquiries/new.ejs', {listingId});
    }catch(error){
        console.log(error);
        res.redirect('/listings')
    }
});

router.post('/',async(req,res)=>{
    try{
        const {listingId, name, phone, email, message, createdAt } = req.body;

        const newInquiry = new Inquiry({
      listingId,
      name,
      phone,
      email,
      message,
      createdAt,
    });

    }catch(error){
        console.log(error);
        res.redirect("/inquiries/new")
    }
})

module.exports = router;

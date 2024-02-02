const Rating = require("../models/Rating");

const addRating = async(req, res) => {
    try{
        const rating = await Rating.create(req.body);
        return res.status(200).json({valid: true, msg:"Rating posted", rating}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const getAllRating = async(req, res) => {
    try{
        const {userId} = req.body;
        
        const ratings = await Rating.find({userId}).populate("productId").populate("userId");
        return res.status(200).json({valid: true, msg:"Rating posted", ratings}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const getProductRatings = async(req, res) => {
    try{
        const {productId} = req.body;
        const ratings = await Rating.find({productId}).populate("userId").populate("productId");
        return res.status(200).json({valid: true, msg:"Got all rating of products", ratings}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}

const viewRating = async(req, res) => {
    try{
        const {ratingId} = req.params;
        const rating = await Rating.findOne({_id: ratingId});
        return res.status(200).json({valid: true, msg:"Rating fetched", rating}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}

const updateRating = async(req, res) => {
    try{
        const {ratingId} = req.params;
        const rating = await Rating.findOneAndUpdate({_id: ratingId}, req.body, {
            new: true
        })
        return res.status(200).json({valid: true, msg:"Rating fetched", rating}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const deleteRating = async(req, res) => {
    try{
        const {ratingId} = req.params;
        await Rating.findByIdAndDelete({_id:ratingId});
        return res.status(200).json({valid: true, msg:"Rating deleted"}); 
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}

module.exports = {
    addRating,
    deleteRating,
    getAllRating,
    viewRating,
    updateRating,
    getProductRatings
}
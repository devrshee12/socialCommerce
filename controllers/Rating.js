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
        let { userId, searchQuery, sortBy, sortOrder, page, limit } = req.query;
        userId = userId || '';
        searchQuery = searchQuery || '';
        sortBy = sortBy || '';
        sortOrder = sortOrder || 'asc';
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const skip = (page - 1) * limit;

        let query = {};

        // If userId is provided, add it to the query
        if (userId) {
            query.userId = userId;
        }

        // If there's a search query, add it to the query
        if (searchQuery) {
            query.$or = [
                { 'productId.name': { $regex: new RegExp(searchQuery, 'i') } }, // Case-insensitive search on product name
                { star: { $regex: new RegExp(searchQuery, 'i') } }, // Case-insensitive search on comment text
                { desc: { $regex: new RegExp(searchQuery, 'i') } }, // Case-insensitive search on comment text
                { 'userId.name': { $regex: new RegExp(searchQuery, 'i') } } // Case-insensitive search on user name
            ];
        }

        let sortOptions = {};

        // Sort by specified field
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const ratings = await Rating.find(query)
            .populate("productId")
            .populate("userId")
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        // Calculate total number of ratings for pagination
        const totalRatings = await Rating.countDocuments(query);
        const totalPages = Math.ceil(totalRatings / limit);

        return res.status(200).json({ valid: true, msg: "All Ratings fetched", ratings, totalPages });
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
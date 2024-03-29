const Comment = require("../models/Comment");


const addComment = async(req, res) => {
    try{
        const comment = await Comment.create(req.body);
        return res.status(200).json({valid: true, msg:"Comment posted", comment});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}

const getAllComments = async(req, res) => {
    try{
        let { userId, searchQuery, sortBy, sortOrder, page, limit } = req.query;
        userId = userId || '';
        searchQuery = searchQuery || '';
        sortBy = sortBy || '';
        sortOrder = sortOrder || 'asc';
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        let query = {};

        // If userId is provided, add it to the query
        if (userId) {
            query.userId = userId;
        }

        // If there's a search query, add it to the query
        if (searchQuery) {
            query.$or = [
                { 'productId.name': { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on product name
                { comment: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search on comment text
            ];
        }

        const totalComments = await Comment.countDocuments(query);

        const totalPages = Math.ceil(totalComments / limit);

        const skip = (page - 1) * limit;

        let sortOptions = {};

        // Sort by specified field
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const comments = await Comment.find(query)
            .populate("productId")
            .populate("userId")
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        return res.status(200).json({ valid: true, msg: "All Comments fetched", comments, totalPages });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const getAllProductComment = async(req, res) => {
    try{
        const {productId} = req.body; 
        const comments = await Comment.find({productId}).populate("productId").populate("userId")

        return res.status(200).json({valid: true, msg:"All Comment fetched", comments});
    }   
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const viewComment = async(req, res) => {
    try{
        const {commentId }= req.params;
        const comment = await Comment.findOne({_id: commentId}).populate("productId").populate("userId")
        return res.status(200).json({valid: true, msg:"Comment fetched", comment});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const updateComment = async(req, res) => {
    try{
        const {commentId} = req.params;

        const comment = await Comment.findOneAndUpdate({_id: commentId}, req.body, {
            new: true
        })
        return res.status(200).json({valid: true, msg:"Comment updated", comment});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}



const deleteComment = async(req, res) => {
    try{
        const {commentId} = req.params;
        await Comment.findByIdAndDelete({_id: commentId});
        return res.status(200).json({valid: true, msg:"Comment deleted"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


module.exports = {
    addComment,
    deleteComment,
    getAllComments,
    viewComment,
    updateComment,
    getAllProductComment
}
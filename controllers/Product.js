const Product = require("../models/Product");


const checkRole = (role) => {
    if(role !== "admin"){
        throw new Error("Only admin can perform this task");
    }
}


const createProduct = async(req, res) => {
    try{
        const {role} = req.user;
        checkRole(role)
        const product = await Product.create(req.body)
        return res.status(200).json({valid: true, msg:"Product has been created", product});
    }
    catch(err){
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const getAllProducts = async(req, res) => {
    try{
        // const {role} = req.user;
        // console.log("here in get ALl products");
        // checkRole(role);
        const products = await Product.find({}, {createdAt: 0, updatedAt: 0, __v: 0});
        return res.status(200).json({valid: true, msg:"Products has been fetched", products});
    }
    catch(err){
        return res.status(500).json({valid: false, msg:err.message});
    }
}

const getProduct = async(req, res) => {
    try{

        const {productId} = req.params;
        const product = await Product.findOne({_id: productId}, {createdAt: 0, updatedAt: 0, __v: 0})
        if(!product){
            throw new Error("Product not found");
        }
        return res.status(200).json({valid: true, msg:"Products has been fetched", product});

    }
    catch(err){
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const updateProduct = async(req, res) => {
    try{
        const {role} = req.user;
        const {productId} = req.params;
        checkRole(role);
        const product = await Product.findOneAndUpdate({_id: productId}, req.body, {
            new: true
        });
        if(!product){
            throw new Error("Product not found");
        }
        return res.status(200).json({valid: true, msg:"Products has been updated", product});
    }
    catch(err){
        
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const deleteProduct = async(req, res) => {
    try{
        const {role} = req.user;
        checkRole(role);
        const {productId} = req.params
        await Product.findByIdAndDelete({_id: productId})
        return res.status(200).json({valid: true, msg:"Products has been deleted"});
    }
    catch(err){
        return res.status(500).json({valid: false, msg:err.message});
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    getProduct,
    updateProduct
}
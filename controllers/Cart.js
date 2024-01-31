const Cart = require("../models/Cart");

const addProductInCart = async(req, res) => {
    try{
        const {userId, productId} = req.body;

        const cart = await Cart.findOneAndUpdate({userId}, {
            $push: {
                "products": productId
            }
        }, {
            new:true
        })
        return res.status(200).json({valid: true, msg:"Product has been added in cart", cart});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const deleteProductfromCart = async(req, res) => {
    try{
        const {userId, productId} = req.body;
        const cart =  await Cart.findOneAndUpdate({userId}, {
            $pull: {
                "products": productId
            }
        }, {
            new: true
        })

        return res.status(200).json({valid: true, msg:"Product has been deleted in cart", cart});


    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }

}


const getAllProductCarts = async(req, res) => {
    try{
        const {userId} = req.params;
        const products = await Cart.find({userId});
        return res.status(200).json({valid: true, msg:"Got all products from cart", products});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


module.exports = {
    addProductInCart,
    deleteProductfromCart,
    getAllProductCarts
}
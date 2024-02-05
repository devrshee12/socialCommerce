const Cart = require("../models/Cart");

const addProductInCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const cart = await Cart.findOneAndUpdate(
            { userId },
            {
                $addToSet: {
                    products: {
                        product: productId,
                        quantity: quantity || 1 // Default quantity to 1 if not provided
                    }
                }
            },
            { new: true }
        );

        return res.status(200).json({ valid: true, msg: "Product has been added to the cart", cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ valid: false, msg: err.message });
    }
};

const deleteProductFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOneAndUpdate(
            { userId },
            {
                $pull: {
                    products: { product: productId }
                }
            },
            { new: true }
        );

        return res.status(200).json({ valid: true, msg: "Product has been deleted from the cart", cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ valid: false, msg: err.message });
    }
};

const getAllProductCarts = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        return res.status(200).json({ valid: true, msg: "Got all products from the cart", cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ valid: false, msg: err.message });
    }
};


const updateProductInCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        console.log("called update product cart", req.body);
        const cart = await Cart.findOneAndUpdate(
            { userId, "products.product": productId },
            {
                $set: {
                    "products.$.quantity": quantity || 1 // Default quantity to 1 if not provided
                }
            },
            { new: true }
        );

        console.log("cart is : ", cart);

        

        return res.status(200).json({ valid: true, msg: "Product quantity updated in the cart", cart });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ valid: false, msg: err.message });
    }
};

module.exports = {
    updateProductInCart
};

module.exports = {
    addProductInCart,
    deleteProductFromCart,
    getAllProductCarts,
    updateProductInCart
};

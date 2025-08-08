const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order"); // ✅ This is required
const { authenticateToken } = require("./userAuth");

router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    if (!id || !order || !Array.isArray(order)) {
      return res.status(400).json({ message: "Missing or invalid data" });
    }

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id }); // ✅ fixed: new Order (not new order)
      const orderDataFromDb = await newOrder.save();

     //saving order in user model
      await User.findByIdAndUpdate (id , {
        $push: { orders: orderDataFromDb._id },
      });

      // clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { orders: orderData._id },
      });
    }

    return res.json({
      status: "success",
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


//get order history od particular user 
router.get("/get-order-history" , authenticateToken , async (req ,res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path : "orders",
            populate : {path : "book"},
        });
        const ordersData = userData.orders.reverse();
        return res.json({
            status : "success",
            data : ordersData ,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

});

//get all orders --admin
router.get("/get-all-orders" , authenticateToken , async (req ,res) => {
    try {
        const userData = await Order.find().populate({
            path: "book",
        })
        .populate ({
            path : "user",
        })
        .sort({
            createdAt: -1,
        });
        return res.json({
            status: "success",
            data: userData,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
});

//update order admin
router.put("/update-status/:id" , authenticateToken , async (req ,res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id , {status : req.body.status});
        return res.json({
            status : "success",
            message : "Order status updated successfully",
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
});



module.exports = router;

const router=require('express').Router();
const Product=require('../models/productModel');
const authMiddleware = require("../middlewares/authMiddleware"); 
const cloudinary=require("../config/cloudinaryConfig");
const multer=require("multer");
//add a new product
router.post("/add-product",authMiddleware,async(req,res)=>{
    try {
        const newProduct=new Product(req.body);
        await newProduct.save();
        res.send({
            success: true,
            message: "Item added successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

//get-all-products
router.post('/get-products',async(req,res)=>{
    try {
      const {seller,categories=[],weight=[]}=req.body
      let filters={}
      if(seller){
        filters.seller=seller;
      }
        const products=await Product.find(filters).populate('seller').sort({createdAt: -1});
        res.send({
            success: true,
            data : products,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

//get product by id
router.get("/get-product-by-id/:id",async(req,res)=>{
  try {
    const product=await Product.findById(req.params.id).populate("seller");
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//edit product
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Item updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//delete product
router.delete("/delete-product/:id",authMiddleware,async(req,res)=>{
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Item deleted successsully"
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    })
  }
})

//get image from pc
const storage=multer.diskStorage({
  filename: function(req,file,callback){
    callback(null,Date.now()+file.originalname);
  },
})
//handle image upload to cloudinary
router.post("/upload-image-to-product",authMiddleware,multer({storage:storage}).single("file"),async(req,res)=>{
  try {
    //upload image to cloudinary
    const result= cloudinary.uploader.upload(req.file.path,{
      folder: "scrapg",
    }); //getting the url
    const productId=req.body.productId;
    await Product.findByIdAndUpdate(productId,{
      $push: {images: (await result).secure_url},
    });
    res.send({
      success: true,
      message: "Image uploaded successfully",
      data: result.secure_url,
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    })
  }
})

//update product status 
router.put("/update-product-status/:id",authMiddleware,async(req,res)=>{
  try{
    const {status}=req.body;
    await Product.findByIdAndUpdate(req.params.id,{status});
    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  }
  catch(error){
    res.send({
      success: false,
      message: error.message,
    })
  }
})



module.exports= router;
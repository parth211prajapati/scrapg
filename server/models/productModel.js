const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    weight:{
        type: Number,
        required: true,
    },
    images: {
        type:Array,
        default: [],
        requied: true,
    }, 
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    status:{
        type: String,
        default: "pending",
        required: true,
    } 
},{timestamps: true}
)

module.exports= mongoose.model("products",productSchema);
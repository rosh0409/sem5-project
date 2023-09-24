import mongoose from "mongoose";


const product = mongoose.Schema({
    pname:{
        type:String,
        require:true
    },
    pimg:{
        type:String,
        require:true
    },
    pdesc:{
        type:String,
        require:true
    },
    pprice:{
        type:String,
        require:true
    },
    pcat:{
        type:String,
        require:true
    }
})

export default mongoose.model("product",product);

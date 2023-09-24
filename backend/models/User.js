import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const user = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    mobile:{
        type:Number,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    
})

user.pre("save", async function(next){
    try{
        const salt = await bcryptjs.genSalt(10)
        const hashPassword = bcryptjs.hash(this.password,salt)
        this.password = hashPassword
        next()
    }catch(error){
        next(error.message)
    }
})

user.methods.generateAuthToken = async function(){
    try {
        let tokenGen = jwt.sign(
                {userID:this._id},
                "RroshansinghRoshanSinghROSHANSINGHS",
                {expiresIn:"1d"}
                )
        this.tokens = this.tokens.concat({token:tokenGen});
        await this.save();
        return tokenGen;
    } catch (error) {
        console.log(error.message)
    }
}
export default mongoose.model("user",user);
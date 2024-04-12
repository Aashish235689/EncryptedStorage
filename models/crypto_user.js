const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name not there'],
        minlength:3,
        maxlength:50
    },
    password:{
        type:String,
        required:[true,'password not there'],
        minlength:7,
    },
    images:{
        type:Map,
        of: String,
        default:{}
    },
    key:{
        type:String,
        default:'1234567890123456'
    }
})

UserSchema.methods.createJWT=function(){
    // console.log('hi');
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_secret,{
        expiresIn:'1d'
    })
}

module.exports=mongoose.model('cryptoUser',UserSchema)
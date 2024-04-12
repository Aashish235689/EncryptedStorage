const User=require('../models/crypto_user');
const jwt=require('jsonwebtoken');

const register=async(req,res)=>{
    let random='';
    const charactersLength=95;
    for(let i=0;i<16;i++){
        random+=(String.fromCharCode(Math.floor(Math.random()*charactersLength+33)))
    } 
    const data=req.body;
    data['key']=random;
    const user= await User.create(data);
    // console.log(user);
    const token=user.createJWT();
    res.status(200).json({user:{name:user.name,images:user.images,userId:user._id,key:user.key},token});
}

const login=async(req,res)=>{
    const {name,password}=req.body;
    // console.log(email,password);
    if(!name||!password){
        // console.log('hi');
        res.status(400).json({error:'missing credentials'})
    }
    const user= await User.findOne({name});
    if(!user){
        res.status(400).json({error:'user not found'})
    }
    // console.log('hi');
    
    if(user['password']!=password){
        res.status(400).json({error:'password not matched'})
    }
    const token=user.createJWT();
    res.status(200).json(({user:{name:user.name,images:user.images,userId:user._id,key:user.key},token}));
}


const getUsers=async(req,res)=>{
    const {name,userID}=req.query;
    // console.log(name,userID);
    const queryObject={};
    if(name){
        queryObject.name={$regex:name,$options:'i'};
    }
    if(userID){
        queryObject._id=userID;
    }
    // console.log(queryObject);
    // console.log(queryObject);
    const users=await User.find(queryObject);
    // console.log(users);
    res.status(200).json({users});
    // console.log(users);
}

const updateUser=async(req,res)=>{
    console.log(req.body);
    const {imageName,image}=req.body;
    const {userID:_id}=req.user
   //   console.log(userID);
       if(!_id){
            res.status(400).json({error:'userID not found'});
       }
       // console.log(data);
       const user=await User.findById({_id})
       console.log(user)
       const images=user['images']
       images.set(imageName,image)
       data=user
       data['images']=images
       console.log(images)
       const user2=await User.findByIdAndUpdate({
           _id
       },data,{
           new:true,
           runValidators:true
       })
       console.log(user2)
       if(!user2){
        req.status(404).json({error:'user not found'});
       }
       res.status(200).json({user2});
}

const getImage= async(req,res)=>{
    const {name,userID}=req.user;
    const {imageName}=req.params;
    const queryObject={}
    // if(name){
    //     queryObject.name={$regex:name,$options:'i'}
    // }
    if(userID){
        queryObject._id=userID;
    }
    console.log(userID)
    const user=await User.findOne(queryObject);
    if(user==null){
        res.status(404).json({error:'user not found'})
    }
    console.log(user)
    const image=user.images.get(imageName);
    console.log(image)
    res.status(200).json({image})

}
module.exports={
    login,register,getUsers,getImage,updateUser
}
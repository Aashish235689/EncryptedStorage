const fs=require('fs');

const path=require('path');

const {log}=require('console');
const cloudinary=require('cloudinary').v2;

const uploadUserImage=async (req,res)=>{
    console.log(req.files.image.tempFilePath)
    console.log('hii')
    const result=await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,folder:'crypto'
    })
    fs.unlinkSync(req.files.image.tempFilePath);
    res.status(200).json({image:{src:result.secure_url}})
}

module.exports={
    uploadUserImage
}
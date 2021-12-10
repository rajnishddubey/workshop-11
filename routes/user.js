const router = require("express").Router();
//const user = require("../model/user");
const cloudinary = require("../utils/cloud");
const upload = require("../utils/multer");
const User = require("../model/user");
//const user = require("../model/user");

router.post("/",upload.single("image"),async(req,res)=>{
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        const user = new User({
            name:req.body.name,
            avatar:result.secure_url,
            cloudinary_id:result.public_id
        });
        await user.save();
        res.json(user);


        

    
    }
    catch(err){
        console.log(err)
    }
})

router.get("/",async(req,res)=>{
    try{
        let user = await User.find();
        res.status(200).json({
            All_files:user
        })

    }
    catch(err){
        console.log(err);

    }
})

router.delete("/:id",async(req,res)=>{
    try{
        let user = await User.findById(req.params.id);
        await cloudinary.uploader.destroy(user.cloudinary_id);
        await user.remove();
        res.status(200).json({
            Deleted_user:user
        })

    }
    catch(err){
        
        console.log(err);
    }
})


router.put("/:id",upload.single("image"),async(req,res)=>{
    try{
        let user = await User.findById(req.params.id)
        await cloudinary.uploader.destroy(user.cloudinary_id);
        const result = await cloudinary.uploader.upload(req.file.path);
        const data = {
            name:req.body.name || user.name,
            avatar:result.secure_url || user.avatar,
            cloudinary_id:result.public_id || user.cloudinary_id
        };
        user = await User.findByIdAndUpdate(req.params.id,data,{new:true});
            res.json(user)
            

    }
    catch(err){
        console.log(err)
        
    }
})





module.exports = router;
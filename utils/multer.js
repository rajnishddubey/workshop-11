const multer = require("multer");
const path = require("path");

module.exports = multer({
    storage : multer.diskStorage({}),
    filefilter:(req,res,cb)=>{
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            cb(new Error("File not supported "),false);
            return;
        }
        cb(null,true); 
    }
})
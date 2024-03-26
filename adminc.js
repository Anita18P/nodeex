const blogContent = require("../models/blogDetails")

exports.postBlogDetails=async(req,res,next)=>{
   try{ const title=req.body.title;
    const author=req.body.author;
    const content=req.body.content;
 const data = await blogContent.create({
    Title:title,
    Author:author,
    Content:content
});
   res.status(201).json({newBlogData:data});
}catch(err){
    console.log(err);
}
};
const blogContent = require("../models/blogDetails")
const Comment=require("../models/comments")
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

exports.getBlogDetails=async (req,res,next)=>{
    console.log('getblog details method');
    try{
    const data=await blogContent.findAll();
    console.log('data from database');
    console.log(data);

    res.status(200).json({allBlogData:data});
    }
    catch(err){
        console.log(err);
    }
}
exports.postComments=async (req,res,next)=>{
    const comment=req.body.commentDetail;
    const bdetails=req.body.BlogDetails;
    console.log('blog details');
    console.log(bdetails);
    console.log('comment details');
    console.log(req.body.commentDetail);
   const data=await Comment.create({
        commentDetail: comment,
        BlogId:bdetails.id
});
   res.status(200).json({allcommentData:data});
}
exports.getComments= async(req,res,next)=>{
    try{const BlogId=req.params.id;
    console.log(BlogId);
    const commentsData=await Comment.findAll({
        where:{
            BlogId:BlogId
        }
    })
    res.status(200).json({commentsData:commentsData});
}
catch(err){
    console.log('comment error');
    console.log(err);
}
};
exports.deleteComment=async(req,res,next)=>{
    try{console.log('in delete comments route');
    const commentId=req.params.id;
     const data=await Comment.destroy({
        where:{
            id:commentId
        }
    })
    res.status(201).json({commentsDetails:data});
}catch(err){console.log(err);}

}
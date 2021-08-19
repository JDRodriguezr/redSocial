
const Post = require("../models/post");
const User = require("../models/user")

const createPost = async (req,res) => {

    if(!req.body.text||!req.body.hashtag) return res.status(401).send("Process failed: Incomplete data");

    let user = await User.findById(req.user._id);
    const post = new Post({
        userId: user._id,
        text: req.body.text,
        hashtag:req.body.hashtag,
        dbStatus:true,
    })
    const result = await post.save();

    if(!result) return res.status(401).send("Process failed: Post was not published");

    return res.status(200).send({post});
};


const listPost = async (req,res) => {

    let user = await User.findById(req.user._id);
    const post = await Post.find({userId: user._id});
 
    if(!post || post.length  === 0) return res.status(401).send("No post");

    return res.status(200).send({post});
};

module.exports = {createPost,listPost};
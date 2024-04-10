const errHandle = require('../service/errHandle');
const successHandle = require('../service/succesHandle');

const Post = require('../models/postSchema');

const posts = {
    async getPosts({req, res}) {
        const post = await Post.find();
        successHandle(res, post);
    },
    async createPost({ req, res, body }) {
        try {
            const data = JSON.parse(body);
            if (data.content !== undefined) {
                const newPost = await Post.create(
                    {
                        name: data.name,
                        content: data.content,
                        tags: data.tags,
                        type: data.type
                    }
                );
                successHandle(res, newPost);
            } else {
                errHandle(res)
            }
        } catch (err) {
            errHandle(res)
        }
    },
    async editPost({ req, res, body }) {
        try {
            const data = JSON.parse(body);
            const id = req.url.split('/').pop();
            if (data.content !== undefined) {
                const editContent = {
                    name: data.name,
                    content: data.content,
                    tags: data.tags,
                    type: data.type
                };
                //更新後最新的 DATA
                const editPost = await Post.findByIdAndUpdate(id, editContent,{ new: true });
                console.log(editPost)
                successHandle(res, editPost);
            } else {
                errHandle(res);
            }
        } catch (err) {
            errHandle(res);
        };
    },
    async deletePosts({req, res}){
        await Post.deleteMany({});
        await this.getPosts({req, res})
    },
    async deletePost({req, res}){
        try {
            const id = req.url.split('/').pop();
            await Post.findByIdAndDelete(id);
            await this.getPosts({req, res})
        } catch (err) {
            errHandle(res);
        }
    }
}

module.exports = posts;
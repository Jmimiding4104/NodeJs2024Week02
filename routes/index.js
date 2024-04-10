const HttpControllers = require('../controllers/http');
const PostControllers = require('../controllers/posts');

const routes = async (req, res) => {

    //解構減少重複
    const {url ,method} = req;

    let body = "";
    req.on('data', chuck => {
        body += chuck
    })

    //取得所有資料
    if (url == '/posts' && method == 'GET') {
        PostControllers.getPosts({req, res});
    } else if (method == 'OPTIONS') {
        HttpControllers.cors({req, res})
    } else if (url == '/posts' && method == 'POST') {
        //資料確認都處理完成再繼續
        req.on('end', () => {
            //傳入物件，即可解析物件順序不需注意
            PostControllers.createPost({req, res, body});
        })
    } else if (url.startsWith('/posts/') && method == 'PATCH') {
        req.on('end', () => {
            PostControllers.editPost({req, res, body});
        });
    } else if (url == '/posts' && method == 'DELETE') {
        PostControllers.deletePosts({req, res});
    } else if (url.startsWith('/posts/') && method == 'DELETE') {
        PostControllers.deletePost({req, res});
    } else {
        HttpControllers.notFound({req, res})
    }
}

module.exports = routes;
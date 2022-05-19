import axios from 'axios'

class APIServices {
    constructor() {
        thisapi = axios.create({baseURL: 'http://localhost:5005/api'})
    }

    //Auth methods

    registerRoute = () => {
        return this.api.post('/signup')
    }

    loginRoute = () => {
        return this.api.post('/login')
    }

    verifyRoute = () => {
        return this.api.get('/verify')
    }

    // User methods

    userDetailsRoute = () => {
        return this.api.get(`/users/${userId}`)
    }

    updateUserRoute = () => {
        return this.api.put(`/users/${userId}`)
    }

    followUserRoute = () => {
        return this.api.put(`/users/${userId}/follow`)
    }

    getFollowersRoute = () => {
        return this.api.get(`/users/${userId}/followers`)
    }

    getFollowingsRoute = () => {
        return this.api.get(`/users/${userId}/followings`)
    }

    // Posts methods

    createPostRoute = () => {
        return this.api.post('/posts')
    }

    getPostListRoute = () => {
        return this.api.get('/posts')
    }

    getOnePostRoute = () => {
        return this.api.get(`/posts/${postId}`)
    }

    editOnePostRoute = () => {
        return this.api.put(`/posts/${postId}/edit`)
    }

    likesPostRoute = () => {
        return this.api.put(`/posts/${postId}`)
    }

    deletePostRoute = () => {
        return this.api.delete(`/posts/${postId}`)
    }

    //Comments methods

    createCommentRoute = () => {
        return this.api.post(`/posts/${postId}`)
    }

    removeCommentRoute = () => {
        return this.api.put(`/posts/${postId}/${commentId}`)
    }

    likesCommentRoute = () => {
        return this.api.put(`/comments/${commentId}`)
    }
}

const apiServices = new APIServices();

export default apiServices
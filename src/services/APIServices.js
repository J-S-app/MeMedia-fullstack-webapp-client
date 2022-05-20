import axios from 'axios'

class APIServices {
    constructor() {
        this.api = axios.create({baseURL: process.env.REACT_APP_API_URL})
    }

    //Auth methods

    registerRoute = (requestBody) => {
        return this.api.post('/auth/signup',requestBody)
    }

    loginRoute = (requestBody) => {
        return this.api.post('/auth/login',requestBody)
    }

    verifyRoute = () => {
        return this.api.get('/auth/verify')
    }

    // User methods

    userDetailsRoute = (userId,header) => {
        return this.api.get(`/users/${userId}`,header)
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

    createPostRoute = (requestBody,header) => {
        return this.api.post('/posts',requestBody,header)
    }

    getPostListRoute = (header) => {
        return this.api.get('/posts',header)
    }

    getOnePostRoute = (postId,header) => {
        return this.api.get(`/posts/${postId}`,header)
    }

    editOnePostRoute = (postId,requestBody,header) => {
        return this.api.put(`/posts/${postId}/edit`,requestBody,header)
    }

    likesPostRoute = (postId,header) => {
        return this.api.put(`/posts/${postId}`,header)
    }

    deletePostRoute = (postId,header) => {
        return this.api.delete(`/posts/${postId}`,header)
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
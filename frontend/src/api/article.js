import axios from '@/api/axios'

const getArticle = ( id) => {
    return axios.get(`/articles/${id}`)
}

const deleteArticle = id => {
    return delete(`articles/${id}`)
}

const createArticle = articleInput => {
    return post(`articles/`,articleInput)
    .then(response=>response.data)
}
const updateArticle = id => {
    return post(`articles/update/${id}`)
}

export default {
    updateArticle,
    createArticle,
    deleteArticle,
    getArticle
}
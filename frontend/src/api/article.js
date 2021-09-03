import axios from '@/api/axios'

const getArticle = ( id) => {
    return axios.get(`/articles/${id}`)
}

const deleteArticle = id => {
    return axios.delete(`articles/${id}`)
}

const createArticle = articleInput => {
    return axios.post(`articles/`,{articleInput})
    .then(response=>response.data)
}
const updateArticle = id => {
    return axios.post(`articles/update/${id}`)
}

export default {
    updateArticle,
    createArticle,
    deleteArticle,
    getArticle
}
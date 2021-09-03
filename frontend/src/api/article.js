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
const updateArticle = (id,articleInput) => {
    return axios.put(`articles/update/${id}`,articleInput).then(response=>response.data)
}

export default {
    updateArticle,
    createArticle,
    deleteArticle,
    getArticle
}
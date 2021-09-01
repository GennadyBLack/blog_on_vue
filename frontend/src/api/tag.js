import axios from '@/api/axios'

const getPopularTags = () =>{
 return axios.get('/category')
}

export default {
getPopularTags
}
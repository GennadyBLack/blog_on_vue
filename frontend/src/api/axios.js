import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'



axios.defaults.baseURL = 'http://localhost:2400/'


axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    const authorizationToken = token ? `Token ${token}` : ''
    config.headers.Authorization = authorizationToken
    return config
})
export default axios
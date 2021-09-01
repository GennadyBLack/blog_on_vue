import axios from './axios'

const register = credentials =>{
   return axios.post('auth/signup',{user:credentials})
}
const login = credentials =>{
    return axios.post('auth/login',{user:credentials})
 }
 const getCurrentUser = () =>{
     return axios.get('auth/jwt-test')
 }
export default {
    register,
    login,
    getCurrentUser
}
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

 const updateCurrentUser = (id,currentUserInput)=>{
     axios.put('/user',currentUserInput).then(response=>response.data)
 }
export default {
    register,
    login,
    getCurrentUser,
    updateCurrentUser
}
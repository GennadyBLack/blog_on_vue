import authApi from '@/api/auth'
import {setItem,getItems} from '@/helpers/persistanceStorage'
const state = {
  isSubmitting: false,
  currentUser:null,
  validationErrors:null,
  isLoggedIn:null,
  isLoading:false
}

export const mutationTypes = {
    registerStart:'[auth] registerStart',
    registerSuccess:'[auth] registerSuccess',
    registerFailure:'[auth] registerFailure',

   loginStart:'[auth]loginStart',
   loginSuccess:'[auth]loginSuccess',
   loginFailure:'[auth]loginFailure',

  getCurrentUserStart:'[auth]getCurrentUserStart',
  getCurrentUserSuccess:'[auth]getCurrentUserSuccess',
  getCurrentUserFailure:'[auth]getCurrentUserFailure',
}
export const actionTypes = {
    register:'[auth] register',
    login:'[auth] login',
    getCurrentUser:'[auth] getCurrentUser'
   
}


////////////////////////////MUTATION//////////////////////
const mutations = {
    //REGISTER
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true
    state.validationErrors = null

  },
  [mutationTypes.registerSuccess](state,payload) {
    state.isSubmitting = false,
    state.CurrentUser = payload,
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state,payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },

//LOGIN
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.loginSuccess](state,payload) {
    state.isSubmitting = false,
    state.currentUser = payload,
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state,payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }, 
  
  
  ///////////////GET  USER DATA

[mutationTypes.getCurrentUserStart](state){
  state.isLoading = true
},
[mutationTypes.getCurrentUserSuccess](state,payload){
  state.isLoading = false
  state.currentUser = payload
  state.isLoggedIn = true
},
[mutationTypes.getCurrentUserFailure](state,payload){
  state.isLoading = false
  state.isLoggedIn= false,
  state.currentUser = null
} 

}
/////////////////ACTIONS//////////////////////
const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
        context.commit(mutationTypes.registerStart)
        console.log('start')
      authApi
        .register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.user)
          setItem('accessToken',response.data.token)
          resolve(response.data.user)
        })
        .catch(result => {
            console.log(result,'RESULT')
          context.commit(mutationTypes.registerFailure, result.response.data.errors)
        })
    })
  },

  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
        context.commit(mutationTypes.loginStart)
      authApi
        .login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.user)
          setItem('accessToken',response.data.token)
          resolve(response.data.user)
        })
        .catch(result => {
          context.commit(mutationTypes.loginFailure, result.response.data.errors)
        })
    })
  },

  [actionTypes.getCurrentUser](context, credentials) {
    return new Promise(resolve => {
        context.commit(mutationTypes.getCurrentUserStart)
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure)
        })
    })
  }
}




/////////////////////GETTERS//////////////////



export const getterTypes = {
  currentUser:'[auth] currentUser',
  isSubmitting:'[auth] isSubmitting',
  isLoggedIn:'[auth] isLoggedIn',
  isAnonymus:'[auth] isAnonymus'
}





const getters = {
   [getterTypes.isSubmitting](state){
        return state.isSubmitting
    },

  [getterTypes.isLoggedIn](state){
      return Boolean(state.isLoggedIn)
  },
  [getterTypes.currentUser](state){
    return state.currentUser
},
[getterTypes.isAnonymous](state){
  return state.isLoggedIn === false
},
}
export default {
  state,
  actions,
  mutations,
  getters
}

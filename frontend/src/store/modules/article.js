import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {

    //GET
  getArticleStart: '[Article] Get Article start',
  getArticleSuccess: '[Article] Get Article success',
  getArticleFailure: '[Article] Get Article failure',
    //DELETE
    deleteArticleStart: '[Article] delete Article start',
    deleteArticleSuccess: '[Article] delete Article success',
    deleteArticleFailure: '[Article] delete Article failure',
    
    //UPDATE 
    updateArticleStart: '[Article] update Article start',
    updateArticleSuccess: '[Article] update Article success',
    updateArticleFailure: '[Article] update Article failure',

    //CREATE

    createArticleStart: '[Article] create Article start',
    createArticleSuccess: '[Article] create Article success',
    createArticleFailure: '[Article] create Article failure'

}

export const actionTypes = {
  getArticle: '[Article] Get Article',
  deleteArticle: '[Article] Delete Article'
}

const mutations = {
    //GET
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false
  },
  //DELETE
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
}
 
const actions = {

    //GET
  [actionTypes.getArticle](context,{id}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart)
      articleApi
        .getArticle(id )
        .then(response => {
          context.commit(mutationTypes.getArticleSuccess, response.data)
          resolve(response.data)
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure)
        })
    })
  },
//DELETE
  [actionTypes.deleteArticle](context,{id}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteArticleStart)
      articleApi
        .deleteArticle(id )
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailure)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}

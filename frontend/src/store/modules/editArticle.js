import articleApi from '@/api/article'

const state = {
  isSubmitting: false,
  validationErrors: null,
  article : null,
  isLoading:false
}

export const mutationTypes = {
  updateArticleStart: '[updateArticle] update article start',
  updateArticleSuccess: '[updateArticle] update article success',
  updateArticleFailure: '[updateArticle] update article failure',

  getArticleStart: '[updateArticle] update article start',
  getArticleSuccess: '[updateArticle] update article success',
  getArticleFailure: '[updateArticle] update article failure'
}

export const actionTypes = {
  updateArticle: '[updateArticle] update article',
  getArticle: '[updateArticle] get article'
}

const mutations = {
    //UPDATE
  [mutationTypes.updateArticleStart](state) {
    state.isSubmitting = true
    state.isLoading = true
  },
  [mutationTypes.updateArticleSuccess](state) {
    state.isSubmitting = false
    state.isLoading = false
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
    state.isLoading = false
  },
//GET

  [mutationTypes.getArticleStart](state) {
    state.isSubmitting = true
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess](state,payload) {
    state.isSubmitting = false
    state.article = payload
    state.isLoading = false
  },
  [mutationTypes.updateArticleFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.updateArticle](context, {slug,articleInput}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateArticleStart)
      articleApi
        .updateArticle(slug,articleInput)
        .then(article => {
          context.commit(mutationTypes.updateArticleSuccess, article)
          resolve(article)
        })
        .catch(result => {
          context.commit(
            mutationTypes.updateArticleFailure,
            result.response.data.errors
          )
        })
    })
  },
  [actionTypes.getArticle](context, slug) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart)
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArticleSuccess, article)
          resolve(article)
        })
        .catch(result => {
          context.commit(
            mutationTypes.getArticleFailure,
            result.response.data.errors
          )
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}

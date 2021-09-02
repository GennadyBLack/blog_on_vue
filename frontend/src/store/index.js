import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import tag from '@/store/modules/tag'
import article from '@/store/modules/article'
import createArticle from '@/store/modules/createArticle'


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    feed,
    tag,
    article,
    createArticle
  }
})

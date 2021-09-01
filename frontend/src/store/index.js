import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import tag from '@/store/modules/tag'


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
    tag
  }
})

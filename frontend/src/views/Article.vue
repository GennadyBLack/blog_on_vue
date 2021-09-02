<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if='isAuthor'>
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button class="btn btn-outline-danger btn-sm" @click='deleteArticle'>
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <mcv-loading v-if="isLoading" />
      <mcv-error-message v-if="isLoading" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          TAG LIST IS HERE
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {mapState,mapGetters} from 'vuex'
import {actionTypes as articleActionTypes} from '@/store/modules/article'
import {getterTypes as aurhGetterTypes} from '@/store/modules/auth'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
export default {
    name:'McvArticle',
    mounted(){
        this.$store.dispatch(articleActionTypes.getArticle,{id:this.$route.params.id})
    },
    components:{
        McvLoading,
        McvErrorMessage
    } , computed: {
    ...mapGetters({currentUser:aurhGetterTypes.currentUser}),
    ...mapState({
      isLoading: state => state.article.isLoading,
      article: state => state.article.data,
      error: state => state.article.error
    }),
    isAuthor(){
        if(!this.currentUser & !this.article){
            return false
        } 
        return this.currentUser.name === this.article.author.name
    },
    methods:{
        deleteArticle(){
            this.store.dispatch(articleActionTypes.deleteArticle,{id:this.$store.params.id})
            .then.$route.push({name:'blobalFeed'})
        }
    }
  },
}
</script>
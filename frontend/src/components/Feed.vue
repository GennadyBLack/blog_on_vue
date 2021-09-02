<template>
  <div>
        <mcv-loading v-if='isLoading' />
       <mcv-error-message v-if='error'/>

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author}}"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author}
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">ADD TO FAVORITES</div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article._id}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mcv-tag-list v-if='article.tags' :tags='article.tags'/>
        </router-link>
      </div>
      <p>P</p>
      <mcv-pagination :total='total' :url='baseUrl' :currentPage='currentPage' :limit="10"/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvTagList from '@/components/TagList'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import McvPagination from '@/components/Pagination'
import {actionTypes} from '@/store/modules/feed'
import {stringify,parseUrl} from 'query-string'
import {limit} from '@/helpers/constants'
export default {
  name: 'McvFeed',
  data(){
    return{ 
     url:'',
  }
  },
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  components:{
    McvPagination,
    McvLoading,
    McvErrorMessage,
    McvTagList

  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      total: state => state.feed.data.total,
      error: state => state.feed.error
    }),    
    limit() {
      return limit
    },

    currentPage(){
        return Number(this.$route.query.page || '1')
    },
    baseUrl(){
      return this.$route.path
    },
    limit(){
      return 10 
    }
  },
  watch:{
    currentPage(){
      this.fetchFeed()
    }
  }
  ,
  mounted() {
   this.fetchFeed()
  },
  methods:{
    fetchFeed(){
       const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        page: this.currentPage,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
       this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
       //test
    }
  }
  
}
</script>

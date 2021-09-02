<template>
  <div class="home-page">
    <mcv-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed-toggler :tag-name='tagName'/>
          <mcv-feed :api-url="apiUrl"></mcv-feed>
        </div>
        <div class="col-md-3">
          <mcv-tag/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
import McvTag from '@/components/Tag'
import McvBanner from '@/components/Banner'
import McvFeedToggler from '@/components/FeedToggler'
export default {
  name: 'McvTagFeed',
  components: {
    McvFeed,
    McvTag,
    McvBanner,
    McvFeedToggler
  },
computed:{
  tagName(){
    return this.$route.params.slug
  },
  apiUrl(){
    return `articles/tag?tag=${this.tagName}`
  }
}
}
</script>

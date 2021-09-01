<template>
  <div class="home-page">
    <mcv-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
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
export default {
  name: 'McvTagFeed',
  components: {
    McvFeed,
    McvTag,
    McvBanner
  },
computed:{
  apiUrl(){
    const tagName = this.$route.params.slug
    console.log(tagName,'name')
    return `articles/tag?tag=${tagName}`
  }
}
}
</script>

<template>
  <div class="home-page">
    <mcv-banner/>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
                    <mcv-feed-toggler/>
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
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
    McvTag,
    McvBanner,
    McvFeedToggler
  },
  data() {
    return {
      apiUrl: '/articles'
    }
  }
}
</script>

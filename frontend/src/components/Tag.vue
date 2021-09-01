<template>
  <div>
    <mcv-loading v-if='isLoading' />
    <mcv-error-message v-if='error'/>

    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{name: 'tag', params: {slug: popularTag.name}}"
          class="tag-default tag-pill"
        >
          {{ popularTag.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'
import {actionTypes} from '@/store/modules/tag'

export default {
  name: 'McvPopularTags',
  components:{McvLoading,McvErrorMessage},
  computed: {
    ...mapState({
      isLoading: state => state.tag.isLoading,
      popularTags: state => state.tag.data,
      error: state => state.tag.error
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getTag)
  }
}
</script>
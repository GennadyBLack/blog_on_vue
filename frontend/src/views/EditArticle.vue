<template>
    <div>
            <mcv-article-form 
            v-if='initialValues'
            :initialValues='initialValues'
            :errors='validationErrors'
            :isSubmitting='isSubmitting'
            :author='auth'
            :tags='tags'
            @articleSubmit="onSubmit"/>
    </div>

</template>
<script>
import {mapState,mapGetters} from 'vuex'
import {actionTypes} from '@/store/modules/getArticle'
import {actionTypes as tagActionTypes} from '@/store/modules/tag'
import McvArticleForm from '@/components/ArticleForm'
export default {
    name:'McvEditArticle',
    methods:{
        onSubmit(articleInput){
            const slug = this.$router.params.slug
            this.$store.dispatch(actionTypes.editArticle,{slug,articleInput})
            .then(article=> {
                this.$router.push({name:'article',params:{slug:article._id}})
            })
        }
    },
    components:{
        McvArticleForm
    },
    computed:{
        ...mapState({
            isSubmitting: state =>state.editArticle.isSubmitting,
            validationErrors: state => state.editArticle.validationErrors,
            isLoading: state => state.editArticle.isLoading,
            article: state => state.editArticle.article,
            auth: state => state.auth.currentUser,
            tags:state=> state.tag.data
        }),
     initialValues(){
                if(!articles){
                    return null
                }
                 return {
                title:this.article.title,
                description:this.article.description,
                slug:this.article.slug,
                tagList:this.article.tagList,
                author:{}
            }
            } 
           

    },
         mounted(){
            this.$store.dispatch(tagActionTypes.getTag)
            this.$store.dispatch(actionTypes.getArticle)
        }
}
</script>
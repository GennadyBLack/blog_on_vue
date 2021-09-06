<template>
    <div>
        <div>
            <mcv-is-loading v-if='isLoading'/>
            <mcv-validation-errors v-if='validationErrors'/>
        </div>
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
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/editArticle'
import {actionTypes as tagActionTypes} from '@/store/modules/tag'
import McvValidationErrors from '@/components/ValidationErrors'
import McvIsLoading from '@/components/Loading'
import McvArticleForm from '@/components/ArticleForm'

export default {
    name:'McvEditArticle',
    methods:{
        onSubmit(articleInput){
            const slug = this.$route.params.slug
            this.$store.dispatch(actionTypes.updateArticle,{slug,articleInput})
            .then(article=> {
                this.$router.push({name:'article',params:{slug:article._id}})
            })
        }
    },
    components:{
        McvArticleForm,
        McvValidationErrors,
        McvIsLoading
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
                if(!this.article){
                    return null
                }
                return {
                title:this.article.title,
                description:this.article.description,
                slug:this.article.slug,
                category:this.article.category,
                author:{}
            }
            } 
    },
         mounted(){
            this.$store.dispatch(actionTypes.getArticle,this.$route.params.slug)
            this.$store.dispatch(tagActionTypes.getTag)
           
        }
}
</script>
<template>
    <div>
            <mcv-article-form 
            :initialValues='initialValues'
            :errors='validationErrors'
            :isSubmitting='isSubmitting'
            :author='author'
            @articleSubmit="onSubmit"/>
    </div>

</template>
<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/createArticle'
import McvArticleForm from '@/components/ArticleForm'
export default {
    name:'McvCreateArticle',
    data(){
        return{
            initialValues:{
                title:'',
                description:'',
                body:'',
                tagList:[]
            }
        }
    },
    methods:{
        onSubmit(articleInput){
            this.$store.dispatch(actionTypes.createArticle,{articleInput})
            .then(article=> {
                this.$route.push({name:'article',params:{slug:article._id}})
            })
        }
    },
    components:{
        McvArticleForm
    },
    computed:{
        ...mapState({
            isSubmitting: state =>state.createArticle.isSubmitting,
            validationErrors: state => state.createArticle.validationErrors,
            author:state => state.auth.currentUser
        })
    }
}
</script>
<template>
    <div>
            <mcv-article-form 
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
import {actionTypes} from '@/store/modules/createArticle'
import {actionTypes as tagActionTypes} from '@/store/modules/tag'
import McvArticleForm from '@/components/ArticleForm'
export default {
    name:'McvCreateArticle',
    data(){
        return{
            initialValues:{
                title:'',
                description:'',
                body:'',
                category:[],
                author:{},

            }
        }
    },
    methods:{
        onSubmit(articleInput){
            console.log(articleInput)
            this.$store.dispatch(actionTypes.createArticle,{articleInput})
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
            isSubmitting: state =>state.createArticle.isSubmitting,
            validationErrors: state => state.createArticle.validationErrors,
            auth: state => state.auth.currentUser,
            tags:state=> state.tag.data
        }),
        mounted(){
            this.$store.dispatch(tagActionTypes.getTag)
        }

    },

}
</script>
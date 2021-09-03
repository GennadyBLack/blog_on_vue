<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <mcv-validation-errors v-if='errors' :validation-errors='errors'/>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Slug"
                  v-model="slug"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="What is this article about?"
                  v-model="description"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <select  v-model='category' multiple='multiple'>
                  <option class='form-control form-control-lg' v-for='tag in this.tags' :key='tag' :value="tag._id">{{tag.name}}</option>
                </select>
              </fieldset> 
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
export default {
    name:'McvArticleForm',
    components:{
        McvValidationErrors
    },
    props:{
        initialValues:{
            type:Object,
            reqired:true
        },
        errors:{
            type:Object,
            required:false
        },
        isSubmitting:{
            type:Boolean,
            required:true
        },
        author:{
            type:Object,
            required:true
        },
         tags:{
            type:Array,
            required:false
        }
    },
    data(){
      return{
        title:'',
        description:'',
        category:[],
        slug:''
        }
    },
    methods:{
        onSubmit(){
            const form = {
               title:this.title,
               description:this.description,
               author:this.author._id,
               category:this.category,
               slug:this.slug
            }
           this.$emit('articleSubmit',form)
        }
    }

}
</script>
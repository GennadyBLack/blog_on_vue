<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'register'}">
              Need an account?
            </router-link>
          </p>
           <mcv-validation-errors v-if='validationErrors' :validation-errors='validationErrors'/>
          <form @submit.prevent='onSubmit'>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model='email'
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model='password'
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" :disabled='isSubmitting'>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {actionTypes,getterTypes} from '@/store/modules/auth'
import McvValidationErrors from '@/components/ValidationErrors'

export default {
    name:'McvLogin',
    data(){
        return{
            password:'',
            email:''
        }
    },
    components:{
        McvValidationErrors
    },
    computed:{
        ...mapGetters({[getterTypes.isSubmitting]:'isSubmitting',[getterTypes.validationErrors]:'validationErrors'})
    },
    methods:{
        onSubmit(){
            this.$store.dispatch(actionTypes.login,{
                password:this.password,
                email:this.email
                })
                .then(user=>{
                    this.$router.push({name:'globalFeed'})
                })
        }
    }
}

</script>
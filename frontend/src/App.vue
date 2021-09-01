<template>
  <div id="nav">
 <mcv-topbar/>
   <router-view/>
  </div>

</template>
<script>
import McvTopbar from '@/components/Topbar'
import {actionTypes} from '@/store/modules/auth'
export default {
  name:'McvApp',
  components:{
    McvTopbar
  },
  mounted(){
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

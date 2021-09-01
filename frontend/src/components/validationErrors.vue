<template>
    <div>
        <ul class='error-messages'>
        <li v-for='error in validationErrors' :key='error'>{{error.message}}</li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'McvValidationErrors',
    props:{
        validationErrors:{
            type:Object,
            required:true
        }
    }
}
</script>
<style scoped>
p{color:red}
</style>
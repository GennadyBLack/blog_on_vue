<template>
    <ul class="tag-list">
        <li v-for='tag in tags' :key='tag' class='tag-default tag-pill tag-outline'>
            {{tag.name}}
        </li>
    </ul>
</template>
<script>
export default {
    name:'McvTagList',
    props:{
        tags:{
            type: Array,
            required:true 
        }
    }
}
</script>
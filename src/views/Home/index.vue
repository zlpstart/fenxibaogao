<template>
    <div class="home">
        我是首页
    </div>
</template>

<script>
import {
    logout
} from '@/api/Home'

export default {
    name:'home',
    data(){
        return {

        }
    },
    methods:{
        getAXIOS(){
            logout()
        }
    }
}
</script>

<style scoped>

</style>
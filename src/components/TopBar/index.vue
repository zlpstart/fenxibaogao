<template>
    <div class="topbar">
        <div class="topbar_left">
            <h1>分析报告生成</h1>
        </div>
        <div class="topbar_right">
            <div class="right_name">
                <p>{{getLoginName}}</p>
            </div>
            <div class="right_triangle">

            </div>
        </div>
    </div>
</template>

<script>
import '../../styles/topbar/index.css'
import {mapGetters} from 'vuex'

export default {
    name:'topbar',
    computed:{
        ...mapGetters(["getLoginName"])
    }
}
</script>

<style scoped>

</style>
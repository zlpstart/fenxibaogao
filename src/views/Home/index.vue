<template>
    <div class="layout">
        <div class="layout_wrap">
            <div class="layout_top">
                <topbar />
            </div>
            <div class="layout_box">
                <div class="box_left">
                    <sidebar/>
                </div>
                <div class="box_right">
                    <!-- <appmain/> -->
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../styles/layout/index.css'
import topbar from '../../components/TopBar/index'
import sidebar from '../../components/Sidebar/index'
import appmain from '../../components/AppMain/index'
import New from '../../components/AppMain/index'

export default {
    name:'layout',
    data(){
        return {

        }
    },
    components:{
        topbar,
        sidebar,
        appmain,
        New
    },

}
</script>

<style scoped>
.box_right {
    width: 812px;
}
</style>
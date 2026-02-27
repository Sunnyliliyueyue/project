<template>
    <el-menu 
    :style="{width: isCollapse ? '64px' : '230px'}"
    :collapse="isCollapse" 
    collapse-transition
    active-text-color="#ffd04b"
    background-color="#545c64" 
    class="aside-container"
    default-active="2" text-color="#fff" @open="handleOpen" @close="handleClose">
        <p class="logo-lg" v-if="!isCollapse">陪诊系统</p>
        <p class="logo-lg" v-else>陪诊</p>
        <treeMenu :menuData="menuData" :index="'1'" />
    </el-menu>
</template>

<script lang="ts" setup>
import treeMenu from './treeMenu.vue'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const menuData = reactive(
    (router.options.routes?.[0]?.children ?? []) as any[]
)

const handleOpen = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    // console.log(key, keyPath)
}
const store = useStore()
const isCollapse = computed(() => store.state.menu.isCollapse)
</script>

<style lang="less" scoped>
.aside-container {
    height: 100%;

    .logo-lg {
        font-size: 20px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
}
</style>
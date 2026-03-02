<template>
    <div class="nav-header flexBox">
        <div class="flexBox">
            <el-icon size="20px" @click="store.commit('toggleCollapse')">
                <Fold />
            </el-icon>
            <ul class="flexBox">
                <li v-for="(item, index) in selectMenu" :key="item.path" :class="{ 'selected': item.path === route.path }"
                    class="tab flexBox">
                    <el-icon size="12px">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link class="text flexBox" :to="{ path: item.path }">
                        {{ item.name }}
                    </router-link>

                    <el-icon class="close" size="12px">
                        <Close @click="closeTab(item.path, index)" />
                    </el-icon>
                </li>
            </ul>
        </div>

        <div class="nav-header-right">
            <el-dropdown>
                <div class="el-dropdown-link flexBox">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <p class="userName">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
const store = useStore()
const route = computed(() => useRoute())
const router = useRouter()
const selectMenu = computed(() => store.state.menu.selectMenu)

console.log(selectMenu, 'selectMenu');

// 点击关闭
const closeTab = (item: string, index: number) => {
    store.commit('selectMenu', item)
    // 删除的非当前tag
    if (route.path !== item.path) {
        return
    }
    // 删除的当前tag
    const selectMenuData = selectMenu.value
    if (index === selectMenuData.length) {
        // 删除最后一个tag
        if (!selectMenuData.length) {
            router.push('/')
        } 
        // 删除中间tag，跳转到后一个tag
        else {
            router.push({
                path: selectMenuData[index - 1].path
            })
        }
    } 
    // 删除其他未展示的tag，跳转到前一个tag
    else {
        router.push({
            path: selectMenuData[index].path
        })
    }

}
</script>

<style lang="less" scoped>
.flexBox {
    display: flex;
    align-items: center;
}

.nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    background-color: #fff;
}

.nav-header-left {
    height: 100%;
    display: flex;
    align-items: center;
}

.nav-header-left:hover {
    cursor: pointer;
    background-color: #f5f5f5;
}

.nav-header-right {
    padding: 0 20px;
}

.userName {
    margin-left: 10px;
}

.tab {
    padding: 8px 10px;
    height: 100%;

    .text {
        margin: 0 5px;
    }

    .close {
        visibility: hidden;
    }

    &.selected {
        background-color: #f5f5f5;

        a {
            color: #409eff;
        }

        i {
            color: #409eff;
        }
    }
}

.text {
    color: #606266;
}

.text:hover {
    color: #409eff;
}

.tab:hover {
    background-color: #f5f5f5;

    .close {
        visibility: initial;
        cursor: pointer;
    }

}
</style>
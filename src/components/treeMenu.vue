<template>
  <template v-for="item in props.menuData" :key="`${props.index}-${item.meta.id}`">
    <el-menu-item 
      @click="handleClick(item, `${props.index}-${item.meta.id}`)" 
      v-if="!item.children || item.children.length === 0"
      :index="`${props.index}-${item.meta.id}`">
      <el-icon size="20">
        <component :is="item.meta.icon" />
      </el-icon>
      <template #title>  
        <span>{{ item.meta.name }}</span>
      </template>
    </el-menu-item>  

    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <tree-menu :menuData="item.children" :index="`${props.index}-${item.meta.id}`" /> 
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup name="treeMenu">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';


const router = useRouter();
const store = useStore();
const props = defineProps<{
    menuData: any[]
    index: string
}>()

const handleClick = (item: any, index: string) => {
    router.push(item.meta.path)
    store.commit('addMenu', item.meta)
    router.push(item.meta.path)
     
}
</script>

<style lang="less" scoped></style>
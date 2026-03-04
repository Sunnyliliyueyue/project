<template>
    <div>
        admin
    </div>
</template>

<script setup lang="ts" name="admin">
import { ref, onMounted } from 'vue'
import { authAdmin } from '../../../api/index'

const pageNum = ref(1)
const pageSize = ref(10)
onMounted(() => {
    authAdmin({ pageNum: pageNum.value.toString(), pageSize: pageSize.value.toString() }).then(res => {
        console.log(res, 'res');
    }).catch(err => {
        console.log(err, 'err');
    })
})
</script>

<style scoped>

</style>
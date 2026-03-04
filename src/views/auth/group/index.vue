<template>
    <div>
        <el-button type="primary" @click="dialogVisible = true">打开</el-button>
        <el-dialog v-model="dialogVisible" title="添加权限" width="500" :before-close="handleClose">
            <el-form ref="formRef" label-width="100px" label-position="left" :model="form" :rules="rules">
                <el-form-item v-show="false" prop="id">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="permissions">
                    <el-tree :ref="treeRef" :data="permissionData" style="max-width: 600px;" node-key="id" show-checkbox
                        :default-checked-keys="defaultCheckedKeys" :default-expanded-keys="[2] "></el-tree>
                </el-form-item>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="handleSubmit(formRef)">确认</el-button>
                    </div>
                </template>
            </el-form>

        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="group">
import { ref, reactive, onMounted, } from 'vue'
import { authMenuSelectlist, userSetmenu } from '../../../api/index'
import { id } from 'element-plus/es/locales.mjs'
import type { s } from 'vue-router/dist/router-CWoNjPRp.mjs'

const dialogVisible = ref(false)
const form = reactive({
    id: '',
    name: '',
    permissions: [] as string[]
})
const permissionData = ref([])
const defaultCheckedKeys = ref([4, 5])
const treeRef = ref()
const formRef = ref()
const rules = reactive({
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
    ],
})
const params = reactive({
    id: form.id,
    name: form.name,
    permissions: form.permissions
})
onMounted(() => {
    // 获取权限列表
    authMenuSelectlist().then(res => {
        permissionData.value = res.data.data || []
        console.log(permissionData.value, 'permissionData');

    }).catch(err => {
        console.log(err, 'err');
    })
})
const handleClose = () => {
    dialogVisible.value = false
}
const handleSubmit = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userSetmenu(params).then(res => {
        console.log(res, 'res');
        dialogVisible.value = false
      }).catch(err => {
        console.log(err, 'err');
      })
    } else {
      console.log('表单验证失败', fields)
    }
  })
}
</script>

<style scoped></style>

<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 480px;">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl">
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handleRegisterClick">{{ formType ? '返回登录' : '注册账号' }}</el-link>
                <el-form :model="form" style="max-width: 600px;" class="demo-ruleForm" :rules="rules">
                    <el-form-item prop="username">
                        <el-input v-model="form.username" :prefix-icon="Avatar" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="form.password" type="password" :prefix-icon="Lock"
                            placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="validCode" v-if="formType">
                        <el-input v-model="form.validCode" :prefix-icon="Lock" placeholder="验证码">
                            <template #append>
                                <span @click="countdownChange">{{ countdown.validText }}</span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">{{ formType ? '注册' : '登录' }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getCode } from '../../api'
import { Avatar, Lock } from '@element-plus/icons-vue'
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href
const formType = ref(0)
const flag = ref(true)
const form = reactive({
    username: '',
    password: '',
    validCode: ''
})
const countdown = reactive({
    validText: '获取验证码',
    count: 60,
})
const handleRegisterClick = () => {
    formType.value = formType.value ? 0 : 1
}

const countdownChange = () => {
    // 验证手机号
    if (!/^1[3456789]\d{9}$/.test(form.username) || !form.username) {
        ElMessage({
            message: '请输入正确的手机号',
            type: 'warning',
        })
    } else {
        if (flag.value) {
            flag.value = false
            const timer = setInterval(()=>{
                countdown.count--
                countdown.validText = `${countdown.count}s后重新获取`
                if(countdown.count <= 0){
                    clearInterval(timer)
                    flag.value = true
                    countdown.count = 60
                    countdown.validText = '获取验证码'
                }
            },1000) 
            getCode({tel: form.username}).then(res => {
                console.log(res, 'res');
                ElMessage({
                    message: '验证码已发送',
                    type: 'success',
                })
            }).catch(err => {
                ElMessage({
                    message: '获取验证码失败',
                    type: 'error',
                })
            })
        }else {
            return
        }
    }

}
const validateUser = (rule, value, callback) => {
    if (value === ''){
        callback(new Error('请输入手机号'))
    } else {
        const phoneReg = /^1[3456789]\d{9}$/
        phoneReg.test(value) ? callback() : callback(new Error('请输入正确的手机号'))
    }
}
const validatePassword = (rule, value, callback) => {
    if (value === ''){
        callback(new Error('请输入密码'))
    } else {
        const reg = /^[a-zA-Z0-9_]{4,16}$/
        reg.test(value) ? callback() : callback(new Error('密码长度为4-16位，且只能包含字母、数字和下划线'))
    }
}
const rules = reactive({
    username: [{ validator: validateUser, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }]
})
const submitForm = () => {
    console.log(form)
}
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
    padding: 0
}

.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;

        img {
            width: 430px;
        }
    }

    .jump-link {
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>
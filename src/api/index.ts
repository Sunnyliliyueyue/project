import request from '../utils/request'

interface GetCodeData {
    tel: string;
}
// 获取验证码
export const getCode = (data:GetCodeData) => {
    return request.post('/get/code', data)
}
 
// 注册 /user/authentication
interface RegisterData {
    userName: string;
    validCode: string;
    passWord: string;
}
export const userAuthentication = (data:RegisterData) => {
    return request.post('/user/authentication', data)
}

// 登录 /login
interface LoginData {
    userName: string;
    passWord: string;
}
export const login = (data:LoginData) => {
    return request.post('/login', data)
}

// 账号管理
interface authAdminData {
    pageNum: string;
    pageSize: string;
}
export const authAdmin = (data:authAdminData) => {
    return request.get('/auth/admin', { params: data })
}

// 菜单权限下拉 menu/selectlist
export const authMenuSelectlist = () => {
    return request.get('/user/getmenu')
}

// 修改菜单权限
interface SetMenuData {
    id: string;
    name: string;
    permissions: string[];
}
export const userSetmenu = (data:SetMenuData) => {
    return request.post('/user/setmenu', data)
}

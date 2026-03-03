import request from '../utils/request'

interface GetCodeData {
    tel: string;
}
// 获取验证码
export const getCode = (data:GetCodeData) => {
    return request.post('/get/code', data)
}
 
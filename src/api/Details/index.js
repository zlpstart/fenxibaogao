import request from '@/utils/request'

// 页面get
export function get(data) {
  return request({
    url: '/reportservice/v1/report/reportTemplate/get',
    method: 'post',
    data
  })
}

// 弹窗list
export function list(data) {
  return request({
    url: '/dataassetservice/v1/dataResource/database/list',
    method: 'post',
    data
  })
}

// 弹窗get
export function getDialog(data) {
  return request({
    url: '/reportservice/v1/report/indexDefinition/get',
    method: 'post',
    data
  })
}

// 预览
export function indexPreview(data) {
  return request({
    url: '/reportservice/v1/report/indexDefinition/indexPreview',
    method: 'post',
    data
  })
}

// 提交
export function save(data) {
  return request({
    url: '/reportservice/v1/report/indexDefinition/save',
    method: 'post',
    data
  })
}

// 保存文档
export function saveWord(data) {
  return request({
    url: '/reportservice/v1/report/reportTemplate/save',
    method: 'post',
    data
  })
}

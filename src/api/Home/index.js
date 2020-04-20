import request from '@/utils/request'

export function logout(data) {
  return request({
    url: '/systemservice/v1/sys/logout',
    method: 'post',
    data
  })
}
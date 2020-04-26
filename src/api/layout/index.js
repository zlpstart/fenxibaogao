import request from '@/utils/request'

export function page(data) {
  return request({
    url: '/reportservice/v1/report/reportTemplate/page',
    method: 'post',
    data
  })
}
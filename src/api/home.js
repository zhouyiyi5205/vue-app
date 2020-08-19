import request from '@/utils/request';

export function post(params) {
  return request({
    url: `/admin/projectBaseInfo/selectProjectBaseInfoPage`,
    method: 'post',
    data: params
  })
}

export function get(id) {
  return request({
    url: `/admin/monthReport/selectMonthSchedule/${id}`,
    method: 'get'
  })
}

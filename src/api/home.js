// import request from '@/utils/request';
import request from '@/utils/requestWPG';

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

// 限制日期
export function selectMonthRestrictionsFiling() {
  return request({
    url: `/admin/monthReport/selectMonthRestrictionsFiling`,
    method: 'get'
  })
}
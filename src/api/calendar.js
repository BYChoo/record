/**
 * 日历组件api
 */

import fetch from 'utils/fetch';

/**
 * 获取日期数据请求
 */
const getCaledarDay = function(params) {
  return new fetch({
    url: '/api/get_caledarDay',
    method: 'get',
    params
  })
}

const checkAbsent = function(params) {
  return new fetch({
    url: '/api/check_absent',
    method: 'get',
    params
  })
}

export { getCaledarDay, checkAbsent }

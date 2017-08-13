/**
 * 日历组件api
 */

import fetch from 'utils/fetch';

/**
 * 获取日期数据请求
 */
export function getCaledarDay(params) {
	return new fetch({
		url: '/api/get_caledarDay',
		method: 'get',
		params
	})
}

export function checkAbsent(params) {
	return new fetch({
		url: '/api/check_absent',
		method: 'get',
		params
	})
}
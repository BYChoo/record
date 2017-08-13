/**
 * 选择已导入班级组件api
 */

import fetch from 'utils/fetch';

/**
 * 发送获取所有班级数据请求
 */

export function getAllRestor(params) {
	return new fetch({
		url: '/api/get_allRestor',
		method: 'get',
		params
	})
}
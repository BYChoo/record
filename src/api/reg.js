/**
 * 注册组件api
 */

import fetch from 'utils/fetch';

/**
 * 发送注册请求
 */

export function reg(data) {
	return new fetch({
		url: '/api/register',
		method: 'post',
		data
	})
}
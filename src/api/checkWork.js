import fetch from 'utils/fetch';

export function getDayAbsent(params) {
	return new fetch({
		url: '/api/get_dayAbsent',
		method: 'get',
		params
	})
}
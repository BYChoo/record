import fetch from 'utils/fetch';

export function getAllRestor(params) {
	return new fetch({
		url: '/api/get_allRestor',
		method: 'get',
		params
	})
}

export function getNoTodayAbsent(params) {
	return new fetch({
		url: '/api/get_noTodayAbsent',
		method: 'get',
		params
	})
}
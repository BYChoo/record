import fetch from 'utils/fetch';

export function addCutStudents(data) {
	return new fetch({
		url: '/api/add_cutStudents',
		method: 'post',
		data
	})
};

export function getCls(params) {
	return new fetch({
		url: '/api/get_cls',
		method: 'get',
		params
	})
}
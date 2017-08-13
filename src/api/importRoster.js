import fetch from 'utils/fetch';

export function upload(data) {
	return new fetch({
		url: '/api/uploadFile',
		method: 'post',
		data
	})
}
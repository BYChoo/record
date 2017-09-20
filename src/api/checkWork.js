import fetch from 'utils/fetch';

const getDayAbsent = function(params) {
  return new fetch({
    url: '/api/get_dayAbsent',
    method: 'get',
    params
  })
}

const exportExcal = function() {
  return new fetch({
    url: '/api/excel',
    method: 'get'
  })
}

export { getDayAbsent,exportExcal };

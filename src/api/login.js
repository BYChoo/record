/**
 * 登录组件api
 */

import fetch from 'utils/fetch';

/**
 * 发送登录请求
 */
const sendLogin = function(data) {
  return new fetch({
    url: '/api/login',
    method: 'post',
    data
  })
};

/**
 * 设置token的值，以及过期时间
 * cookie的默认生命周期是关闭了浏览器后清除
 */
const setCookie = function({ name, val, time = 1 }) {
  let d = new Date();
  d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${val};expires=${d.toUTCString()}`;
}

/**
 * 检查cookie的值是否存在
 */
const getCookie = function(name) {
  const cookies = document.cookie.split(';');
  return cookies && cookies.some((item) => {
    let arr = item.split('=');
    return name == arr[0].trim() && arr[1];
  });
}

export { sendLogin, setCookie, getCookie };

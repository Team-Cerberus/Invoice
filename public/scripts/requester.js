import $ from 'jquery';

function request(url, type, body, headers) {
  const promise = new Promise((resolve, reject) => {
    $.ajax({
      url,
      type,
      contentType: 'application/json',
      headers,
      data: body,
      success: resolve,
      error: reject
    });
    console.log('ajax')
    console.log(url);
    console.log(type);
    console.log(body);
    console.log(headers);

  });

  return promise;
}

export function get(url, headers = {}) {
  return request(url, 'GET', '', headers);
}

export function post(url, body, headers = {}) {
  return request(url, 'POST', JSON.stringify(body), headers);
}

export function put(url, body, headers = {}) {
  return request(url, 'PUT', JSON.stringify(body), headers);
}

export function del(url, body, headers = {}) {
  return request(url, 'DELETE', JSON.stringify(body), headers);
}

export default { get, post, put, del };
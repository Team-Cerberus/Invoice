import $ from 'jquery';

function request(url, type, body, headers) {
<<<<<<< HEAD
  
=======
>>>>>>> a68b683448c4415cab28901d6362217235f56925
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
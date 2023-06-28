//添加finally：因为还有一个参数里面还有一个complete方法。
//const app = getApp()
if (typeof qq !== "undefined"){
  var runtime = qq;
}else if(typeof wx !== "undefined"){
  var runtime = wx;
}



const app_info={
    appid:'YfXnsTV8EWkyLreRLVkaIdsDTSp7nW',
    secret:'F8L8oT9iOAjzVt59zC7GAXRZtr7cdJtgc2C5EQ5U',
};
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

//封装异步api
const wxPromisify = fn => {
  return function (obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function (res) {
        resolve(res)
      }

      obj.fail = function (res) {
        reject(res)
      }

      fn(obj)
    })
  }
}

//const getLocationPromisified = wxPromisify(runtime.getLocation);//获取经纬度
const showModalPromisified = wxPromisify(runtime.showModal);//弹窗
const setStorageSync = runtime.setStorageSync;//设置本地变量
const getStorageSync = runtime.getStorageSync;
const checkSession = runtime.checkSession;

// 封装post请求
const put = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    data = Object.assign(data,app_info);
    runtime.request({
      url: url,
      data: data,
      method: 'PUT',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

// 封装ajax请求
const ajax = (url, method, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    data = Object.assign(data,app_info);
    runtime.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

// 封装post请求
const post = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    data = Object.assign(data,app_info);
    runtime.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
// 封装get请求
const get = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    data = Object.assign(data,app_info);
    runtime.request({
      url: url,
      data: data,
      header: {
        'X_PJAX': 'true',
        'X_REQUESTED_WITH': 'true'
      },
      success: function (res) {//服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else {//返回错误提示信息
          reject(res.data);
        }
      },
      fail: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

module.exports = {
  post,
  get,
  ajax,
  put,
  //getLocationPromisified,
  wxPromisify,
  showModalPromisified,
  getStorageSync,
  setStorageSync,
  checkSession,
}
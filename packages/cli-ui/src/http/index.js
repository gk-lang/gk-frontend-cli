import qs from "qs";
import Axios from "axios";
// 异常处理
function exceptionHandler(resp) {
  let message = resp?.data?.message || resp?.data?.ErrInfo || "";
  if (!message) {
    switch (resp.status) {
      case 400:
        message = "错误请求";
        break;
      case 401:
        message = "权限校验未通过，请重新登录获取权限";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求错误,路径错误";
        break;
      case 405:
        message = "请求方法未允许";
        break;
      case 408:
        message = "请求超时";
        break;
      case 500:
        message = "服务器端出错";
        break;
      case 501:
        message = "网络未实现";
        break;
      case 502:
        message = "网络错误";
        break;
      case 503:
        message = "服务不可用";
        break;
      case 504:
        message = "网络超时";
        break;
      case 505:
        message = "http版本不支持该请求";
        break;
      default:
        message = `连接错误${resp.status}`;
    }
  }
  if(resp.status === 401 && window.location.pathname !== '/login'){
    window.location.replace(`/login?redirect=${window.location.pathname}&tipErrMsg=${ message || resp.statusText }`)
  } else {
    window.$msg.error({
      message: message || resp.statusText, 
      grouping: true
    });
  }
}

// 根据baseUrl创建Axios实例
function createAxiosInstance(baseURL) {
  const axiosInstance = Axios.create({
    baseURL,
    // 设置请求超时时间30s
    timeout: 30000,
  });
  axiosInstance.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
  axiosInstance.defaults.headers["Content-Type"] =
    "application/json;charset=UTF-8";
  axiosInstance.defaults.validateStatus = null;

  //请求拦截
  axiosInstance.interceptors.request.use((config) => {
    if (config.method === 'get') {
      config.params = { ...config.params }
    }
    // 转formData参数
    if (config.isFormData) {
      config.data = qs.stringify(config.data);
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (config.isUpload) {
      config.headers["Content-Type"] = "multipart/form-data; boundary=<calculated when request is sent>";
    }
    return config;
  });
  // 添加响应拦截器
  axiosInstance.interceptors.response.use(
    function (resp) {
      const flag = resp?.data?.code === 0 || resp?.data?.code == 200;
      if (!flag) exceptionHandler(resp);
      // 对响应数据做点什么
      return resp.data;
    },
    function (err) {
      const resp = err.response;
      const flag = resp?.data?.code === 0 || resp?.data?.code == 200;
      if (!flag) exceptionHandler(resp);
      return Promise.reject(err);
    }
  );
  return axiosInstance;
}

export default createAxiosInstance;

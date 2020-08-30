import { http } from "./http";
const err = error => {
  if (error && error.config && error.config.url === "/people/xxx") {
    // 设置重置次数，默认为0
    let { config } = error;
    config.__retryCount = config.__retryCount || 0;
    // 判断是否超过了重试次数
    if (config.__retryCount >= 3) {
      return Promise.reject(err);
    }
    //重试次数自增
    config.__retryCount += 1;
    //延时处理
    let backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, 3);
    });
    //重新发起axios请求
    return backoff.then(function() {
      return http(config);
    });
  }
  if (error.response) {
    const { data, status, statusText } = error.response;
    switch (status) {
      case 401:
        console.log({
          message: "Unauthorized",
          description: "Authorization verification failed"
        });
        console.error(error);

        break;
      default:
        console.log({
          message: statusText,
          description: (data && data.error) || ""
        });
        console.error(error);

        break;
    }
  } else {
    // 请求超时状态
    if (error.message.includes("timeout")) {
      console.log({
        message: "请求超时",
        description: "请检查网络是否连接正常"
      });
      console.error(error);
    } else {
      console.log({
        message: "请求失败",
        description: "请求失败，请检查网络是否已连接"
      });
      console.error(error);
    }
  }
  return Promise.reject(error);
};

export default function(axios) {
  // Add a request interceptor
  axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
  }, err);

  // Add a response interceptor
  axios.interceptors.response.use(function(response) {
    console.log(response);
    let { code, data, error } = response.data;
    if (code === 0) {
      return data;
    } else {
      console.error(`状态码异常： ${code}`);
      return Promise.reject(error || "未返回错误信息");
    }
  }, err);
}

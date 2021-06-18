import axios from "axios";

// baseURL是你API的主要Domain，只後發請求時只要填相對路徑就可以了
const instance = axios.create({
    baseURL: 'https://your.api.domain.tw/',
    headers: { 'Content-Type': 'application/json' },
    timeout: 20000
});

// 第一個函式會在 request 送出前攔截到此次的 config，讓你可以做最後的處理。
// 第二個函式可以讓你在 request 發生錯誤時做一些額外的處理。
instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

//   攔截到 response 發生錯誤時的 error 處理。
instance.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        if (error.response){
            switch (error.response.status) {
                case 404:
                console.log("你要找的頁面不存在")
                // go to 404 page
                break
                case 500:
                console.log("程式發生問題")
                // go to 500 page
                break
                default:
                console.log(error.message)
            }
        } 
        if (!window.navigator.onLine) {
            alert("網路出了點問題，請重新連線後重整網頁");
            return;
        }
        return Promise.reject(error);
    }
);

//   為了更有系統性的管理後端提供的API，我們可以設計成 function 再 export 出去。
export default function(method, url, data = null, config) {
    method = method.toLowerCase();
    switch (method) {
      case "post":
        return instance.post(url, data, config);
      case "get":
        return instance.get(url, { params: data });
      case "delete":
        return instance.delete(url, { params: data });
      case "put":
        return instance.put(url, data);
      case "patch":
        return instance.patch(url, data);
      default:
        console.log(`未知的 method: ${method}`);
        return false;
    }
}
### axios

1. axios 是一个基于 Promise 的 HTTP 库，可以用在浏览器和 node.js 中。 

2. 特性

    - 从浏览器中创建XMLHttpRequests  
    - 从node.js创建http请求  
    - 支持Promise API  
    - 拦截请求和响应  
    - 转换请求数据和响应数据  
    - 取消请求  
    - 自动转换JSON数据  
    - 客户端支持防御CSRF  

3. 使用

    `npm i axios -S`

    `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`

4. 实例 https://juejin.im/post/5b0ba2d56fb9a00a1357a334

    ```js
    axios({ url: 'https://www.domain.com/api/', method: 'get', params: { name: 123 } });
    axios.get('https://www.domain.com/api/', { params: { name: 123 } });
    axios({ url: 'https://www.domain.com/api/', method: 'post', data: { name: 123 } });
    axios.post('https://www.domain.com/api/', { name: 123 } );

    axios.all([ axios.get(), axios.post() ]).then(axios.spread(function(acct, perm) {
      // 请求完成
    }));
    ```

    ```js
    // 创建实例
    const instance = axios.create({
      baseURL: 'https://www.domain.com/api/',
      timeout: 10000, // ms
      headers: {'X-Custom-Header': 'foobar'}
    });

    // 配置会以一个优先顺序进行合并：在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。后者将优先于前者。
    // 使用由库提供的配置的默认值来创建实例
    // 此时超时配置的默认值是 `0`
    var instance = axios.create();

    // 覆写库的超时默认值
    // 现在，在超时前，所有请求都会等待 2.5 秒
    instance.defaults.timeout = 2500;

    // 为已知需要花费很长时间的请求覆写超时设置
    instance.get('/longRequest', {
      timeout: 5000
    });

    // 拦截器
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });

    // cancel token 取消请求
    // Axios 的 cancel token API 基于cancelable promises proposal，它还处于第一阶段。
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios.get('/user/12345', { cancelToken: source.token }).catch(function(thrown) {
      if (axios.isCancel(thrown)) {
        console.log('Request canceled', thrown.message);
      } else {
        // 处理错误
      }
    });

    axios.post('/user/12345', { name: 'new name' }, { cancelToken: source.token })
    // 取消请求（message 参数是可选的）
    source.cancel(message || 'Operation canceled by the user.');
    ```
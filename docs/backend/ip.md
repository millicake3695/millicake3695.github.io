### 获取客户端IP地址

在实际应用中，我们可能需要获取用户的 `ip` 地址，比如做异地登陆的判断，或者统计ip访问次数等。通常情况下我们使用 `request.getRemoteAddr()` 就可以获取到客户端ip，但是当我们使用了 nginx 作为反向代理后，使用 `request.getRemoteAddr()` 获取到的就一直是 nginx 服务器的 ip 的地址，那这时应该怎么办？

解决办法：nginx 使用 `$remote_addr` 变量可以获取用户的真实 ip，然后在方法中使用 `request.getAttribute('x-real-ip')`。

```ngnix
proxy_set_header x-real-ip $remote_addr
```

```js
function getIp (req) => {
  // req.headers['x-forwarded-for'] ngix反向代理ip
  // req.connection.remoteAddres connection的远程ip
  // req.socket.remoteAddress 后端socket ip
  let ip = req.headers['x-real-ip']
            || req.headers['x-forwarded-for']
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || '';
  if (ip.split(',').length > 0) ip = ip.split(',')[0];
  return ip;
};
```
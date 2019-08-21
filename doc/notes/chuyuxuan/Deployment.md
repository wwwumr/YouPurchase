# 部署的相关记录

## 端口情况
由于服务器只提供了9个端口在这里记录一下端口的使用情况
30411 无
30412 rabbitmq管理页面
30413 backend-user暂时的后端
30414 admin-dealer暂时后端
30415 管理员前端访问
30416 经销商前端访问

## MySQL的配置修改问题
我在修改mysql的最大连接数的时候碰到的一点问题

就是在修改后/etc/mysql/下的配置文件后，重启mysql服务，在mysql中查看最大连接数发现没有修改

查资料得知可能是配置文件的权限是只能读不能写的模式所以无法修改

参考
* https://blog.csdn.net/zwlsuperman/article/details/81333890

1. 修改/etc/security/limits.conf，添加
```
root soft nofile 65535
root hard nofile 65535
* soft nofile 65535
* hard nofile 65535
```

2. 修改/lib/systemd/system/mysql.service，添加
```
LimitNOFILE=65535
LimitNPROC=65535
```

保存后，执行以下命令
systemctl daemon-reload
systemctl restart mysql.service

adminanddealer-0.0.1-SNAPSHOT.jar
backenduser-0.0.1-SNAPSHOT.jar

## nginx
可以使用nginx做反向代理

nginx的所有配置都在/etc/nginx/nginx.conf里面，配置的具体情况可以查官网资料

检查配置文件
sudo nginx -t

重新启动nginx
sudo nginx -s reload

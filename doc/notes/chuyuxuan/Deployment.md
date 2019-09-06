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

## MySQL的编码问题
默认的MySQL编码方式不支持中文，如果需要储存中文需要把编码设置成utf8.

这个需要在配置文件中修改

对于已经生成的表，改变编码格式，可用下面一句sql语句

alter table `tablename` convert to charset utf8;

这样整张表的所有字段的编码都是utf8格式了

## 使用putty在windows环境下连接到服务器

之前使用的ssh工具xshell试用期到了，不能连接服务器，所以使用putty来连接

在putty使用密钥登录 服务器之前, 需要先把密钥文件转换成ppk格式.
#### 使用puttygen转换密钥文件

1. 打开puttygen客户端，点击“Load”，在弹窗中首先进入您存放密钥的路径，然后选择“All File（*.*）”，选择刚才下载的私钥文件，点击“打开”.

2. 在key comment栏中输入密钥名，输入加密私钥的密码（可选），点击“Save private key”，在弹窗中选择您存放密钥的目录，然后在文件名栏输入“密钥名.ppk”，点击“保存”。

#### 使用putty进行登录linux服务器
1. 打开putty客户端，进入左边的“Auth”配置菜单。
2. 点击“Browse”按钮，进入弹窗后进入密钥存储的路径，并选择刚才转换的ppk密钥文件，点击“打开”，返回配置界面，进入“Session”配置。
3. 在Session配置页中，配置服务器的IP，端口，协议信息，在“Saved Sessions”输入框中中输入会话名称，再点击“Save”按钮，然后双击会话名称或者点击“Open”按钮发起登录请求.

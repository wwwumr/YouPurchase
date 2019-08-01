# 前端制作过程中查询资料

react 编程规范:

https://blog.csdn.net/yczz/article/details/50379212

css: 关于盒子模型及布局对齐的有关知识:

http://www.w3school.com.cn/css/css_table.asp

对齐方式的选择,inline-block还是float:

inline-block根据文字对齐而非边框对齐,最终采用float和margin达到预期

margin调试:

https://www.cnblogs.com/xiaohuochai/p/5314289.html

css 定位:

http://www.w3school.com.cn/css/css_positioning.asp

调antd <Mentions>组件遇到的问题:

https://www.cnblogs.com/nanchen/p/7922959.html

jest测试：

https://jestjs.io/zh-Hans/

爬虫：

https://www.bilibili.com/video/av22571713

react思想：

https://react.docschina.org/docs/thinking-in-react.html


解决生产环境的sourceMap问题：

https://www.jianshu.com/p/e09b2c57cf20

react测试:

https://react.docschina.org/docs/test-utils.html
https://react.docschina.org/docs/shallow-renderer.html
https://react.docschina.org/docs/test-renderer.html

promise和then的关系：
https://segmentfault.com/a/1190000010420744?utm_source=tag-newest

jest mock:

http://www.imooc.com/article/254755

enzyme:

https://www.cnblogs.com/susu8/p/9512393.html

.get(index)：返回指定位置的子组件的DOM节点

.at(index)：返回指定位置的子组件

.first()：返回第一个子组件

.last()：返回最后一个子组件

.type()：返回当前组件的类型

.text()：返回当前组件的文本内容

.html()：返回当前组件的HTML代码形式

.props()：返回根组件的所有属性

.prop(key)：返回根组件的指定属性

.state([key])：返回根组件的状态

.setState(nextState)：设置根组件的状态

.setProps(nextProps)：设置根组件的属性


后端接口

## 登录信息

管经登录接口
/login/admin?userName=*&password=*
返回 "ADMIN" / "ERROR"

/login/dealer?userName=*&password=*
返回 "DEALER" / "ERROR"

管经注销接口
/logout
返回 "LOGOUT"

管经获取用户名接口
/login/userName
返回 username / "NULL"

## 商品信息 

经获取所有商品接口
/stores/{storeId}/commodities
返回商品列表

经根据货物获取信息接口
/commodities/{commodityId}
返回商品信息或null

经新设货物接口
post 货物信息 /commodities
返回 {"key":新建商品的id(Long), "coverPicUrl":String}

经修改商品信息接口
put 商品信息 /commodities
返回 "UPDATE"

发送数组请求商品数组
post 数组 /commodities/ids

删除商品列表
delete 数组 /commodities
返回 "DELETE"

## 经销商信息

请求所有经销商信息
get /dealers
返回经销商信息列表

请求某位经销商信息
get /dealers/{dealerId}
返回经销商信息

新建经销商
post 经销商信息 /dealers
返回 {"key" : long, "avatar" : String}

修改经销商
put 经销商信息 /dealers
返回 "saved"

删除经销商信息
delete ID数组 /dealers
返回 "DELETE"

获取未绑定的经销商
get /unbindDealers
返回 经销商列表

经销商更改头像
post {file, key, avatar} /avatar
返回新头像url

## 图片信息

请求图片
get /image/{picUrl}
返回文件字节码

## 商店信息

所有商店信息
get /stores
返回所有商店信息

用id请求商店信息
get /stores/{storeId}
返回指定id的商店

新建店铺
post 店铺信息 /stores
返回 {"key" : long, "coverPicUrl" : String}

修改店铺信息
put 店铺信息 /stores
返回 {"key" : long}, -1代表失败

删除店铺信息
delete id数组 /stores
返回 "DELETE"

绑定经销商和店铺
get /bind?dealerId=*&storeId=*
返回 "bind"

获取未绑定的店铺
get /unbindStores
返回店铺列表

更新商店封面
post {file, key, coverPicUrl} /cover
返回新的url

修改店铺配送方式
get /delivery?deliveryType=*&storeId=*
返回 "UPDATE"

## 用户评价相关接口

用户新增评论
post gradeParameter /grade/add
返回数字200/403

查看评论
get /grade/show
返回评分列表

## 头像获取

头像获取
get /user/getPhoto/{picUrl}

## 订单信息

新建订单
post orderInfoParameter /order/add 
返回数字

查看订单
post orderInfoCheckParameter /order/storeCheck
返回订单信息列表

经销商修改订单状态
get /order/modify
返回数字

订单取消
get /order/delete
返回数字

## 待做

* 标签管理
* 酒厂进货
* 订单统计 ok
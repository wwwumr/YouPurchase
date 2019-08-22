# Youpurchase - 酒厂管理员manager端

## 文件组织结构

components为路由跳转的根目录

js文件所在位置表明了该组件的路由跳转目录(若子文件夹与当前js文件同名则代表子文件夹为该组件的子组件文件夹)

## 功能分配

app负责控制用户名信息

homepage为登录页面

shopManage和dealerManage分别为店铺管理及经销商管理

## 需要的接口

主页需要

1. 验证用户信息并返回是否合法的接口 ok

店铺管理及经销商管理需要

1. 返回各自全部信息的接口 get /stores ok ok
2. 新建店铺、经销商的接口 post /stores  ok ok

店铺详情页面需要

1. 提供key返回店铺信息的接口                                    get /stores/:id  ok
2. 返回未绑定经销商的接口                                       get /stores/unbindDealers  ok
3. 提供key及dealerId以解除绑定的接口                               get /stores/unbind?dealerId=?&storeId=? ok
4. 上传图片和旧的url返回url的接口                               ok
5. 提供新的店铺信息(包括可能新的经销商id及name)更改信息的接口       put /stores ok

        key: 0, 
        storeName: "华山派", 
        address: "河北",  
        contact: '123457', 
        hours: [ "8:00", '21:30' ],
        dealerId: 

经销商详情需要

1. 提供key返回经销商信息的接口 get /dealers/:id  ok
2. 返回未绑定店铺的接口     get /dealers/unbindStores ok
3. 提供key及storeId以解除绑定的接口 get /stores/unbind?dealerId=?&storeId=? ok
4. 上传图片返回url的接口                                        ok
5. 提供新的经销商信息(包括可能新的店铺id及name)更改信息的接口   put /dealers ok

## 待做

1. 重构hashhistory为browserhistory
2. 用户名、storeId、dealerId用session记录（登录状态管理，刷新后不消失登录状态）ok
3. 用webpack打包 https://blog.csdn.net/DFF1993/article/details/80267149
4. 在经销商、商店信息修改页面，搜索授权的操作易用性很差，操作起来不直观也不方便 
5. 在经销商管理页面，同一页面（不跳转）先授权商店，然后取消授权，下面的搜索框出现disable的状态  ok
6. 当经销商或者商店未授权时，查看信息的按钮不是disable状态，会跳转到空页面      ok
7. 莫名其妙的会请求一些[https:/zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png]这种请求，应该是在config中的默认设置，可以换成自己的url ok
8. 商店管理页面，新增后表单不清空,连续添加key改成相同的 ok
9. 时间格式验证 ok

30415
# TODOS
## 
* 配送坐标
* 商品标签
* 商店排序
* 店铺配送范围
### 商品分类
#### controller层
- 经销商
    - get 店铺的所有分类
    - post 添加新的分类
    - put 修改分类名
    - delete 删除分类
- 用户
    - get 某家店铺的某个分类下的商品

    - get 用距离进行商店排序
#### service层
- 经销商
    - storeId 得到分类
    - 添加分类
    - 分类id 修改分类
    - 分类id 删除分类
#### dao层-repository层

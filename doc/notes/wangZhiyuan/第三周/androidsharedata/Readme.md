## android 跨程序共享数据
### 运行时的权限(Runtimepermissiontest)
- 这个是在运行过程中获取权限CALL_PHONE
- 首先要在AndroidManifest.xml 中添加
```
<uses-permission android:name="android.permission.CALL_PHONE"/>
```
- 通过以下代码在运行时获得权限
``` java
if(ContextCompat,checkSelPermission(MainActivity.this,Manifest.permission.CALL_PHONE)!=PackageManager.PERMISSION_GRANTED){
    ActivityCompat.requestPermissions(MainActivity.this,new String[]{Manifest.permission.CALL_PHONE},1);
}else{
    call();
}
- 之后override以下方法
```java
@Override
public void onRequestPermissionResult(int requestCode,String[]permissions,int[] grantResults){

}
```
- 同时我们可以进入settings-app-XXX-permissions观察该程序的权限然后将部分权限给禁了

### 访问其他程序中的数据(ContactsTest)
- 这个程序实现的是从手机中的电话薄中获得数据并且展示
- 这个例子实现的是通过内容提供器进行获得
``` java
// 获得cursor进行操作数据
Cursor cursor = getContentResolver().query(ContactsContract.CommonDataKinds.Phone.CONTENT_URI,null,null,null.null);
```
### 实现跨程序数据共享 （Provider）
就是在数据库实现中加入provider并设置权限（DatabaseTest）
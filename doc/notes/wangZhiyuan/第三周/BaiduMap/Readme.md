## 百度定位以及百度地图
### 百度定位
- 上官网申请 API Key
- 之后下载相应Android SDK
- 将下载好的.jar和相关文件夹分别放在相应的文件夹下
- AndroidManifest.xml
```java
// 添加以下的权限
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>
    <uses-permission android:name="android.permission.WAKE_LOCK"/>
// 添加API KEy
    <meta-data
            android:name="com.baidu.lbsapi.API_KEY"
            android:value="1cXGQdHiKq8tcxAWR0B8sV8F0L8q4IAp"/>    
//注册相应的服务
<service android:name="com.baidu.location.f" android:enabled="true"
            android:process=":remote"/>
```
- MainActivity.java
``` java
// 将以下三个运行时才能获得的权限统一集中处理
        List<String> permissionList = new ArrayList<>();
        if(ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.ACCESS_FINE_LOCATION)!= PackageManager.PERMISSION_GRANTED){
            permissionList.add(Manifest.permission.ACCESS_FINE_LOCATION);
        }
        if(ContextCompat.checkSelfPermission(MainActivity.this,Manifest.permission.READ_PHONE_STATE)!=PackageManager.PERMISSION_GRANTED){
            permissionList.add(Manifest.permission.READ_PHONE_STATE);
        }
        if(ContextCompat.checkSelfPermission(MainActivity.this,Manifest.permission.WRITE_EXTERNAL_STORAGE)!=PackageManager.PERMISSION_GRANTED){
            permissionList.add(Manifest.permission.WRITE_EXTERNAL_STORAGE);
        }
        if(!permissionList.isEmpty()){
            String [ ]permissions = permissionList.toArray(new String[permissionList.size()]);
            ActivityCompat.requestPermissions(MainActivity.this,permissions,1);
        }else{
            requestLocation();
        }
        ···
//  继承BDLocationListener
 public class MyLocationListener implements BDLocationListener {
        @Override
        public void onReceiveLocation(final BDLocation location)
```
- 让这些点的坐标随着手机的方位变化 
``` java
private void requestLocation(){
        initLocation();
        mlocationClient.start();
    }
    private void initLocation(){
        LocationClientOption option = new LocationClientOption();
        option.setScanSpan(5000);
        option.setIsNeedAddress(true);
       // option.setLocationMode(LocationClientOption.LocationMode.Device_Sensors);
        mlocationClient.setLocOption(option);
    }   
    ```  
- 选择定位模式
``` java
//在initLocation中加入以下语句
option.setLocationMode(LocationClientOption.LocationMode.Device_Sensors);
```
### 使用百度地图
- 注意要将SDKInitializer写在setContentView之前
- 移动到我的位置 baiduMap.animateMapStatus(updata);
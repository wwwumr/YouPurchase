# Android 广播机制
- Android广播机制共有Normal broadcasts,Ordered broadcasts
## 广播机制的写法
- 继承BroadcastReceiver,Override方法onReceive
- 注册广播通过以下代码
```
intentFilter = new IntentFilter();
intentFilter.addAction("android.net.conn.CONNECTIVITY_CHANGE");
networkChangeReceiver(networkChangeReceiver,intentFilter);
```
- 结束之后通过unregisterReceiver();进行注销
## 实现静态注册开机起订
在AndroidMainifest.xml中天健权限
```
<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
<receiver>
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED"/>
    </intent-filter>
</receiver>
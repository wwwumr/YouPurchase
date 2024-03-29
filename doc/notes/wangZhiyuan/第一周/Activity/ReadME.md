## 学习Android 中的Activity
### 创建活动
- 在相关的package 新建一个java类这个类继承 AppCompatActivity
- 在 res 创建一个layout 文件夹并且在这个文件夹下新建一个Layout resource file
- 之后在 AndroidMainfest文件中进行注册  
- 注册的方式如下
```
 <activity android:name="XXX">
     <intent-filter>
        <action android:name="xxx"/><category android:name="xxx"/> 
    </intent-filter>
 </activity>
```
-  销毁活动直接通过finish()就可以了
### 使用Intent 实现在活动之间切换与传值
- 显式Intent 
```
Intent intent = new Intent(XXX.this,XXX.class)
startActivity(intent);
```
- 隐式的intent
```
Intent intent = new Intent("XXX");
startActivity(intent)
```
> 其中的XXX是在AndroidMainifest中配置的
- 隐式的其他形式可以通过setData的方式进行
- 活动之间传值(往后传)
```
Intent intent =new Intent(XXXX,XXXX);
intent.putExtra("extra_data",XXX);
startActivity(intent);
```
- 后一个活动的处理方式
```
Intent intent = getIntent();
String data = intent.getStringExtra("extra_data");
```
### Activity的生命周期
- 活动有运行，暂停，停止，销毁等状态
- 活动相关的函数有 onCreate，onStart,onResume,onPause,onStop,onDestroy,onRestart
- 活动有三种生存期，完整生存期，可见生存期，前台生存期
- 如果活动因为CPU资源等问题被释放的话，下一次调用这个活动就会重新创建一次。
- 活动有四种启动方式分别是standard,singleTop,singleTask,singleInstance
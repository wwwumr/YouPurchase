# Android 调用网络与后端
## Http协议访问网络
### HttpURLConnection（request文件夹项目）
- 在AndroidMainifest.xml 启动权限
```
<uses-permission android:name="android.permisiion.INTERNET"/>
```
- 之后在一个新的线程中加入以下的代码
```
URL url = new URL("XXXX");
HttpURLConnection connection = (HttpURLConnection)url.openConnection();
connection.setRequestMethod("GET");
InputStream in = connection.getInputStream();
connection.disconnection();
```
- 注意以上代码不要写在主线程中，不然的话，程序会经常崩溃。

### OkHttp（request2文件夹项目）
- 在build.gradle加入以下依赖
```
compile 'com.squareup.okhttp3:okhttp:3.4.1'
```
- 注意是在app文件夹下的module
- 之后新建一个线程并且在线程中 加入以下代码
```
OkHttpClient client = new OkHttpClient();
Request request = new Request.Builder().url("XXXX").build();
Response response = client.newCall(request).execute();
String responseData = response.body().string();
```
- 注意以上两个项目运行时，要保证android模拟器中的数据按钮是打开的状态
- 本机跑得spring boot 项目不可以通过localhost在android上进行访问，须通过本机ip

### 解析数据（JSON与GSON）
- 执行的方法与React 类似。

## android数据存储的本地持久化
### 用文件进行存储 
- 其中File文件夹下就是关于这个实现的例子
- 与C++文件操作非常类似
- 通过 进行存储
``` java
out = openFileOutput("data",Context.XXXX);
writer = new BufferedWriter(new OutputStreamWriter(out));
writer.write(XXX);
```
- 通过 进行读取数据
``` java
in = openFileInput("data");
reader = new BufferedReader(new InputStreamReader(in));
String line="";
while((line=reader.readline())!=null) content.append(line);
```
### 使用SharePreferences 存储
- 其中的SharePreferences文件夹内就是实现了这种存储
- 其中username-password文件夹中就是结合这个存储实现了记住密码的功能
``` java
// 获取数据
SharedPreferences pref = getSharedPreferences("data".Mode);
String name = pref.getString("name","")
// 添加数据
editor = pref.edit()
editor.putString(key,value);
editor.apply();
```
### 使用LitePal 数据库进行存储
- 其中LitePalTest就是实现了这个简单地例子

### 使用 SQLite 数据库进行存储
- 其中 DatabaseTest就是使用SQLite实现简单地存储，删除和查询
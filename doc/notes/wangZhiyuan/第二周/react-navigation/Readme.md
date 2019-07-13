## react-navigation 的配置和学习
### react-navigation的配置
- 自从react-navigation 到3.x之后配置就不容易主要是在react-native-gesture-handler
- 按照官网上的配置是远远不够的
> - \android\app\src\main\java\com\app2\MainApplication.java 中修改
 ``` java
 @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      packages.add(new RNGestureHandlerPackage());
      return packages;
    }
```
> - 这时会包RNGestureHanlder类似的错误，请npm intall jetifier npx jetity
## react-navigation的学习
- createStackNavigator 创建相应路由下的页面
- createAppContainer 创建相应的容器
- 路由传值的环用this.props.navigation.navigate('',{})
- 获取路由传的值this.props.navigation.state.params.xxx;
- 注意几点，this.props.navigation是否是在孙子组件使用
- Navigation 文件夹中是一个简单地例子，进入文件夹npm install,之后react-native run-android就可以运行
# Prometheus 监控
## install
去官网上下载prometheus，我查的最新版的是2.11.0，但是官网上下载的太慢了，就去下载了一个2.9版本的，并不影响使用
下载新版grafana

## config
下载好压缩包后解压，在powershell中执行
`.\prometheus.exe --config.file=prometheus.yml`可以看到提示（需要保证9090端口不被占用）
在浏览器中访问localhost:9090/graph就可以看到相应页面了，这是prometheus只是监控自己，可以在导航栏中的status > targets 中看到自己的服务

## 整合springboot
在一个springboot项目中加入依赖(maven)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```
application.properity中加入属性
```java
spring.application.name=spring-boot-prometheus
management.endpoints.web.exposure.include=*
management.metrics.tags.application=${spring.application.name}
```
在application启动类中加入配置
```java
@Bean
MeterRegistryCustomizer<MeterRegistry> configurer(@Value("${spring.application.name}") String applicationName) {
    return (registry) -> registry.config().commonTags("application", applicationName);
}
```
然后在Prometheus的配置文件(prometheus.yml)中加入
```yml
#SpringBoot应用配置
  - job_name: 'spring-boot-prometheus'
    scrape_interval: 5s
    metrics_path: '/actuator/prometheus'
    static_configs:
      - targets: ['localhost:8080']
```
启动springboot应用，访问localhost:9090，可以看到服务已经被Prometheus发现并管理

## Grafana
在使用Prometheus时经常使用另一个可视化的工具Grafana，从官网上下载grafana的安装包，安装后，在浏览器中访问localhost:3000,配置Prometheus作为database，在dashboard中import官网上找的模板，比如Prometheus 2.0 status，JVM等，可以看到相应的可视化页面

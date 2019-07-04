# spring boot单元测试学习记录
2019/7/2
## 1
springboot在新建项目的时候，会自动引入`spring-boot-starter-test`这个dependency，可以帮助我们做单元测试

在IDEA的相关类中右键选择generate>>Test，可以自动建好测试类框架

在测试类头部加入注解@RunWith(SpringRunner.class)和@SpringBootTest可以直接把整个项目的测试环境建立起来，还可以在测试中引入测试的配置(https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/boot-features-testing.html#boot-features-testing-spring-boot-applications-excluding-config)

但是@SpringBootTest没有实际启动服务器，要测试controller可以用MockMvc
```java
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MockMvcExampleTests {

	@Autowired
	private MockMvc mvc;

	@Test
	public void exampleTest() throws Exception {
		this.mvc.perform(get("/")).andExpect(status().isOk()).andExpect(content().string("Hello World"));
	}

}
```

在单元测试中我们有时候并不希望启动一个完整的ApplicationContext,比如我们只希望测试一个controller或者jpa接口，我们可以使用@WebMvcTest代替@SpringBootTest

相反，如果想把服务器启动起来，可以使用注解@SpringBootTest(webEnvironment=WebEnvironment.RANDOM_PORT)

在单独测试一个controller时，我们可以在加上@WebMvcTest，包括了注解@AutoConfigureWebMvc和@AutoConfigureMockMvc

然后我们就可以Mock出需要注入的Service类了(类上加注解@MockBean)
```java
@RunWith(SpringRunner.class)
@WebMvcTest
@AutoConfigureMockMvc
public class MyTests {

	@MockBean
	private RemoteService remoteService;

	@Autowired
	private Reverser reverser;

	@Test
	public void exampleTest() {
		// RemoteService has been injected into the reverser bean
		given(this.remoteService.someCall()).willReturn("mock");
		String reverse = reverser.reverseSomeCall();
		assertThat(reverse).isEqualTo("kcom");
	}

}
```

* https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/boot-features-testing.html#boot-features-testing-spring-boot-applications-testing-autoconfigured-tests
上面这个讲的就是在只测试这个应用的一个"slice",比如只测试controller，json，jpa...

## 2
在进行对dao数据访问的单元测试时，如果按照文档上的用@DataJpaTest写测试的话，由于项目的Dao层是一个接口，daoImpl实现接口，但实现方式是注入Repository的接口，在完整的springboot应用中可以，但是这里单元测试就无法注入Repository(目前未知原因)，就会测试失败，所以直接使用@SpringBootTest，就可以进行测试了

加上@Transactional保证数据库测试后回滚(`import org.springframework.transaction.annotation.Transactional;`)

## 3
在测试service接口时，可以直接用WebMvc加载部分context，然后用Mock出的数据进行测试
```java
@RunWith(SpringRunner.class)
@WebMvcTest(StoreService.class)
@AutoConfigureMockMvc
public class StoreServiceTest {

    @MockBean
    private StoreDao storeDao;

    @Autowired
    private StoreService storeService;

    @Test
    public void testGetAllStores() throws Exception{
        Store store = new Store();
        store.setAddress("tAddress");
        store.setCommodityList(new ArrayList<Commodity>());
        store.setContact("123456");
        Dealer dealer = new Dealer();
        dealer.setId(1L);
        store.setDealer(dealer);
        store.setStoreName("testStoreName");
        store.setOpenHourStart(new Date());
        store.setOpenHourEnd(new Date());
        ArrayList<Store> stores = new ArrayList<>();
        stores.add(store);
        given(this.storeDao.getAllStores()).willReturn(stores);
        Assert.assertNotNull(storeService.getAllStores());
        Assert.assertEquals(storeService.getAllStores().get(0).getStoreName(),"testStoreName");
        System.out.println(storeService.getAllStores().get(0).getHours()[0]);
        System.out.println(storeService.getAllStores().get(0).getHours()[1]);
    }

}
```
## references
* https://docs.spring.io/spring-boot/docs/2.1.6.RELEASE/reference/html/boot-features-testing.html

package com.sjtu.youpurchase.dao;

import com.sjtu.youpurchase.entity.Store;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @author Chuyuxuan
 */
@Transactional
@RunWith(SpringRunner.class)
@SpringBootTest
//@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
//@Import({StoreDaoImpl.class, StoreRepository.class})
public class StoreDaoTest {
    /// 下面的TestEntityManager是在加上@DataJpaTest才能使用的类，但是由于这个项目不是简单的一个Repository
    /// 只用@DataJpaTest测试无法注入Dao类
//    @Autowired
//    private TestEntityManager entityManager;

    @Autowired
    private StoreDao storeDao;

    @Test
    public void testFindAllStores() throws Exception {
        List<Store> storeList = this.storeDao.getAllStores();
        Assert.assertEquals(storeList.size(), 0);
    }
}
package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.dao.AdminDao;
import com.sjtu.adminanddealer.dao.DealerDao;
import com.sjtu.adminanddealer.dao.UserDao;
import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.BDDMockito.given;

/**
 * AdminDealerLoginService的测试类.
 *
 * @author Chuyuxuan
 */
@RunWith(SpringRunner.class)
@ActiveProfiles("test")
//@WebMvcTest(AdminDealerLoginService.class)
//@AutoConfigureMockMvc
@SpringBootTest
public class AdminDealerLoginServiceTest {

    @Autowired
    private AdminDealerLoginService adminDealerLoginService;

    @MockBean
    private DealerDao dealerDao;

    @MockBean
    private AdminDao adminDao;

    @MockBean
    private UserDao userDao;

    @MockBean
    private StringRedisTemplate stringRedisTemplate;

    @Test
    public void testDI() throws Exception {
        Assert.assertNotNull(adminDealerLoginService);
    }

    @Test
    public void testGetAdminByUserNameAndPassword() throws Exception {
        given(this.adminDao.getAdminByUserNameAndPassword("admin", "password")).willReturn(new Admin());
        given(this.adminDao.getAdminByUserNameAndPassword("admin", "123456")).willReturn(null);
        given(this.adminDao.getAdminByUserNameAndPassword("wrongAdmin", "password")).willReturn(null);

        Assert.assertNotNull(adminDealerLoginService.getAdminByUserNameAndPassword("admin", "password"));
        Assert.assertNull(adminDealerLoginService.getAdminByUserNameAndPassword("admin", "123456"));
        Assert.assertNull(adminDealerLoginService.getAdminByUserNameAndPassword("wrongAdmin", "password"));
    }

    @Test
    public void testGetDealerByUserNameAndPassword() throws Exception {
        given(this.dealerDao.getDealerByUserNameAndPassword("user", "password")).willReturn(new Dealer());
        given(this.dealerDao.getDealerByUserNameAndPassword("user", "wrong")).willReturn(null);
        given(this.dealerDao.getDealerByUserNameAndPassword("wrongUser", "123456")).willReturn(null);

        Assert.assertNotNull(adminDealerLoginService.getDealerByUserNameAndPassword("user", "password"));
        Assert.assertNull(adminDealerLoginService.getDealerByUserNameAndPassword("user", "wrong"));
        Assert.assertNull(adminDealerLoginService.getDealerByUserNameAndPassword("wrongUser", "123456"));
    }

}
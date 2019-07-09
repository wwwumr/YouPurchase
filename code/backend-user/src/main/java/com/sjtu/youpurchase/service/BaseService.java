package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.Dao.GradeDao;
import com.sjtu.youpurchase.Dao.OrderInfoDao;
import com.sjtu.youpurchase.Dao.UserDao;
import com.sjtu.youpurchase.entity.OrderInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BaseService {
    @Autowired
    protected GradeDao gradeDao;

    @Autowired
    protected OrderInfoDao orderInfoDao;

    @Autowired
    protected UserDao userDao;

}

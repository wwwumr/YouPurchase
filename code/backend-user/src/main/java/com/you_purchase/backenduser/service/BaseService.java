package com.you_purchase.backenduser.service;

import com.you_purchase.backenduser.dao.OrderInfoDao;
import com.you_purchase.backenduser.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.stereotype.Service;

@Service
public class BaseService {
    @Autowired
    protected UserDao userDao;

    @Autowired
    protected OrderInfoDao orderInfoDao;
}

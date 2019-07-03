package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.dao.*;
import com.sjtu.youpurchase.utils.Constrain;
import com.sjtu.youpurchase.entity.User;
import org.apache.tomcat.util.codec.binary.Base64;
import org.hibernate.mapping.Constraint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.File;
import java.util.UUID;


@Service
public class BaseService {
    @Autowired
    protected  UserDao UserDao;



}

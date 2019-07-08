package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.entity.Admin;
import com.sjtu.adminanddealer.entity.Dealer;

/**
 * @author Chuyuxuan
 */
public interface AdminDealerLoginService {
    Admin getAdminByUserNameAndPassword(String userName, String Password);

    Dealer getDealerByUserNameAndPassword(String userName, String Password);
}

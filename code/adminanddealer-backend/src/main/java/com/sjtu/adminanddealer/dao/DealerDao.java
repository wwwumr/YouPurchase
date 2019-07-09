package com.sjtu.adminanddealer.dao;

import com.sjtu.adminanddealer.entity.Dealer;
import com.sjtu.adminanddealer.entity.Store;

import java.util.List;

/**
 * 经销商对应的数据访问层接口
 *
 * @author Chuyuxuan
 */
public interface DealerDao {

    /**
     * 通过经销商的Id找到对应的实体
     *
     * @param Id 经销商的id
     * @return 对应Id的经销商实体
     */
    Dealer getDealerById(Long Id);

    /**
     * 更新经销商信息
     *
     * @param dealer 需要更新的经销商实体
     */
    void updateDealer(Dealer dealer);

    /**
     * 获取所有的经销商实体
     *
     * @return 包含所有经销商实体的列表
     */
    List<Dealer> getAllDealers();

    /**
     * 在数据库中持久化一个经销商实体
     *
     * @param dealer 经销商实体
     */
    Long addADealer(Dealer dealer);

    /**
     * 获取所有未绑定经销商的店铺实体
     *
     * @return 包含所有未绑定店铺的列表
     */
    List<Store> getAllUnbindStore();

    /**
     * 获取所有的未绑定的经销商实体
     *
     * @return 包含所有未绑定经销商的列表
     */
    List<Dealer> getAllUnbindDealers();

    /**
     * 供登录使用，使用用户名与密码来获取一个经销商
     *
     * @param userName 用户名
     * @param password 密码
     * @return 如果用户名与密码匹配，返回对应的经销商；否则返回null
     */
    Dealer getDealerByUserNameAndPassword(String userName, String password);

    // TODO: updateDealerPassword no implement
    void updateDealerPassword(Long dealerId, String newPassword);
}

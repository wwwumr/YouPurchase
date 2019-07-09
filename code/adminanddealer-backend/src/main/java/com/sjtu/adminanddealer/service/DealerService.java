package com.sjtu.adminanddealer.service;

import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.DTO.StoreDTO;
import com.sjtu.adminanddealer.parameter.DealerParameter;

import java.util.List;

/**
 * 经销商对应的service层
 *
 * @author Chuyuxuan
 */
public interface DealerService {

    /**
     * 获取全部的经销商信息，数据的格式参考DealerResponseDTO
     *
     * @return 包含全部经销商信息的列表
     * @see DealerService
     */
    List<DealerDTO> getAllDealers();

    /**
     * 通过dealerId获取经销商信息
     *
     * @param dealerId 经销商id
     * @return 对应id的经销商信息, 如果对应id不存在返回一个空的DealerDTO对象
     */
    DealerDTO getDealerByDealerId(Long dealerId);

    /**
     * 新建一个经销商账户
     *
     * @param dealerParameter 由前端发送过来的信息新建经销商账户
     */
    Long addADealer(DealerParameter dealerParameter);

    /**
     * 更新经销商信息,只包括经销商的用户名、密码、地址、真实姓名、联系方式，调用者为管理员
     *
     * @param dealerParameter 需要更新的经销商
     */
    void updateDealer(DealerParameter dealerParameter);

    /**
     * 更新经销商的密码，调用者为经销商自己.
     * TODO: updateDealerPassword no implement
     *
     * @param password 修改之后的密码
     */
    void updateDealerPassword(String password);

    /**
     * 获取所有没有绑定的店铺.
     *
     * @return
     */
    List<StoreDTO> getAllUnbindStore();

}

package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.parameter.DealerParameter;
import com.sjtu.youpurchase.DTO.DealerDTO;

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
     * 新建一个经销商账户
     *
     * @param dealerParameter 由前端发送过来的信息新建经销商账户
     */
    void addADealer(DealerParameter dealerParameter);

    /**
     * 更新经销商信息
     *
     * @param dealerParameter 需要更新的经销商
     */
    void updateDealer(DealerParameter dealerParameter);
}

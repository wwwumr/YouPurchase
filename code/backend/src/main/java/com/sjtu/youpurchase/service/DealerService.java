package com.sjtu.youpurchase.service;

import com.sjtu.youpurchase.DTO.DealerRequestDTO;
import com.sjtu.youpurchase.DTO.DealerResponseDTO;

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
    List<DealerResponseDTO> getAllDealers();

    /**
     * 新建一个经销商账户
     *
     * @param dealerRequestDTO 由前端发送过来的信息新建经销商账户
     */
    void addADealer(DealerRequestDTO dealerRequestDTO);

    /**
     * 更新经销商信息
     *
     * @param dealerRequestDTO 需要更新的经销商
     */
    void updateDealer(DealerRequestDTO dealerRequestDTO);
}

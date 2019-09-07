package com.sjtu.adminanddealer.service;

import com.alibaba.fastjson.JSONObject;
import com.sjtu.adminanddealer.DTO.DealerDTO;
import com.sjtu.adminanddealer.parameter.DealerParameter;
import org.springframework.web.multipart.MultipartFile;

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
     * @return 一个JSON, 包括新建的经销商id和头像url, 格式为{"key" : long, "avatar" : String}
     */
    JSONObject addADealer(DealerParameter dealerParameter);

    /**
     * 删除一个经销商的信息.
     *
     * @param dealerId
     */
    void deleteDealer(Long dealerId);

    /**
     * 更新经销商信息,只包括经销商的用户名、密码、地址、真实姓名、联系方式，调用者为管理员
     *
     * @param dealerParameter 需要更新的经销商
     */
    void updateDealer(DealerParameter dealerParameter);

    /**
     * 经销商修改自己账号的密码
     *
     * @param dealerId    经销商id
     * @param oldPassword 原来的密码
     * @param newPassword 新的密码
     * @return 成功返回200, 输入原密码错误返回500, 失败返回400
     */
    Integer updateDealerPassword(Long dealerId, String oldPassword, String newPassword);

    /**
     * 管理员修改经销商的密码
     *
     * @param dealerId    需要修改密码的经销商id
     * @param newPassword 新密码
     * @return 成功返回200, 失败返回400
     */
    Integer updateDealerPasswordByAdmin(Long dealerId, String newPassword);

    /**
     * 获取所有未绑定的经销商
     *
     * @return 所有未绑定的经销商的信息
     */
    List<DealerDTO> getAllUnbindDealers();

    /**
     * 经销商更改头像.
     *
     * @param file     上传的图片文件
     * @param dealerId 经销商id
     * @param avatar   原来的头像url
     * @return 新建的头像的url
     */
    String updateDealerAvatar(MultipartFile file, Long dealerId, String avatar);

}

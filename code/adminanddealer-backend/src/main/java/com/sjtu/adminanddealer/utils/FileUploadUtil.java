package com.sjtu.adminanddealer.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;

/**
 * 控制文件上传的工具类
 * TODO: unit test
 *
 * @author Chuyuxuan
 */
@Component
public final class FileUploadUtil {

    private static FileUploadUtil fileUploadUtil = new FileUploadUtil();

    //    @Value("${imageBaseDirectory}")
    private String FILE_BASE_DIR = "G:\\YouPurchase\\code\\backend\\src\\main\\resources\\";

    private FileUploadUtil() {
    }

    /**
     * 使用单例模式创建工具类对象.
     *
     * @return 控制文件上传的工具类
     */
    public static FileUploadUtil getFileUploadUtil() {
        return fileUploadUtil;
    }

    /**
     * 保存上传的文件.
     *
     * @param file 前端发送的文件
     * @return 保存成功返回文件对应的url，例如"image/dafd2f8v8dhv8.jpg";保存不成功返回"error"
     */
    public String saveFile(MultipartFile file) {
        if (file.isEmpty()) {
            return null;
        }
        Date date = new Date();
        String originFileName = file.getOriginalFilename();
        // 取源文件的后缀
        String suffix = originFileName.substring(originFileName.lastIndexOf('.'));
        // 用当前时间以及文件名哈希，防止文件重名
        String fileName = String.valueOf((date.toString() + originFileName).hashCode()) + suffix;
        File dest = new File(this.FILE_BASE_DIR + "image/" + fileName);
        try {
            file.transferTo(dest);
            return "image/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 覆盖一个已经存在的文件
     *
     * @param file           前端POST发送的文件
     * @param originFilename 前端POST发送的原文件存入数据库中的url
     * @return 成功返回ok，失败返回error并打印错误信息
     */
    public String coverExistFile(MultipartFile file, String originFilename) {
        File dest = new File(this.FILE_BASE_DIR + "image/" + originFilename);
        try {
            file.transferTo(dest);
            return "ok";
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 删除数据库中文件url对应的文件.
     *
     * @param fileUrl 数据库中文件的url，比如"image/saf00a9dajd0ad8a.jpg"
     * @return 删除成功返回0, 找不到文件返回1, 删除失败返回2
     */
    public int deleteFile(String fileUrl) {
        File file = new File(this.FILE_BASE_DIR + fileUrl);
        if (file.exists() && file.isFile()) {
            if (file.delete()) {
                return 0;
            } else {
                return 2;
            }
        } else {
            return 1;
        }

    }
}

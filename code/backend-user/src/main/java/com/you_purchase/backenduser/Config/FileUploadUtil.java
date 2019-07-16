package com.you_purchase.backenduser.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;

/*
* @author Chuyuxuan
*/

@Component
public class FileUploadUtil {

    private String FILE_BASE_DIR;

    public FileUploadUtil() {
    }

    @Value("${imageBaseDir}")
    public void setFILE_BASE_DIR(String file_base_dir) {
        this.FILE_BASE_DIR = file_base_dir;
    }

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

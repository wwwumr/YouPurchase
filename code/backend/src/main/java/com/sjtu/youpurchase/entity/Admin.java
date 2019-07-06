package com.sjtu.youpurchase.entity;

import lombok.Data;

import javax.persistence.*;

/**
 * 管理员账户对应的实体类
 *
 * @author Chuyuxuan
 */
@Data
@Entity
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "adminId")
    private Long adminId;

    @Column(nullable = false, unique = true, length = 31)
    private String userName;

    @Column(nullable = false, length = 31)
    private String password;

    /* constructor */
    public Admin() {
        this.userName = null;
        this.password = null;
    }

    public Admin(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    /* getter and setter */
    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

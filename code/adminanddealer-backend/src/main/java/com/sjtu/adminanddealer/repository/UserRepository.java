package com.sjtu.adminanddealer.repository;

import com.sjtu.adminanddealer.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User getUserByUserNameAndPassword(String userName, String password);

    User getUserByPhoneAndPasswordAndValidIsTrue(String phone, String password);
}

package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.entity.UserTag;
import org.springframework.data.repository.CrudRepository;

public interface UserTagDao extends CrudRepository<UserTag,String> {
    public UserTag findByUserTagId(long userTagId);
}

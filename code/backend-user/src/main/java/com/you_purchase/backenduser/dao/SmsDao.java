package com.you_purchase.backenduser.dao;

import com.you_purchase.backenduser.Sms.Message;
import org.springframework.data.repository.CrudRepository;

public interface SmsDao extends CrudRepository<Message,String > {
    public Message findByMessageId(long messageId);
}

package com.example.concurency;

import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.Optional;

@Transactional
public interface ItemRepostory extends CrudRepository<Item, Long> {

    @Override
    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    Optional<Item> findById(Long aLong);

    @Override
    @Lock(value = LockModeType.PESSIMISTIC_WRITE)
    <S extends Item> S save(S s);
}

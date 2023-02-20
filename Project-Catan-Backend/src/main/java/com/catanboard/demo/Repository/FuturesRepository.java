package com.catanboard.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.catanboard.demo.POJO.Futures;

public interface FuturesRepository extends CrudRepository<Futures, Long>{

    @Query(value = "SELECT * FROM FUTURES WHERE acceptor_id = :Id and status != -100",
    nativeQuery = true)
    List<Futures> findByAcceptorId(@Param("Id") String Id);


    @Query(value = "SELECT * FROM FUTURES WHERE initiator_id = :Id and status != -100",
    nativeQuery = true)
    List<Futures> findByInitiatorId(@Param("Id") String Id);

    
    @Query(value = "SELECT * FROM FUTURES WHERE acceptor_id = :Id and status = :Status",
    nativeQuery = true)
    List<Futures> findByAcceptorIdAndStatus(@Param("Id") String Id, @Param("Status") int Status);
}
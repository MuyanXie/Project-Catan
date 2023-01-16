package com.catanboard.demo.Repository;

import org.springframework.data.repository.CrudRepository;

import com.catanboard.demo.POJO.PostedTrade;

public interface DemoRepository extends CrudRepository<PostedTrade, Long>{

}
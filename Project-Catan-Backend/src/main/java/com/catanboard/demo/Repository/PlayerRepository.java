package com.catanboard.demo.Repository;

import org.springframework.data.repository.CrudRepository;

import com.catanboard.demo.POJO.Player;

public interface PlayerRepository extends CrudRepository<Player, Long>{
    
}

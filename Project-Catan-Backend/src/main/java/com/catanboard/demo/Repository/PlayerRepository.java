package com.catanboard.demo.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.catanboard.demo.POJO.Player;

public interface PlayerRepository extends CrudRepository<Player, Long>{
    Player findByName(String name);
    
    @Query(value = "SELECT COUNT(*) FROM player WHERE name = 'ADMIN'",
    nativeQuery = true)
    int findAdminNumber();
}

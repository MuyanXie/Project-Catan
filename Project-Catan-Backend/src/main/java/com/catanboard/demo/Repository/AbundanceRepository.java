package com.catanboard.demo.Repository;

import java.util.List;


import org.springframework.data.repository.CrudRepository;

import com.catanboard.demo.POJO.Abundance;

public interface AbundanceRepository extends CrudRepository<Abundance, Long>{

    List<Abundance> findByPlayerId(Long playerId);
}

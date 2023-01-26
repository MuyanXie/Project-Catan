package com.catanboard.demo.Service;

import java.util.List;

import com.catanboard.demo.POJO.Abundance;

public interface AbundanceService {

    Abundance getAbundance(Long abundanceId);
    List<Abundance> getAllAbundances();
    List<Abundance> getPlayerAbundances(long playerId);
    Abundance saveAbundance(long playerId, Abundance abundance);
    void deleteAbundance(long abundanceId);
}

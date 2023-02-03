package com.catanboard.demo.Service;

import java.util.List;

import com.catanboard.demo.POJO.Abundance;

public interface AbundanceService {

    Abundance getAbundance(Long abundanceId);
    List<Abundance> getAllAbundances();
    List<Abundance> getPlayerAbundances(Long playerId);
    Abundance saveAbundance(Long playerId, Abundance abundance);
    void deleteAbundance(Long abundanceId);
}

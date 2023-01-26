package com.catanboard.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.catanboard.demo.Exceptions.AbundanceNotFoundException;
import com.catanboard.demo.POJO.Abundance;
import com.catanboard.demo.POJO.Player;
import com.catanboard.demo.Repository.AbundanceRepository;
import com.catanboard.demo.Repository.PlayerRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class AbundanceServiceImpl implements AbundanceService{
    
    AbundanceRepository abundanceRepository;
    PlayerRepository playerRepository;

    @Override
    public Abundance getAbundance(Long abundanceId) {
        Optional<Abundance> abundance = abundanceRepository.findById(abundanceId);
        return unwrapAbundance(abundance, abundanceId);
    }

    @Override
    public List<Abundance> getAllAbundances() {
        return (List<Abundance>)abundanceRepository.findAll();
    }

    @Override
    public List<Abundance> getPlayerAbundances(long playerId) {
        return (List<Abundance>)abundanceRepository.findByPlayerId(playerId);
    }

    @Override
    public Abundance saveAbundance(long playerId, Abundance abundance) {
        Player player = PlayerServiceImpl.unwrapPlayer(playerRepository.findById(playerId), playerId);
        abundance.setPlayer(player);
        return abundanceRepository.save(abundance);
    }

    @Override
    public void deleteAbundance(long abundanceId) {
        abundanceRepository.deleteById(abundanceId);
    }

    static Abundance unwrapAbundance(Optional<Abundance> entity, Long id){
        if (entity.isPresent()) return entity.get();
        else throw new AbundanceNotFoundException(id);
    }
}

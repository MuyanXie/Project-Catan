package com.catanboard.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.catanboard.demo.Exceptions.PlayerNotFoundException;
import com.catanboard.demo.POJO.Player;
import com.catanboard.demo.Repository.PlayerRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class PlayerServiceImpl implements PlayerService{
    PlayerRepository playerRepository;

    @Override
    public Player getPlayer(Long id) {
        Optional<Player> player = playerRepository.findById(id);
        return unwrapPlayer(player, id);
    }

    @Override
    public Player savePlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }

    @Override
    public List<Player> getPlayers() {
        return (List<Player>)playerRepository.findAll();
    }

    static Player unwrapPlayer(Optional<Player> entity, Long id){
        if (entity.isPresent()) return entity.get();
        else throw new PlayerNotFoundException(id);
    }
}

package com.catanboard.demo.Service;

import java.util.List;

import com.catanboard.demo.POJO.Player;

public interface PlayerService {
    Player getPlayer(Long id);
    Player savePlayer(Player player);
    void deletePlayer(Long id);
    List<Player> getPlayers();
}

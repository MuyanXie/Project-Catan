package com.catanboard.demo.Service;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.catanboard.demo.POJO.Player;

public interface PlayerService {
    Player getPlayer(Long id);
    Player savePlayer(Player player);
    void deletePlayer(Long id);
    List<Player> getPlayers();

    HttpStatus changeTurn(String code, int turn);   

    HttpStatus signin(String name, String code);
    
    int findAdminNumber();

    Player getPlayerByName(String name);

    int getTurn();
}

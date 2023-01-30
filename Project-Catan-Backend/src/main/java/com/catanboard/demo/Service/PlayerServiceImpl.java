package com.catanboard.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.catanboard.demo.Exceptions.PlayerNotFoundException;
import com.catanboard.demo.POJO.Futures;
import com.catanboard.demo.POJO.Player;
import com.catanboard.demo.Repository.FuturesRepository;
import com.catanboard.demo.Repository.PlayerRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class PlayerServiceImpl implements PlayerService{
    
    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    FuturesRepository futuresRepository;

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

    @Override
    public HttpStatus changeTurn(String code, int turn) {
        if(code.equals(playerRepository.findByName("ADMIN").getCode())){
            for(Futures cur :futuresRepository.findAll()){
                if(cur.getActiveTurn() == turn){
                    cur.setStatus(1);
                }
                else if(cur.getActiveTurn() > turn){
                    cur.setStatus(-100);
                }
                futuresRepository.save(cur);
            }
            return HttpStatus.ACCEPTED;
        }
        return HttpStatus.UNAUTHORIZED;
    }

    @Override
    public HttpStatus signin(String name, String code) {
        try{
            if(code.equals(playerRepository.findByName(name).getCode())){
            return HttpStatus.ACCEPTED;
            }
            return HttpStatus.FORBIDDEN;
        }
        catch(Exception e){
            return HttpStatus.FORBIDDEN;
        }
    }

    @Override
    public Player getPlayerByName(String name) {
        // TODO Auto-generated method stub
        return playerRepository.findByName(name);
    }

    @Override
    public int findAdminNumber() {
        return playerRepository.findAdminNumber();
    }
}

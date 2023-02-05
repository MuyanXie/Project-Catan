package com.catanboard.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catanboard.demo.POJO.Abundance;
import com.catanboard.demo.POJO.Futures;
import com.catanboard.demo.POJO.Player;

import com.catanboard.demo.Service.AbundanceService;
import com.catanboard.demo.Service.FuturesService;
import com.catanboard.demo.Service.PlayerService;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.PutMapping;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.HashMap;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @Autowired
    AbundanceService abundanceService;

    @Autowired
    FuturesService futuresService;

    @GetMapping(value="/{id}")
    public ResponseEntity<Player> getPlayer(@PathVariable Long id) {
        return new ResponseEntity<>(playerService.getPlayer(id), HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<HttpStatus> deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping
    public ResponseEntity<Player> savePlayer(@RequestBody Player player) {
        if (player.getName().equals("ADMIN") && playerService.findAdminNumber() >= 1){
            return new ResponseEntity<>(player,  HttpStatus.CONFLICT);
        }
        if(playerService.getPlayerByName(player.getName()) == null){
            return new ResponseEntity<>(playerService.savePlayer(player),  HttpStatus.CREATED);
        }
        return new ResponseEntity<>(player,  HttpStatus.CONFLICT);
    }

    @GetMapping(value="/{name}/{code}/signin")
    public ResponseEntity<Player> signin(@PathVariable String name, @PathVariable String code) {
        return new ResponseEntity<>( playerService.getPlayerByName(name), playerService.signin(name, code));
    }

    @GetMapping(value="/all")
    public ResponseEntity<List<Player>> getPlayers() {
        return new ResponseEntity<>(playerService.getPlayers(), HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/abundances")
    public ResponseEntity<List<Abundance>> getPlayerAbundances(@PathVariable Long id) {
        return new ResponseEntity<>(abundanceService.getPlayerAbundances(id), HttpStatus.OK);
    }

    @PostMapping(value = "/{playerid}/abundances/{code}")
    public ResponseEntity<Abundance> saveAbundance(@RequestBody Abundance abundance, @PathVariable Long playerid, @PathVariable String code) {
        if(playerService.getPlayer(playerid).getCode().equals(code)){
            for(Abundance i: abundanceService.getPlayerAbundances(playerid)){
                if(i.getStuff().equals(abundance.getStuff())){
                    return new ResponseEntity<>(abundance, HttpStatus.CONFLICT);
                }
            }
            return new ResponseEntity<>(abundanceService.saveAbundance(playerid, abundance),  HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(abundance, HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping(value = "/{playerid}/abundances/{abundanceId}")
    public ResponseEntity<HttpStatus> deleteAbundance(@PathVariable Long abundanceId) {
        abundanceService.deleteAbundance(abundanceId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping(value = "/{playerid}/abundances/{abundanceId}")
    public ResponseEntity<List<Abundance>> getAbundance(@PathVariable Long abundanceId) {
        return new ResponseEntity<>(abundanceService.getPlayerAbundances(abundanceId), HttpStatus.OK);
    }

    @PostMapping(value="/{playerid}/futures/{code}")
    public ResponseEntity<Futures> saveFutue(@RequestBody Futures futures, @PathVariable Long playerid, @PathVariable String code) {
        if(playerService.getPlayer(playerid).getCode().equals(code)){
        return new ResponseEntity<>(futuresService.saveFuture(futures),  HttpStatus.CREATED);
        }
        return new ResponseEntity<>(futures, HttpStatus.UNAUTHORIZED);
    }
    
    @GetMapping(value="/{playerid}/futures/all")
    public ResponseEntity<List<Futures>> getPlayerFutures(@PathVariable String playerid) {
        return new ResponseEntity<>(futuresService.getPlayerFutures(playerid), HttpStatus.OK);
    }
    
    @GetMapping(value="/{playerid}/futures/{futureid}")
    public ResponseEntity<Futures> getFuture(@PathVariable Long futureid) {
        return new ResponseEntity<>(futuresService.getFuture(futureid), HttpStatus.OK);
    }
    
    @DeleteMapping(value = "/{playerid}/futures/{futureid}")
    public ResponseEntity<HttpStatus> deleteFuture(@PathVariable Long futureid) {
        futuresService.deleteFuture(futureid);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping(value="/{playerid}/futures/{futureid}/updateFA")
    public ResponseEntity<Futures> updateFutureAcceptor(@RequestBody Futures future, @PathVariable Long futureId) {
        return new ResponseEntity<>(futuresService.updateFutureAcceptor(futureId, future.getAcceptorId()), HttpStatus.OK);
    }
    
    @PutMapping(value="/{playerid}/futures/{futureid}/updateFI")
    public ResponseEntity<Futures> updateFutureInitiator(@RequestBody Futures future, @PathVariable Long futureId) {
        return new ResponseEntity<>(futuresService.updateFutureInitiator(futureId, future.getInitiatorId()), HttpStatus.OK);
    }

    @PutMapping(value="/{playerid}/futures/{futureid}/updateFAI")
    public ResponseEntity<Futures> updateFutureAcceptorItems(@RequestBody Futures future, @PathVariable Long futureId) {
        return new ResponseEntity<>(futuresService.updateFutureAcceptorItems(futureId, future.getAcceptorItems()), HttpStatus.OK);
    }

    @PutMapping(value="/{playerid}/futures/{futureid}/updateFII")
    public ResponseEntity<Futures> updateFutureInitiatorItems(@RequestBody Futures future, @PathVariable Long futureId) {
        return new ResponseEntity<>(futuresService.updateFutureInitiatorItems(futureId, future.getInitiatorItems()), HttpStatus.OK);
    }

    @PutMapping(value="/{playerid}/futures/{futureid}/updateFAC")
    public ResponseEntity<Futures> updateFutureAcceptorCollateral(@RequestBody Futures future, @PathVariable Long futureId) {
        return new ResponseEntity<>(futuresService.updateFutureAcceptorCollateral(futureId, future.getAcceptorCollateral()), HttpStatus.OK);
    }

    @PutMapping(value="/{playerid}/futures/{futureid}/updateFIC")
    public ResponseEntity<Futures> updateFutureInitiatorCollateral(@RequestBody Futures future, @PathVariable Long futureId) {
        return new ResponseEntity<>(futuresService.updateFutureInitiatorCollateral(futureId, future.getInitiatorCollateral()), HttpStatus.OK);
    }

    @PutMapping(value="/{playerid}/futures/{futureId}/updateSTATUS/{authorizationCode}")
    public ResponseEntity<Futures> updateFutureStatus(@RequestBody Futures future, @PathVariable Long futureId, @PathVariable String authorizationCode) {
        Futures returned = futuresService.updateFutureStatus(futureId, future.getStatus(), authorizationCode);
        if(returned.getStatus() == future.getStatus()){
            return new ResponseEntity<>(returned , HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(returned, HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping(value = "/changeTURN/{code}/{turn}")
    public ResponseEntity<HttpStatus> updateTurn(@PathVariable String code, @PathVariable int turn){
        return new ResponseEntity<>(playerService.changeTurn(code,turn));
    }

    @GetMapping(value = "/turn")
    public ResponseEntity<Object> getTurn(){
        return new ResponseEntity<>(playerService.getTurn(),HttpStatus.OK);
    }

    @GetMapping(value = "/version")
    public ResponseEntity<Object> getVersion(){
        Map<String, String> versionMap = new HashMap<>();
        try {
          File pomFile = new File("pom.xml");
          DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
          DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
          Document doc = dBuilder.parse(pomFile);
          doc.getDocumentElement().normalize();
          NodeList nodes = doc.getElementsByTagName("project");
          for (int i = 0; i < nodes.getLength(); i++) {
            Node node = nodes.item(i);
            NodeList children = node.getChildNodes();
            for (int j = 0; j < children.getLength(); j++) {
              Node child = children.item(j);
              if (child.getNodeName().equals("version")) {
                versionMap.put("version", child.getTextContent());
                break;
              }
            }
          }
        } catch (Exception e) {
          versionMap.put("error", "Failed to read version information from pom.xml");
        }
        return new ResponseEntity<>(versionMap, HttpStatus.OK);
    }
}

package com.catanboard.demo.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catanboard.demo.POJO.Futures;
import com.catanboard.demo.Service.FuturesService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/futures")
public class FuturesController {
    @Autowired
    FuturesService futuresService;

    @GetMapping(value="/all")
    public ResponseEntity<List<Futures>> getAllFutures() {
        return new ResponseEntity<>(futuresService.getAllFutures(), HttpStatus.OK);
    }
    
}

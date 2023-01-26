package com.catanboard.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.catanboard.demo.POJO.Abundance;
import com.catanboard.demo.Service.AbundanceService;

import lombok.AllArgsConstructor;


@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
@RestController
@RequestMapping("/abundances")
public class AbundanceController {
    @Autowired
    AbundanceService abundanceService;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Abundance>> getAllAbundances() {
        return new ResponseEntity<>(abundanceService.getAllAbundances(), HttpStatus.OK);
    }

}

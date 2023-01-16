package com.catanboard.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.catanboard.demo.POJO.Futures;
import com.catanboard.demo.Repository.FuturesRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class FuturesServiceImpl implements FuturesService{

    @Autowired
    FuturesRepository futuresRepository;

    @Override
    public Futures getFuture(Long id) {
        Optional<Futures> future = futuresRepository.findById(id);
        return null;
    }
    
}

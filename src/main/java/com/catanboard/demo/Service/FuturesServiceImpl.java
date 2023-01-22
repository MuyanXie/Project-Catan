package com.catanboard.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.catanboard.demo.Exceptions.FutureNotFoundException;
import com.catanboard.demo.POJO.Futures;
import com.catanboard.demo.Repository.FuturesRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class FuturesServiceImpl implements FuturesService{

    @Autowired
    FuturesRepository futuresRepository;

    @Override
    public Futures getFuture(Long futureid) {
        Optional<Futures> future = futuresRepository.findById(futureid);
        return unwrapFuture(future, futureid);
    }

    @Override
    public Futures saveFuture(Futures future) {
        return futuresRepository.save(future);
    }

    @Override
    public void deleteFuture(Long id) {
        futuresRepository.deleteById(id);  
    }

    @Override
    public List<Futures> getFutures() {
        return (List<Futures>)futuresRepository.findAll();
    }

    static Futures unwrapFuture(Optional<Futures> entity, Long id) {
        if (entity.isPresent()) return entity.get();
        else throw new FutureNotFoundException(id);
    }

}

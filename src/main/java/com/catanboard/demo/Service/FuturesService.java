package com.catanboard.demo.Service;

import java.util.List;

import com.catanboard.demo.POJO.Futures;

public interface FuturesService{
    Futures getFuture(Long id);
    Futures saveFuture(Futures future);
    void deleteFuture(Long id);
    List<Futures> getFutures();

}
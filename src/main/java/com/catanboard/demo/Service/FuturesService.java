package com.catanboard.demo.Service;

import java.util.List;
import java.util.concurrent.Future;

import com.catanboard.demo.POJO.Futures;

public interface FuturesService{
    Futures getFuture(Long id);
    Futures saveFuture(Futures future);
    void deleteFuture(Long id);
    Future updateFuture();
    List<Futures> getFutures();

}
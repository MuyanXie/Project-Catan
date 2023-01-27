package com.catanboard.demo.Service;

import java.util.List;

import com.catanboard.demo.POJO.Futures;

public interface FuturesService{

    Futures getFuture(Long futureId);    
    List<Futures> getAllFutures();

    List<Futures> getPlayerFutures(String player_id);

    Futures saveFuture(Futures future);

    void deleteFuture(Long id);

    Futures updateFutureAcceptor(Long futureId, String acceptorId);
    Futures updateFutureInitiator(Long futureId, String initiatorId);

    Futures updateFutureAcceptorItems(Long futureId, String acceptorItems);
    Futures updateFutureInitiatorItems(Long futureId, String initiatorItems);

    Futures updateFutureAcceptorCollateral(Long futureId, String acceptorCollateral);
    Futures updateFutureInitiatorCollateral(Long futureId, String initiatorCollateral);

    Futures updateFutureStatus(Long futureId, int status, String code);

}
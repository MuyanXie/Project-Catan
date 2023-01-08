package com.catanboard.demo.POJO;

import java.util.Hashtable;
import java.util.UUID;

public class PostedTrade {
    
    /*Futures, Forwards, Swaps, and Options */

    private String initiator;
    private String acceptor;
    private Hashtable<String, Integer> initiator_provided_item_list;
    private Hashtable<String, Integer> acceptor_provided_item_list;
    private int number_of_rounds;
    private int number_of_rounds_left;
    private boolean trade_status;
    private String trade_type;
    private String id;


    public PostedTrade() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId(){
        return this.id;
    }

    public String getInitiator() {
        return this.initiator;
    }

    public void setInitiator(String Initiator) {
        this.initiator = Initiator;
    }

    public String getAcceptor() {
        return this.acceptor;
    }

    public void setAcceptor(String Acceptor) {
        this.acceptor = Acceptor;
    }

    public Hashtable<String,Integer> getInitiator_provided_item_list() {
        return this.initiator_provided_item_list;
    }

    public void setInitiator_provided_item_list(Hashtable<String,Integer> Initiator_provided_item_list) {
        this.initiator_provided_item_list = Initiator_provided_item_list;
    }

    public Hashtable<String,Integer> getAcceptor_provided_item_list() {
        return this.acceptor_provided_item_list;
    }

    public void setAcceptor_provided_item_list(Hashtable<String,Integer> Acceptor_provided_item_list) {
        this.acceptor_provided_item_list = Acceptor_provided_item_list;
    }

    public int getNumber_of_rounds() {
        return this.number_of_rounds;
    }

    public void setNumber_of_rounds(int number_of_rounds) {
        this.number_of_rounds = number_of_rounds;
    }

    public int getNumber_of_rounds_left() {
        return this.number_of_rounds_left;
    }

    public void setNumber_of_rounds_left(int number_of_rounds_left) {
        this.number_of_rounds_left = number_of_rounds_left;
    }

    public boolean isTrade_status() {
        return this.trade_status;
    }

    public boolean getTrade_status() {
        return this.trade_status;
    }

    public void setTrade_status(boolean trade_status) {
        this.trade_status = trade_status;
    }

    public String getTrade_type() {
        return this.trade_type;
    }

    public void setTrade_type(String trade_type) {
        this.trade_type = trade_type;
    }




}

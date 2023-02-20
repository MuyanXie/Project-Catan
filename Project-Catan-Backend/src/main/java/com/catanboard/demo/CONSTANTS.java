package com.catanboard.demo;

public class CONSTANTS {
    public int contract_NOT_AUTHORIZED = -1;
    public int contract_READY = 0;
    public int contract_DUE = 1;
    public int contract_EXPIRE = -100;


    public int getContract_NOT_AUTHORIZED() {
        return this.contract_NOT_AUTHORIZED;
    }

    public void setContract_NOT_AUTHORIZED(int contract_NOT_AUTHORIZED) {
        this.contract_NOT_AUTHORIZED = contract_NOT_AUTHORIZED;
    }

    public int getContract_READY() {
        return this.contract_READY;
    }

    public void setContract_READY(int contract_READY) {
        this.contract_READY = contract_READY;
    }

    public int getContract_DUE() {
        return this.contract_DUE;
    }

    public void setContract_DUE(int contract_DUE) {
        this.contract_DUE = contract_DUE;
    }

    public int getContract_EXPIRE() {
        return this.contract_EXPIRE;
    }

    public void setContract_EXPIRE(int contract_EXPIRE) {
        this.contract_EXPIRE = contract_EXPIRE;
    }

}

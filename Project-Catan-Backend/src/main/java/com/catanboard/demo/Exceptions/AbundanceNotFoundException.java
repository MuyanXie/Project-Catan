package com.catanboard.demo.Exceptions;

public class AbundanceNotFoundException extends RuntimeException{
    public AbundanceNotFoundException(long id){
        super("The Abundance id '" + id + "' does not exist in our records");
    }
}

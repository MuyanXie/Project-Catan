package com.catanboard.demo.Exceptions;

public class OptionNotFoundException extends RuntimeException {
    public OptionNotFoundException(long id){
        super("The Option id '" + id + "' does not exist in our records");
    }
}

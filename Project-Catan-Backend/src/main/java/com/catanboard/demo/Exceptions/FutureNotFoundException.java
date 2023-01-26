package com.catanboard.demo.Exceptions;

public class FutureNotFoundException extends RuntimeException{
    public FutureNotFoundException(Long id) {
        super("The future id '" + id + "' does not exist in our records");
    }
}

package com.cesar.agendatel.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cesar.agendatel.exception.RecordAlreadyExistException;
import com.cesar.agendatel.exception.RecordNotFoundException;

@RestControllerAdvice
public class ApplicationControllerAdvice {
    
    @ExceptionHandler(RecordNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFoundException(RecordNotFoundException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(RecordAlreadyExistException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String handleAlreadyExistException(RecordAlreadyExistException ex){
        return ex.getMessage();
    }

}

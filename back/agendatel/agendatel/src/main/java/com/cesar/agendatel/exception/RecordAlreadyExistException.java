package com.cesar.agendatel.exception;

public class RecordAlreadyExistException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public RecordAlreadyExistException(String mobile){
        super("O telefone informado já existe. " + mobile);
    }
    
    
}

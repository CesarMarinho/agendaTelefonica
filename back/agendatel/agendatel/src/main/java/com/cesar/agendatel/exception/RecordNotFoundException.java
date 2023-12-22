package com.cesar.agendatel.exception;

public class RecordNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public RecordNotFoundException(Long id){
        super("Nenhum registro foi encontrado para o id: " + id);
    }
    
}

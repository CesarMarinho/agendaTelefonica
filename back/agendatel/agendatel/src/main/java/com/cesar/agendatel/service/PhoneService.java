package com.cesar.agendatel.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.cesar.agendatel.exception.RecordAlreadyExistException;
import com.cesar.agendatel.exception.RecordNotFoundException;
import com.cesar.agendatel.model.Phone;
import com.cesar.agendatel.repository.PhoneRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class PhoneService{

    private final PhoneRepository phoneRepository; 

    public PhoneService(PhoneRepository phoneRepository){
        this.phoneRepository = phoneRepository;
    }

    public List<Phone> list(){
        return phoneRepository.findAll();
    }

    public Phone findById(@PathVariable @NotNull @Positive Long id){
        return phoneRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public Phone create(@Valid Phone phone){  

        if(phoneRepository.findByMobile(phone.getMobile()) == null){
            return phoneRepository.save(phone);
        }else{
            throw new RecordAlreadyExistException(phone.getMobile());
        }
    }

    public Phone update(@Valid @Positive Long id, Phone phone){

        return phoneRepository.findById(id)
            .map(phoneFound ->{
                phoneFound.setName(phone.getName());
                phoneFound.setMobile(phone.getMobile());
                phoneFound.setNphone(phone.getNphone());
                phoneFound.setEmail(phone.getEmail());

                return phoneRepository.save(phoneFound);                
            }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public Phone favorite(@Valid @Positive Long id){

        return phoneRepository.findById(id)
            .map(phoneFound ->{
                phoneFound.setIsFavorite(!phoneFound.getIsFavorite());

                return phoneRepository.save(phoneFound);                
            }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@PathVariable @Positive Long id){

        phoneRepository.delete(phoneRepository.findById(id)
        .orElseThrow(() -> new RecordNotFoundException(id)));

    }

}
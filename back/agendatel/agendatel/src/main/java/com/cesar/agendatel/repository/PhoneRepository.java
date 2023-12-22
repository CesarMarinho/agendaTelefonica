package com.cesar.agendatel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cesar.agendatel.model.Phone;


@Repository
public interface PhoneRepository extends JpaRepository<Phone, Long> {
    
    Phone findByMobile(String mobile);

    
}

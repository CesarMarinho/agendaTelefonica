package com.cesar.agendatel.controller;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cesar.agendatel.model.Phone;
import com.cesar.agendatel.repository.PhoneRepository;
import com.cesar.agendatel.service.PhoneService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@RestController
@RequestMapping("/api/phones")
@Configuration
public class PhonesController {

    private final PhoneService phoneService;

    public PhonesController(PhoneService phoneService) {
        this.phoneService = phoneService;
    }

    @GetMapping
    public @ResponseBody List<Phone> list(){
        return phoneService.list();
    }

    @GetMapping("/{id}")
    public Phone findById(@PathVariable @NotNull @Positive Long id){
        return phoneService.findById(id); 
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Phone create(@RequestBody @Valid Phone phone){        
        return phoneService.create(phone);
    }

    @PutMapping("/favorite/{id}")
    public Phone update(@PathVariable @Valid @Positive Long id){
        return phoneService.favorite(id); 
    }

    @PutMapping("/{id}")
    public Phone update(@PathVariable @Valid @Positive Long id, @RequestBody Phone phone){
        return phoneService.update(id, phone); 
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @Positive Long id){
        phoneService.delete(id);
    }
    
    // @Bean
    // CommandLineRunner initDatabase(PhoneRepository phoneRepository){
    //     return args -> {
    //         phoneRepository.deleteAll();

    //         Phone p = new Phone();
    //         p.setName("Cesar");
    //         p.setMobile("81 98571-0906");
    //         p.setIsFavorite(true);
    //         p.setEmail("cesarmarmun@gmail.com");
    //         p.setIsActive(true);

    //         phoneRepository.save(p);
    //     };
    // }
}

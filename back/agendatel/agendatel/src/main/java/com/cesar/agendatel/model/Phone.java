package com.cesar.agendatel.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
@SQLDelete(sql = "UPDATE Phone SET is_active = false WHERE id = ?")
@Where(clause = "is_active = true")
public class Phone {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @JsonProperty("_id")
    private Long id;

    @NotBlank
    @NotNull
    @Size(min = 2, max = 50)
    @Column(length = 100 , nullable = false)
    private String name;

    @NotNull
    @NotBlank
    @Size(max = 30)
    @Column(length = 30)
    private String mobile;

    @Column(length = 30)
    private String nphone;

    @Column(length = 50)
    private String email;

    @NotNull
    @Column(nullable = false)
    private boolean isFavorite = false;

    @NotNull
    @Column(nullable = false)
    private boolean isActive = true;

    public String getName(){
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String nMobile) {
        this.mobile = nMobile;
    }

    public String getNphone() {
        return nphone;
    }

    public void setNphone(String nPhone) {
        this.nphone = nPhone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getIsFavorite() {
        return isFavorite;
    }

    public void setIsFavorite(boolean isFavorite) {
        this.isFavorite = isFavorite;
    }

    public boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
    
}

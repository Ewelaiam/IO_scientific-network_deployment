package com.example.network.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String username;
    private String surname;
    private Date birth_date;

    @OneToOne
    private Role role;

    private String degree;
    private LocalDate created_at;

    @ManyToMany
    private Set<Interest> interests = new HashSet<>();

    public void deleteInterest(Interest interest) {
        this.interests.remove(interest);
    }
}

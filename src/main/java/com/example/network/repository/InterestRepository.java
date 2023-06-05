package com.example.network.repository;

import com.example.network.model.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Interest> {
    Interest findInterestsByName(String name);
}

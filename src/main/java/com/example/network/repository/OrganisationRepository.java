package com.example.network.repository;

import com.example.network.model.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganisationRepository extends JpaRepository<Organisation, Long> {
    Organisation findByNameAndMailTemplate(String name, String mailTemplate);

}

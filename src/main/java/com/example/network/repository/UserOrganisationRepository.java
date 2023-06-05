package com.example.network.repository;

import com.example.network.model.Organisation;
import com.example.network.model.User;
import com.example.network.model.UserOrganisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserOrganisationRepository extends JpaRepository<UserOrganisation, Long> {
    List<UserOrganisation> findAllByUserId(Long userId);

    List<UserOrganisation> findAllByOrganisationId(Long organisationId);
}

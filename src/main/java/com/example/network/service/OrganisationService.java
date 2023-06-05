package com.example.network.service;

import com.example.network.dto.OrganisationDTO;
import com.example.network.dto.RoleDTO;
import com.example.network.model.Organisation;
import com.example.network.model.User;
import com.example.network.repository.OrganisationRepository;
import com.example.network.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class OrganisationService {

    private final OrganisationRepository organisationRepository;
    private final UserService userService;


    public OrganisationService(OrganisationRepository organisationRepository, UserService userService) {
        this.organisationRepository = organisationRepository;
        this.userService = userService;
    }

    public void registerOrganisation(OrganisationDTO organisationDTO) {
        if(organisationDTO.getMailTemplate() == null || organisationDTO.getName() == null ||
                organisationDTO.getMailTemplate().isEmpty() || organisationDTO.getName().isEmpty()){
            throw new RuntimeException("Empty value exception");
        }

        Organisation organisation = new Organisation();
        organisation.setMailTemplate(organisationDTO.getMailTemplate());
        organisation.setName(organisationDTO.getName());
        organisationRepository.save(organisation);
    }

    public void verifyOrganisation(OrganisationDTO organisationDTO, Long userId) {
        RoleDTO role = userService.getUserRole(userId);

        if (!role.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("You are not an admin");
        }

        Organisation organisation = organisationRepository.findByNameAndMailTemplate(organisationDTO.getName(), organisationDTO.getMailTemplate());
        if (organisation == null) return;
        organisation.setIsVerified(true);
        organisationRepository.save(organisation);
    }

}

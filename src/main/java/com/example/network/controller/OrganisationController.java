package com.example.network.controller;

import com.example.network.dto.OrganisationDTO;
import com.example.network.service.OrganisationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/organisation")
public class OrganisationController {

    private final OrganisationService organisationService;

    public OrganisationController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/uni")
    public void registerOrganisation(@RequestBody OrganisationDTO organisationDTO) {
        organisationService.registerOrganisation(organisationDTO);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/verify")
    public void verifyOrganisation(@RequestBody OrganisationDTO organisationDTO, @RequestParam Long userId) {
        organisationService.verifyOrganisation(organisationDTO, userId);
    }
}

package com.example.network.controller;

import com.example.network.dto.UserProfileDTO;
import com.example.network.model.User;
import com.example.network.model.UserOrganisation;
import com.example.network.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/network")
public class NetworkController {
    private final UserService userService;

    public NetworkController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public List<UserProfileDTO> getAllUserProfilesExceptOne(@PathVariable String id) {
        return userService.getAllUserProfilesExceptOne(Long.valueOf(id));
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/")
    public List<UserProfileDTO> getAllUserProfiles() {
        return userService.getAllUserProfiles();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/connection")
    public List<UserOrganisation> getConnectionBetweenUserAndOrganisation() {
        return userService.getConnectionBetweenUserAndOrganisation();
    }
}

package com.example.network.controller;

import com.example.network.dto.InterestDTO;
import com.example.network.dto.RoleDTO;
import com.example.network.dto.UserEditDTO;
import com.example.network.dto.UserProfileDTO;
import com.example.network.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public UserProfileDTO getProfile(@PathVariable("id") Long id) {
        return userService.getProfile(id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/edit")
    public UserEditDTO getUserDataToEdit(@RequestParam Long id){
        return userService.getUserDataToEdit(id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/edit")
    public void editUser(@RequestBody UserEditDTO userEditDTO, @RequestParam Long id){
        userService.editUser(userEditDTO, id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/user/{id}")
    public UserProfileDTO getUserProfile(@PathVariable("id") Long id) {
        return userService.getProfile(id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}/users")
    public List<UserProfileDTO> getAllFilteredUsers(@PathVariable("id") Long id,
                                                    @RequestParam(required = false) String query,
                                                    @RequestParam(required = false) Long organisation){
        return userService.getAllFilteredUsers(id, query, organisation);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/role/{id}")
    public RoleDTO getRole(@PathVariable("id") Long id){
        return userService.getUserRole(id);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/interests/{id}")
    public List<InterestDTO> getInterests(@PathVariable("id") Long id){
        return userService.getUserInterests(id);
    }

}

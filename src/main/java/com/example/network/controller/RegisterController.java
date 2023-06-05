package com.example.network.controller;

import com.example.network.dto.UserEditDTO;
import com.example.network.dto.UserLoginDTO;
import com.example.network.model.User;
import com.example.network.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public String registerUser(@RequestBody UserLoginDTO userDTO, RedirectAttributes redirectAttributes) {

        try {
            userService.registerNewUserAccount(userDTO);
        } catch (Exception uaeEx) {
            return uaeEx.toString();
        }

        redirectAttributes.addFlashAttribute("message", "You have been registered successfully!");
        return "redirect:/login";
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public Long loginUser(@RequestBody UserLoginDTO userDTO, RedirectAttributes redirectAttributes) {
        Long id = -1L;
        try {
            id = userService.loginUser(userDTO);
        } catch (Exception uaeEx) {
            System.out.println(uaeEx);
        }

        redirectAttributes.addFlashAttribute("message", "You have been logged in successfully!");
        return id;
    }
}


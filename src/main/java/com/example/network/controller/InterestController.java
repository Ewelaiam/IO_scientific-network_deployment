package com.example.network.controller;

import com.example.network.dto.InterestDTO;
import com.example.network.service.InterestService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interest")
public class InterestController {
    private final InterestService interestService;

    public InterestController(InterestService interestService) {
        this.interestService = interestService;
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/add/{id}")
    public void addInterest(@PathVariable String id, @RequestBody InterestDTO interestDTO) {
        interestService.addInterest(Long.valueOf(id), interestDTO);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/delete/{id}")
    public void deleteInterest(@PathVariable String id, @RequestBody InterestDTO interestDTO) {
        interestService.deleteInterest(Long.valueOf(id), interestDTO);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/uni")
    public void registerInterest(@RequestBody InterestDTO interestDTO) {
        interestService.registerInterest(interestDTO);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/verify")
    public void verifyInterest(@RequestBody InterestDTO interestDTO, @RequestParam Long userId) {
        interestService.verifyInterest(interestDTO, userId);
    }
}

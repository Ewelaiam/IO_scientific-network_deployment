package com.example.network.service;

import com.example.network.dto.InterestDTO;
import com.example.network.dto.RoleDTO;
import com.example.network.model.Interest;
import com.example.network.model.User;
import com.example.network.repository.InterestRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class InterestService {
    private final InterestRepository interestRepository;
    private final UserService userService;

    public InterestService(InterestRepository interestRepository, UserService userService) {
        this.interestRepository = interestRepository;
        this.userService = userService;
    }

    public void addInterest(Long userId, InterestDTO interestDTO) {
        Interest interest = interestRepository.findInterestsByName(interestDTO.getName());
        if (interest == null) {
            interest = createNewInterest(new InterestDTO(interestDTO.getName()));
        }
        userService.addInterest(userId, interest);
    }

    public void deleteInterest(Long userId, InterestDTO interestDTO) {
        Interest interest = interestRepository.findInterestsByName(interestDTO.getName());
        userService.deleteInterest(userId, interest);
    }

    public void registerInterest(InterestDTO interestDTO) {
        if (interestRepository.findInterestsByName(interestDTO.getName()) != null) {
            System.out.println("This interest already exists");
        } else {
            createNewInterest(interestDTO);
        }
    }

    public void verifyInterest(InterestDTO interestDTO, Long userId) {
        RoleDTO role = userService.getUserRole(userId);

        if (!role.getRole().equals("ROLE_ADMIN")) {
            throw new RuntimeException("You are not an admin");
        }
        Interest interest = interestRepository.findInterestsByName(interestDTO.getName());
        if (interest == null) return;
        interest.setIsVerified(true);
        interestRepository.save(interest);
    }

    private Interest createNewInterest(InterestDTO interestDTO) {
        Interest interest = new Interest();
        interest.setName(interestDTO.getName());
        interest.setIsVerified(false);
        interestRepository.save(interest);
        return interest;
    }
}

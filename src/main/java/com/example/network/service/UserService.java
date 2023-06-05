package com.example.network.service;

import com.example.network.dto.*;
import com.example.network.model.Interest;
import com.example.network.model.Organisation;
import com.example.network.model.User;
import com.example.network.model.UserOrganisation;
import com.example.network.repository.OrganisationRepository;
import com.example.network.repository.UserOrganisationRepository;
import com.example.network.repository.UserRepository;
import org.springframework.stereotype.Service;

import static org.apache.commons.lang3.StringUtils.containsIgnoreCase;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserOrganisationRepository userOrganisationRepository;
    private final OrganisationRepository organisationRepository;

    public UserService(UserRepository userRepository, UserOrganisationRepository userOrganisationRepository, OrganisationRepository organisationRepository) {
        this.userRepository = userRepository;
        this.userOrganisationRepository = userOrganisationRepository;
        this.organisationRepository = organisationRepository;
    }

    public UserProfileDTO getProfile(Long id) {
        User profile = userRepository.findById(id).orElseThrow();

        List<Organisation> organisations = userOrganisationRepository.findAllByUserId(id)
                .stream()
                .map(UserOrganisation::getOrganisation)
                .collect(Collectors.toList());


        return UserProfileDTO.builder()
                .userId(profile.getId())
                .email(profile.getEmail())
                .name(profile.getUsername())
                .surname(profile.getSurname())
                .organisations(organisations)
                .build();
    }

    public UserEditDTO getUserDataToEdit(Long id){
        User profile = userRepository.findById(id).orElseThrow();

        UserEditDTO userEditDTO = UserEditDTO.builder()
                .email(profile.getEmail())
                .name(profile.getUsername())
                .surname(profile.getSurname())
                .build();

        return userEditDTO;
    }

    public void editUser(UserEditDTO userEditDTO, Long id){
        User user = userRepository.findById(id).orElseThrow();
        if (userEditDTO.getEmail() != null){
            user.setEmail(userEditDTO.getEmail());
        }
        if(userEditDTO.getName() != null){
            user.setUsername(userEditDTO.getName());
        }
        if(userEditDTO.getSurname() != null){
            user.setSurname(userEditDTO.getSurname());
        }
        userRepository.save(user);
    }

    public List<UserProfileDTO> getAllUserProfilesExceptOne(Long id) {
        return userRepository.findAll()
                .stream()
                .filter(user -> !Objects.equals(user.getId(), id))
                .map(user -> getProfile(user.getId()))
                .collect(Collectors.toList());
    }

    public List<UserProfileDTO> getAllUserProfiles() {
        return userRepository.findAll()
                .stream()
                .map(user -> getProfile(user.getId()))
                .collect(Collectors.toList());
    }

    public void registerNewUserAccount(UserLoginDTO userDto) throws Exception {
        if (emailExists(userDto.getEmail())) {
            throw new Exception("Email already exists");
        }

        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setPassword(userDto.getPassword());
        userRepository.save(user);

        int atIndex = userDto.getEmail().indexOf('@');

        String substring = userDto.getEmail().substring(atIndex + 1);



        List<Organisation> organisations = organisationRepository
                .findAll()
                .stream()
                .filter(organisation -> organisation.getMailTemplate().equals(substring))
                .toList();

        organisations.forEach(organisation -> {
            UserOrganisation userOrganisation = new UserOrganisation();
            userOrganisation.setUser(user);
            userOrganisation.setOrganisation(organisation);
            userOrganisation.setJoinDate(new Date());
            userOrganisationRepository.save(userOrganisation);
        });
    }

    private boolean emailExists(String email) {
        return !Objects.equals(userRepository.findByEmail(email), null);
    }

    public Long loginUser(UserLoginDTO userDto) throws Exception {
        User tmpUser = userRepository.findByEmail(userDto.getEmail());

        if(tmpUser == null){
            throw new Exception("Email does not exist");
        }

        if(Objects.equals(userDto.getPassword(), tmpUser.getPassword())){
            return tmpUser.getId();
        }

        return -1L;
    }

    public List<UserOrganisation> getConnectionBetweenUserAndOrganisation() {
        return userOrganisationRepository.findAll();
    }

    public void addInterest(Long userId, Interest interest) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) {
            throw new RuntimeException("User do not exists");
        } else {
            User user = opt.get();
            Set<Interest> interests = user.getInterests();
            interests.add(interest);
            user.setInterests(interests);
            userRepository.save(user);
        }
    }

    public void deleteInterest(Long userId, Interest interest) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) {
            throw new RuntimeException("User not found");
        } else {
            User user = opt.get();
            Set<Interest> interests = user.getInterests();
            interests.remove(interest);
            user.setInterests(interests);
            userRepository.save(user);
        }
    }

    public List<UserProfileDTO> getAllFilteredUsers(Long id, String query, Long organisationId) {
        if (query == null && organisationId == null) {
            return getAllUserProfilesExceptOne(id);
        }

        if (organisationId == null) {

            return getAllUserProfilesExceptOne(id)
                    .stream()
                    .filter(user -> (containsIgnoreCase(user.getEmail(), query))
                            || containsIgnoreCase(user.getName(), query)
                            || containsIgnoreCase(user.getSurname(), query))
                    .toList();
        }
        Optional<Organisation> organisation = organisationRepository.findById(organisationId);
        if (organisation.isEmpty()) {
            throw new RuntimeException("Organisation do not exists");
        }
        List<User> filteredUsers = userOrganisationRepository.findAllByOrganisationId(organisationId)
                .stream()
                .map(UserOrganisation::getUser)
                .filter(user -> containsIgnoreCase(user.getEmail(), query)
                        || containsIgnoreCase(user.getUsername(), query)
                        || containsIgnoreCase(user.getSurname(), query))
                .toList();

        return filteredUsers
                .stream()
                .map(user -> getProfile(user.getId()))
                .filter(profile -> !Objects.equals(profile.getUserId(), id))
                .toList();
    }

    public RoleDTO getUserRole(Long userId){
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isEmpty()) {
            throw new RuntimeException("User do not exists");
        } else {
            User user = opt.get();
            return new RoleDTO(user.getRole().getName());
        }
    }

    public List<InterestDTO> getUserInterests(Long id) {
        Optional<User> opt = userRepository.findById(id);
        if (opt.isEmpty()) {
            throw new RuntimeException("User do not exists");
        } else {
            return opt.get().getInterests().stream().map(interest -> InterestDTO.builder().name(interest.getName()).build()).collect(Collectors.toList());
        }
    }
}

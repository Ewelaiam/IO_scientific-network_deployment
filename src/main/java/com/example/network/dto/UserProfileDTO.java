package com.example.network.dto;

import com.example.network.model.Organisation;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class UserProfileDTO {

    private Long userId;
    private String email;
    private String name;
    private String surname;

    private List<Organisation> organisations;
}

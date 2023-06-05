package com.example.network.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class UserEditDTO {

    private String email;
    private String name;
    private String surname;

}

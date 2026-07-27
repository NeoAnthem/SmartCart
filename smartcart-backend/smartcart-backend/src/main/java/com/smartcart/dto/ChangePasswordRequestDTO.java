package com.smartcart.dto;

import lombok.Data;

@Data
public class ChangePasswordRequestDTO {

    private String currentPassword;

    private String newPassword;
}
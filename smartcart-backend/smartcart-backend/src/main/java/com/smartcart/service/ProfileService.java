package com.smartcart.service;

import com.smartcart.dto.ChangePasswordRequestDTO;
import com.smartcart.dto.ProfileStatsDTO;
import com.smartcart.dto.UpdateProfileRequestDTO;

public interface ProfileService {

    String updateProfile(
            UpdateProfileRequestDTO request
    );

    String changePassword(
            ChangePasswordRequestDTO request
    );

    ProfileStatsDTO getProfileStats();
}
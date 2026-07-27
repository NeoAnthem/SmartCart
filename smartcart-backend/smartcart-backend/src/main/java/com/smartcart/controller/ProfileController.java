package com.smartcart.controller;

import com.smartcart.dto.ChangePasswordRequestDTO;
import com.smartcart.dto.UpdateProfileRequestDTO;
import com.smartcart.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @PutMapping
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<?> updateProfile(
            @RequestBody UpdateProfileRequestDTO request) {

        return ResponseEntity.ok(
                profileService.updateProfile(request)
        );
    }

    @PutMapping("/password")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequestDTO request) {

        return ResponseEntity.ok(
                profileService.changePassword(request)
        );
    }

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('CUSTOMER', 'ADMIN')")
    public ResponseEntity<?> getProfileStats() {

        return ResponseEntity.ok(
                profileService.getProfileStats()
        );
    }
}
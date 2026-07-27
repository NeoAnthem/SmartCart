package com.smartcart.service;

import com.smartcart.dto.ChangePasswordRequestDTO;
import com.smartcart.dto.UpdateProfileRequestDTO;
import com.smartcart.entity.User;
import com.smartcart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.smartcart.dto.ProfileStatsDTO;
import com.smartcart.repository.OrderRepository;
import com.smartcart.repository.WishlistRepository;
import com.smartcart.repository.CartRepository;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final OrderRepository orderRepository;

    private final WishlistRepository wishlistRepository;

    private final CartRepository cartRepository;

    @Override
    public String updateProfile(
            UpdateProfileRequestDTO request) {

        String currentEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(currentEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.findByEmail(
                request.getEmail()).isPresent()) {

            throw new RuntimeException(
                    "Email already exists");
        }

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        userRepository.save(user);

        return "Profile updated successfully";
    }

    @Override
    public String changePassword(
            ChangePasswordRequestDTO request) {

        String currentEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(currentEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));

        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Current password is incorrect");
        }

        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()));

        userRepository.save(user);

        return "Password changed successfully";
    }

    @Override
    public ProfileStatsDTO getProfileStats() {

        String currentEmail = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(currentEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"));

        long totalOrders =
                orderRepository.countByUserId(
                        user.getId());

        long wishlistItems =
                wishlistRepository.countByUserId(
                        user.getId());

        long cartItems =
                cartRepository.countByUserId(
                        user.getId());

        String memberSince = user.getCreatedAt()
                .format(
                        DateTimeFormatter.ofPattern(
                                "MMM yyyy"
                        )
                );

        return new ProfileStatsDTO(
                totalOrders,
                wishlistItems,
                cartItems,
                memberSince
        );
    }

}
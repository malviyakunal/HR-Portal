package com.hr.server.service;

import com.hr.server.config.JwtUtil;
import com.hr.server.dto.ChangePasswordDTO;
import com.hr.server.model.User;
import com.hr.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    // Login and Token Generation
    public Map<String, String> login(String email, String password) {
        // Step 1: Check if user exists
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new BadCredentialsException("User with this email does not exist");
        }

        User user = userOptional.get();

        // Step 2: Manually validate password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }

        try {
            // Step 3: Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // Step 4: Generate JWT token
            String token = jwtUtil.generateToken(authentication);

            // Step 5: Prepare response with token, role, and email
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", user.getRole().getRoleName()); // Assuming User has a Role object
            response.put("email", user.getEmail()); // Added email to response

            return response;
        } catch (Exception e) {
            throw new BadCredentialsException("Authentication failed: " + e.getMessage());
        }
    }

    public void changePassword(ChangePasswordDTO changePasswordDTO) {
        User user = userRepository.findByEmail(changePasswordDTO.getEmail())
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        // Check if old password is correct
        if (!passwordEncoder.matches(changePasswordDTO.getOldPassword(), user.getPassword())) {
            throw new BadCredentialsException("Old password is incorrect");
        }

        // Encrypt and update new password
        user.setPassword(passwordEncoder.encode(changePasswordDTO.getNewPassword()));
        userRepository.save(user);
    }
}

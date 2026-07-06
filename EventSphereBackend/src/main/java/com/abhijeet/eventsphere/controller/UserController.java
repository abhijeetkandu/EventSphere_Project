package com.abhijeet.eventsphere.controller;

import com.abhijeet.eventsphere.request.ChangePasswordRequest;
import com.abhijeet.eventsphere.request.UpdateProfileRequest;
import com.abhijeet.eventsphere.response.MessageResponse;
import com.abhijeet.eventsphere.response.UserResponse;
import com.abhijeet.eventsphere.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserResponse getProfile(Authentication authentication) {
        return userService.getProfile(authentication.getName());
    }

    @PutMapping("/me")
    public UserResponse updateProfile(Authentication authentication,
                                      @Valid @RequestBody UpdateProfileRequest request) {
        return userService.updateProfile(authentication.getName(), request);
    }

    @PostMapping("/change-password")
    public MessageResponse changePassword(Authentication authentication,
                                          @Valid @RequestBody ChangePasswordRequest request) {
        return userService.changePassword(authentication.getName(), request);
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{id}")
    public MessageResponse deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}

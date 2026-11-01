package com.manny.fitness.controller;

import com.manny.fitness.dto.ProfileRequest;
import com.manny.fitness.dto.ProfileResponse;
import com.manny.fitness.model.Profile;
import com.manny.fitness.service.ProfileService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping ("/api/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile() {
        return service.getProfile()
                .map(profile -> ResponseEntity.ok(ProfileResponse.from(profile)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ProfileResponse saveProfile(@Valid @RequestBody ProfileRequest request) {
        Profile saved = service.saveProfile(request.heightIn(), request.sex());
        return ProfileResponse.from(saved);
    }
}

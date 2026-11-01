package com.manny.fitness.service;

import com.manny.fitness.model.Profile;
import com.manny.fitness.model.Sex;
import com.manny.fitness.repository.ProfileRepository;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository repository;

    public ProfileService(ProfileRepository repository) {
        this.repository = repository;
    }

    public Optional<Profile> getProfile() {
        return repository.findAll().stream().findFirst();
    }

    public Profile saveProfile(BigDecimal heightIn, Sex sex) {
        Profile profile = getProfile().orElse(null);
        if (profile == null) {
            profile = new Profile(heightIn, sex);
        } else {
            profile.setHeightIn(heightIn);
            profile.setSex(sex);
        }
        return repository.save(profile);
    }
}

package com.manny.fitness.dto;

import com.manny.fitness.model.Profile;
import com.manny.fitness.model.Sex;
import java.math.BigDecimal;

public record ProfileResponse(Long id, BigDecimal heightIn, Sex sex) {

    public static ProfileResponse from(Profile profile) {
        return new ProfileResponse(profile.getId(), profile.getHeightIn(), profile.getSex());
    }
}

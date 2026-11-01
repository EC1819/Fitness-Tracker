package com.manny.fitness.dto;

import com.manny.fitness.model.Sex;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public record ProfileRequest(@NotNull @Positive BigDecimal heightIn, @NotNull Sex sex) {

}

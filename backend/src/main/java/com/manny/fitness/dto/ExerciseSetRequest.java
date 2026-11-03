package com.manny.fitness.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ExerciseSetRequest(@NotBlank @Size(max = 100) String exerciseName,
                                  @NotNull @Positive Integer setNumber,
                                  @NotNull @Positive Integer reps,
                                  @NotNull @PositiveOrZero BigDecimal weightLbs) {
}

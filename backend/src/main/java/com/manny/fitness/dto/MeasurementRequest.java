package com.manny.fitness.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MeasurementRequest(@NotNull LocalDate measurementDate, @NotNull @Positive BigDecimal bodyWeightLbs,
                                 @NotNull @Positive BigDecimal neckIn, @NotNull @Positive BigDecimal waistIn,
                                 @Positive BigDecimal hipIn) {
}

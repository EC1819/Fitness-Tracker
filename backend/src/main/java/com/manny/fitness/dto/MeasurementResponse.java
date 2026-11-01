package com.manny.fitness.dto;

import com.manny.fitness.model.BodyMeasurement;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MeasurementResponse(Long id, LocalDate measurementDate, BigDecimal bodyWeightLbs, BigDecimal neckIn,
                                  BigDecimal waistIn, BigDecimal hipIn) {

    public static MeasurementResponse from(BodyMeasurement bodyMeasurement) {
        return new MeasurementResponse(bodyMeasurement.getId(), bodyMeasurement.getMeasurementDate(), bodyMeasurement.getBodyWeightLbs(), bodyMeasurement.getNeckIn(), bodyMeasurement.getWaistIn(), bodyMeasurement.getHipIn());
    }
}

package com.manny.fitness.dto;

import java.time.LocalDate;

public record MetricsResponse(LocalDate measurementDate, double bodyFatPercentage, double ffmi) {
}

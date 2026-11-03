package com.manny.fitness.controller;

import com.manny.fitness.dto.MetricsResponse;
import com.manny.fitness.model.BodyMeasurement;
import com.manny.fitness.model.Profile;
import com.manny.fitness.service.MeasurementService;
import com.manny.fitness.service.MetricsService;
import com.manny.fitness.service.ProfileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/metrics")
public class MetricsController {
    private final ProfileService profileService;
    private final MeasurementService measurementService;
    private final MetricsService metricsService;

    public MetricsController(ProfileService profileService,
                             MeasurementService measurementService,
                             MetricsService metricsService) {
        this.profileService = profileService;
        this.measurementService = measurementService;
        this.metricsService = metricsService;
    }

    @GetMapping
    public ResponseEntity<MetricsResponse> getMetrics() {
        Optional<Profile> profile = profileService.getProfile();
        Optional<BodyMeasurement> latest = measurementService.getLatestMeasurement();
        if (profile.isEmpty() || latest.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Profile p = profile.get();
        BodyMeasurement m = latest.get();
        double heightIn = p.getHeightIn().doubleValue();
        Double hipIn = (m.getHipIn() == null) ? null : m.getHipIn().doubleValue();

        try {
            double bodyFat = metricsService.bodyFatPercentage(
                    p.getSex(), heightIn, m.getNeckIn().doubleValue(), m.getWaistIn().doubleValue(), hipIn);
            double ffmi = metricsService.ffmi(m.getBodyWeightLbs().doubleValue(), heightIn, bodyFat);
            return ResponseEntity.ok(new MetricsResponse(m.getMeasurementDate(), bodyFat, ffmi));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}

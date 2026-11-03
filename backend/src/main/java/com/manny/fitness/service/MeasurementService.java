package com.manny.fitness.service;

import com.manny.fitness.model.BodyMeasurement;
import com.manny.fitness.repository.BodyMeasurementRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
public class MeasurementService {

    private final BodyMeasurementRepository repository;

    public MeasurementService(BodyMeasurementRepository repository) {
        this.repository = repository;
    }

    public BodyMeasurement addMeasurement(LocalDate measurementDate, BigDecimal bodyWeightLbs, BigDecimal neckIn, BigDecimal waistIn, BigDecimal hipIn) {
        BodyMeasurement measurement = new BodyMeasurement(measurementDate, bodyWeightLbs, neckIn, waistIn, hipIn);
        return repository.save(measurement);
    }

    public List<BodyMeasurement> getAllMeasurements() {
        return repository.findAllByOrderByMeasurementDateDesc();
    }

    public Optional<BodyMeasurement> getLatestMeasurement() {
        return repository.findFirstByOrderByMeasurementDateDesc();
    }
}
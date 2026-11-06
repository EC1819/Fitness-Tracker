package com.manny.fitness.repository;

import com.manny.fitness.model.BodyMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BodyMeasurementRepository extends JpaRepository<BodyMeasurement, Long> {

    List<BodyMeasurement> findAllByOrderByMeasurementDateDescIdDesc();

    Optional<BodyMeasurement> findFirstByOrderByMeasurementDateDescIdDesc();
}

package com.manny.fitness.repository;

import com.manny.fitness.model.BodyMeasurement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BodyMeasurementRepository extends JpaRepository<BodyMeasurement, Long> {

    List<BodyMeasurement> findAllByOrderByMeasurementDateDesc();
}

package com.manny.fitness.controller;

import com.manny.fitness.dto.MeasurementRequest;
import com.manny.fitness.dto.MeasurementResponse;
import com.manny.fitness.model.BodyMeasurement;
import com.manny.fitness.service.MeasurementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/measurements")
public class MeasurementController {

    private final MeasurementService service;

    public MeasurementController(MeasurementService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<MeasurementResponse> addMeasurement(@Valid @RequestBody MeasurementRequest request) {
        BodyMeasurement saved = service.addMeasurement(request.measurementDate(), request.bodyWeightLbs(), request.neckIn(), request.waistIn(), request.hipIn());
        return ResponseEntity.status(HttpStatus.CREATED).body(MeasurementResponse.from(saved));
    }

    @GetMapping
    public List<MeasurementResponse> getAllMeasurements() {
        return service.getAllMeasurements().stream().map(MeasurementResponse::from).toList();
    }
}

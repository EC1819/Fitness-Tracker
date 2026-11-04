package com.manny.fitness.controller;

import com.manny.fitness.dto.WorkoutRequest;
import com.manny.fitness.dto.WorkoutResponse;
import com.manny.fitness.model.Workout;
import com.manny.fitness.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService service;

    public WorkoutController(WorkoutService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<WorkoutResponse> createWorkout(@Valid @RequestBody WorkoutRequest request) {
        Workout saved = service.createWorkout(request.workoutDate(), request.notes(), request.sets());
        return ResponseEntity.status(HttpStatus.CREATED).body(WorkoutResponse.from(saved));
    }

    @GetMapping
    public List<WorkoutResponse> getAllWorkouts() {
        return service.getAllWorkouts().stream().map(WorkoutResponse::from).toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutResponse> getWorkoutById(@PathVariable Long id) {
        return service.getWorkoutById(id)
                .map(workout -> ResponseEntity.ok(WorkoutResponse.from(workout)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        if (service.deleteWorkout(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

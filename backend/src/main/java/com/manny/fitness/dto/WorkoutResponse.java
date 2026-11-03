package com.manny.fitness.dto;

import com.manny.fitness.model.Workout;

import java.time.LocalDate;
import java.util.List;

public record WorkoutResponse(Long id, LocalDate workoutDate, String notes, List<ExerciseSetResponse> sets) {

    public static WorkoutResponse from(Workout workout) {
        List<ExerciseSetResponse> setResponses = workout.getSets().stream().map(ExerciseSetResponse::from).toList();
        return new WorkoutResponse(workout.getId(), workout.getWorkoutDate(), workout.getNotes(), setResponses);
    }
}

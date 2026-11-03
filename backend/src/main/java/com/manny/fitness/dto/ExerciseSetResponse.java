package com.manny.fitness.dto;

import com.manny.fitness.model.ExerciseSet;

import java.math.BigDecimal;

public record ExerciseSetResponse(Long id, String exerciseName, Integer setNumber, Integer reps,
                                   BigDecimal weightLbs) {

    public static ExerciseSetResponse from(ExerciseSet set) {
        return new ExerciseSetResponse(set.getId(), set.getExerciseName(), set.getSetNumber(), set.getReps(), set.getWeightLbs());
    }
}

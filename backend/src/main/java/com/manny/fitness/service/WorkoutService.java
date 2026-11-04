package com.manny.fitness.service;

import com.manny.fitness.dto.ExerciseSetRequest;
import com.manny.fitness.model.ExerciseSet;
import com.manny.fitness.model.Workout;
import com.manny.fitness.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WorkoutService {

    private final WorkoutRepository repository;

    public WorkoutService(WorkoutRepository repository) {
        this.repository = repository;
    }

    public Workout createWorkout(LocalDate workoutDate, String notes, List<ExerciseSetRequest> setRequests) {
        Workout workout = new Workout(workoutDate, notes);
        for (ExerciseSetRequest setRequest : setRequests) {
            workout.addSet(new ExerciseSet(setRequest.exerciseName(), setRequest.setNumber(), setRequest.reps(), setRequest.weightLbs()));
        }
        return repository.save(workout);
    }

    public List<Workout> getAllWorkouts() {
        return repository.findAllByOrderByWorkoutDateDesc();
    }

    public Optional<Workout> getWorkoutById(Long id) {
        return repository.findById(id);
    }

    public boolean deleteWorkout(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}

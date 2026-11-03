package com.manny.fitness.repository;

import com.manny.fitness.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    List<Workout> findAllByOrderByWorkoutDateDesc();
}

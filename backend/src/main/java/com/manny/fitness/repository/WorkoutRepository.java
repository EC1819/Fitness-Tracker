package com.manny.fitness.repository;

import com.manny.fitness.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

    @Query("SELECT DISTINCT w FROM Workout w LEFT JOIN FETCH w.sets ORDER BY w.workoutDate DESC, w.id DESC")
    List<Workout> findAllByOrderByWorkoutDateDescIdDesc();

    @Override
    @Query("SELECT DISTINCT w FROM Workout w LEFT JOIN FETCH w.sets WHERE w.id = :id")
    Optional<Workout> findById(@Param("id") Long id);
}

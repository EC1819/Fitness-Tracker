package com.manny.fitness.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "exercise_sets")
public class ExerciseSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workout_id", nullable = false)
    private Workout workout;

    @Column(name = "exercise_name", nullable = false)
    private String exerciseName;

    @Column(name = "set_number", nullable = false)
    private Integer setNumber;

    @Column(nullable = false)
    private Integer reps;

    @Column(name = "weight_lbs", nullable = false)
    private BigDecimal weightLbs;

    protected ExerciseSet() {
    }

    public ExerciseSet(String exerciseName, Integer setNumber, Integer reps, BigDecimal weightLbs) {
        this.exerciseName = exerciseName;
        this.setNumber = setNumber;
        this.reps = reps;
        this.weightLbs = weightLbs;
    }

    public Long getId() {
        return id;
    }

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public Integer getSetNumber() {
        return setNumber;
    }

    public Integer getReps() {
        return reps;
    }

    public BigDecimal getWeightLbs() {
        return weightLbs;
    }
}

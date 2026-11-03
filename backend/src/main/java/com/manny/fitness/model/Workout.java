package com.manny.fitness.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workouts")
public class Workout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "workout_date", nullable = false)
    private LocalDate workoutDate;

    @Column
    private String notes;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExerciseSet> sets = new ArrayList<>();

    protected Workout() {
    }

    public Workout(LocalDate workoutDate, String notes) {
        this.workoutDate = workoutDate;
        this.notes = notes;
    }

    public void addSet(ExerciseSet set) {
        set.setWorkout(this);
        sets.add(set);
    }

    public Long getId() {
        return id;
    }

    public LocalDate getWorkoutDate() {
        return workoutDate;
    }

    public String getNotes() {
        return notes;
    }

    public List<ExerciseSet> getSets() {
        return sets;
    }
}

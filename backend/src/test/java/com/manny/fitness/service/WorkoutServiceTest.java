package com.manny.fitness.service;

import com.manny.fitness.dto.ExerciseSetRequest;
import com.manny.fitness.model.ExerciseSet;
import com.manny.fitness.model.Workout;
import com.manny.fitness.repository.WorkoutRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WorkoutServiceTest {

    private final WorkoutRepository repository = mock(WorkoutRepository.class);
    private final WorkoutService service = new WorkoutService(repository);

    @Test
    void createWorkoutAttachesSetsToTheWorkout() {
        when(repository.save(any(Workout.class))).thenAnswer(invocation -> invocation.getArgument(0));

        List<ExerciseSetRequest> setRequests = List.of(
                new ExerciseSetRequest("Bench Press", 1, 8, BigDecimal.valueOf(135)),
                new ExerciseSetRequest("Bench Press", 2, 8, BigDecimal.valueOf(135)));

        Workout saved = service.createWorkout(LocalDate.of(2026, 11, 2), "Push day", setRequests);

        assertEquals(2, saved.getSets().size());
        ExerciseSet firstSet = saved.getSets().get(0);
        assertEquals("Bench Press", firstSet.getExerciseName());
        assertEquals(saved, firstSet.getWorkout());
    }

    @Test
    void getAllWorkoutsReturnsWhatTheRepositoryReturns() {
        Workout newer = new Workout(LocalDate.of(2026, 11, 3), "Pull day");
        Workout older = new Workout(LocalDate.of(2026, 11, 1), "Leg day");
        when(repository.findAllByOrderByWorkoutDateDescIdDesc()).thenReturn(List.of(newer, older));

        List<Workout> result = service.getAllWorkouts();

        assertEquals(List.of(newer, older), result);
    }

    @Test
    void getWorkoutByIdReturnsEmptyWhenMissing() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertTrue(service.getWorkoutById(99L).isEmpty());
    }

    @Test
    void deleteWorkoutReturnsFalseWhenMissing() {
        when(repository.existsById(99L)).thenReturn(false);

        boolean deleted = service.deleteWorkout(99L);

        assertFalse(deleted);
        verify(repository, never()).deleteById(any());
    }

    @Test
    void deleteWorkoutReturnsTrueAndDeletesWhenFound() {
        when(repository.existsById(1L)).thenReturn(true);

        boolean deleted = service.deleteWorkout(1L);

        assertTrue(deleted);
        verify(repository).deleteById(1L);
    }
}

package com.manny.fitness.service;

import com.manny.fitness.model.Sex;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class MetricsServiceTest {

    private final MetricsService metrics = new MetricsService();

    @Test
    void maleBodyFatPercentage() {
        double expected = 15.3;
        double result = metrics.bodyFatPercentage(Sex.MALE, 70.5, 19.5, 37.5, null);
        assertEquals(expected,result, 0.1);
    }

    @Test
    void femaleBodyFatPercentage() {
        double expected = 21.8;
        double result = metrics.bodyFatPercentage(Sex.FEMALE, 70.5, 19.5, 37.5, 34.5);
        assertEquals(expected,result, 0.1);
    }

    @Test
    void femaleUsesTheFemaleFormula() {
        double male = metrics.bodyFatPercentage(Sex.MALE, 65, 13, 30, 38.0);
        double female = metrics.bodyFatPercentage(Sex.FEMALE, 65, 13, 30, 38.0);
        assertNotEquals(male, female, 0.1);
    }

    @Test
    void femaleWithoutHipMeasurementThrows() {
        assertThrows(IllegalArgumentException.class,
                () -> metrics.bodyFatPercentage(Sex.FEMALE, 65, 13, 30, null));
    }

    @Test
    void ffmiTest() {
        double expected = 23.29;
        double result = metrics.ffmi(180, 70, 10);
        assertEquals(expected,result, 0.1);
    }

    @Test
    void higherBodyFatMeansLowerFfmi() {
        double lean = metrics.ffmi(180, 70, 10);
        double heavier = metrics.ffmi(180, 70, 25);
        assertTrue(lean > heavier);
    }



}
package com.manny.fitness.service;

import com.manny.fitness.model.Sex;
import org.springframework.stereotype.Service;

@Service
public class MetricsService {

    private static final double one_LB_in_Kg = 0.453592;
    private static final double one_In_in_Meter = 0.0254;

    public double bodyFatPercentage(Sex sex, double heightIn, double neckIn, double waistIn, Double hipIn) {
        if (sex == Sex.FEMALE) {
            if (hipIn == null) {
                throw new IllegalArgumentException("Hip measurement is required");
            }
            double girth = waistIn + hipIn - neckIn;
            if (girth <= 0) {
                throw new IllegalArgumentException("Waist + hip must be larger");
            }
            return 163.205 * Math.log10(girth) - 97.684 * Math.log10(heightIn) - 78.387;
        }

        double girth = waistIn -neckIn;
        if (girth <= 0) {
            throw new IllegalArgumentException("Waist must be larger then neck");
        }
        return 86.010 * Math.log10(girth) - 70.041 * Math.log10(heightIn) + 36.76;
    }

    public double ffmi(double weightLbs, double heightIn, double bodyFatPercent) {
        double weightKg =weightLbs * one_LB_in_Kg;
        double heightM = heightIn * one_In_in_Meter;
        double leanMassKg = weightKg * (1 - bodyFatPercent / 100);
        return leanMassKg / (heightM * heightM);
    }
}

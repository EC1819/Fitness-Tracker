package com.manny.fitness.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "body_measurements")

public class BodyMeasurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "measurement_date", nullable = false)
    private LocalDate measurementDate;


    @Column(name = "body_weight_lbs", nullable = false)
    private BigDecimal bodyWeightLbs;

    @Column(name = "neck_in", nullable = false)
    private BigDecimal neckIn;

    @Column(name = "waist_in", nullable = false)
    private BigDecimal waistIn;

    @Column(name = "hip_in")
    private BigDecimal hipIn;

    protected BodyMeasurement() {
    }

    public BodyMeasurement(LocalDate measurementDate, BigDecimal bodyWeightLbs, BigDecimal neckIn, BigDecimal waistIn, BigDecimal hipIn) {
        this.measurementDate = measurementDate;
        this.bodyWeightLbs = bodyWeightLbs;
        this.neckIn = neckIn;
        this.waistIn = waistIn;
        this.hipIn = hipIn;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getMeasurementDate() {
        return measurementDate;
    }

    public BigDecimal getBodyWeightLbs() {
        return bodyWeightLbs;
    }

    public BigDecimal getNeckIn() {
        return neckIn;
    }

    public BigDecimal getWaistIn() {
        return waistIn;
    }

    public BigDecimal getHipIn() {
        return hipIn;
    }

    public void setBodyWeight(BigDecimal bodyWeightLbs) {
        this.bodyWeightLbs = bodyWeightLbs;
    }

    public void setNeckIn(BigDecimal neckIn) {
        this.neckIn = neckIn;
    }

    public void setWaistIn(BigDecimal waistIn) {
        this.waistIn = waistIn;
    }

    public void setHipIn(BigDecimal hipIn) {
        this.hipIn = hipIn;
    }
}

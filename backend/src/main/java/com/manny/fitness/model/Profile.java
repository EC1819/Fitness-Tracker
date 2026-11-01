package com.manny.fitness.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "profile")

public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "height_in", nullable = false)
    private BigDecimal heightIn;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sex sex;

    protected Profile() {}

    public Profile(BigDecimal heightIn, Sex sex) {
        this.heightIn = heightIn;
        this.sex = sex;
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getHeightIn() {
        return  heightIn;
    }

    public Sex getSex() {
        return sex;
    }

    public void setHeightIn(BigDecimal heightIn) {
        this.heightIn = heightIn;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }
}

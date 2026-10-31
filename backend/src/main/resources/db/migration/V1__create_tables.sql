CREATE TABLE workouts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    workout_date DATE NOT NULL,
    notes TEXT
);

CREATE TABLE exercise_sets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    workout_id BIGINT NOT NULL REFERENCES workouts(id) on DELETE CASCADE,
    exercise_name VARCHAR(100) NOT NULL,
    set_number INT NOT NULL CHECK (set_number > 0),
    reps INT NOT NULL CHECK (reps > 0),
    weight_lbs NUMERIC(6,2) NOT NULL CHECK (weight_lbs >= 0)
);

CREATE INDEX idx_exercise_sets_workout_id ON exercise_sets(workout_id);

CREATE TABLE body_measurements (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    measurement_date DATE NOT NULL,
    body_weight_lbs NUMERIC(5,2) NOT NULL CHECK (body_weight_lbs > 0),
    neck_in NUMERIC(5,2) NOT NULL CHECK (neck_in > 0),
    waist_in NUMERIC(5,2) NOT NULL CHECK (waist_in > 0),
    hip_in NUMERIC(5,2) CHECK (hip_in > 0)
);

CREATE TABLE profile (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    height_in NUMERIC(6, 2) NOT NULL CHECK (height_in > 0),
    SEX VARCHAR(10) NOT NULL CHECK (SEX IN ('MALE', 'FEMALE'))
);
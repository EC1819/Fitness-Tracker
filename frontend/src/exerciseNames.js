// Exercise names are matched ignoring case and extra whitespace, so
// "Bench Press" and "bench  press " are treated as the same exercise.
export function exerciseNameKey(exerciseName) {
    return exerciseName.trim().toLowerCase().replace(/\s+/g, " ");
}
